[CmdletBinding(SupportsShouldProcess = $true)]
param(
    # Project root (defaults to this script's directory).
    [string]$RootPath = "",

    # Directory names skipped anywhere in the tree (deps, caches, VCS, tooling).
    [string[]]$ExcludeDirectories = @(
        ".git",
        "node_modules",
        ".expo",
        "dist",
        "web-build",
        ".kotlin",
        "Pods",
        "DerivedData",
        ".gradle",
        "coverage",
        ".turbo",
        ".yarn",
        ".pnpm-store",
        ".vscode",
        ".next",
        "out",
        "build",
        ".vercel"
    ),

    # Directories skipped only when they sit at the project root (Expo prebuild output).
    # Does not skip local module natives like modules/*/ios.
    [string[]]$ExcludeRootDirectories = @(
        "ios",
        "android"
    ),

    # File names never deleted even when empty (keep empty folders tracked in git).
    [string[]]$ExcludeFileNames = @(
        ".gitkeep",
        ".keep"
    ),

    [switch]$IncludeWhitespaceOnlyTextFiles
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RootPath)) {
    if (-not [string]::IsNullOrWhiteSpace($PSScriptRoot)) {
        $RootPath = $PSScriptRoot
    }
    else {
        $RootPath = (Get-Location).Path
    }
}

function Test-IsWhitespaceOnlyTextFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath
    )

    $textExtensions = @(
        ".txt", ".md", ".json", ".jsonc", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html", ".htm",
        ".xml", ".yml", ".yaml", ".env", ".sql", ".ps1", ".psm1", ".mjs", ".cjs", ".sh", ".bat", ".cmd",
        ".swift", ".m", ".h", ".mm", ".plist", ".podspec"
    )

    $extension = [System.IO.Path]::GetExtension($FilePath).ToLowerInvariant()
    if ($textExtensions -notcontains $extension) {
        return $false
    }

    try {
        $raw = Get-Content -LiteralPath $FilePath -Raw -ErrorAction Stop
        return [string]::IsNullOrWhiteSpace($raw)
    }
    catch {
        return $false
    }
}

function Test-IsExcludedPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ItemPath,
        [Parameter(Mandatory = $true)]
        [string]$RootPath,
        [Parameter(Mandatory = $true)]
        [string[]]$ExcludedDirNames,
        [Parameter(Mandatory = $true)]
        [AllowEmptyCollection()]
        [string[]]$ExcludedRootDirNames
    )

    $normalizedItem = $ItemPath.Replace('/', '\')
    $normalizedRoot = $RootPath.TrimEnd('\').Replace('/', '\')
    $rootPrefix = $normalizedRoot + '\'

    if (-not $normalizedItem.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase) -and
        -not $normalizedItem.Equals($normalizedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $false
    }

    $relative = $normalizedItem.Substring($normalizedRoot.Length).TrimStart('\')
    if ([string]::IsNullOrWhiteSpace($relative)) {
        return $false
    }

    $segments = @($relative -split '\\+' | Where-Object { $_ -ne '' })
    if ($segments.Count -eq 0) {
        return $false
    }

    # Root-only excludes: /ios, /android (Expo prebuild), not modules/*/ios
    if ($ExcludedRootDirNames.Count -gt 0 -and ($ExcludedRootDirNames -contains $segments[0])) {
        return $true
    }

    foreach ($excluded in $ExcludedDirNames) {
        if ($segments -contains $excluded) {
            return $true
        }
    }

    return $false
}

if (-not (Test-Path -LiteralPath $RootPath -PathType Container)) {
    throw "RootPath does not exist or is not a directory: $RootPath"
}

$resolvedRoot = (Resolve-Path -LiteralPath $RootPath).Path
$deletedItems = New-Object System.Collections.Generic.List[pscustomobject]

Write-Host "Scanning root: $resolvedRoot"
Write-Host "Excluded directories (anywhere): $($ExcludeDirectories -join ', ')"
Write-Host "Excluded root directories: $($ExcludeRootDirectories -join ', ')"
Write-Host "Excluded file names: $($ExcludeFileNames -join ', ')"

# 1) Remove empty files first (and optional whitespace-only text files)
$allFiles = Get-ChildItem -LiteralPath $resolvedRoot -File -Recurse -Force -ErrorAction SilentlyContinue
foreach ($file in $allFiles) {
    if (Test-IsExcludedPath -ItemPath $file.FullName -RootPath $resolvedRoot -ExcludedDirNames $ExcludeDirectories -ExcludedRootDirNames $ExcludeRootDirectories) {
        continue
    }

    if ($ExcludeFileNames -contains $file.Name) {
        continue
    }

    $reason = $null
    if ($file.Length -eq 0) {
        $reason = "Empty file (0 bytes)"
    }
    elseif ($IncludeWhitespaceOnlyTextFiles -and (Test-IsWhitespaceOnlyTextFile -FilePath $file.FullName)) {
        $reason = "Whitespace-only text file"
    }

    if ($null -ne $reason) {
        if ($PSCmdlet.ShouldProcess($file.FullName, "Delete file")) {
            Remove-Item -LiteralPath $file.FullName -Force
            $deletedItems.Add([pscustomobject]@{
                Type   = "File"
                Path   = $file.FullName
                Reason = $reason
            })
        }
    }
}

# 2) Remove directories from deepest to shallowest when they become empty
$allDirectories = Get-ChildItem -LiteralPath $resolvedRoot -Directory -Recurse -Force -ErrorAction SilentlyContinue |
    Sort-Object { $_.FullName.Length } -Descending

foreach ($dir in $allDirectories) {
    if (Test-IsExcludedPath -ItemPath $dir.FullName -RootPath $resolvedRoot -ExcludedDirNames $ExcludeDirectories -ExcludedRootDirNames $ExcludeRootDirectories) {
        continue
    }

    $children = @(Get-ChildItem -LiteralPath $dir.FullName -Force -ErrorAction SilentlyContinue)
    if ($children.Count -eq 0) {
        if ($PSCmdlet.ShouldProcess($dir.FullName, "Delete empty directory")) {
            Remove-Item -LiteralPath $dir.FullName -Force
            $deletedItems.Add([pscustomobject]@{
                Type   = "Directory"
                Path   = $dir.FullName
                Reason = "Empty directory"
            })
        }
    }
}

Write-Host ""
Write-Host "Cleanup complete."
Write-Host "Deleted items: $($deletedItems.Count)"

if ($deletedItems.Count -eq 0) {
    Write-Host "No empty files or empty directories were removed."
    return
}

Write-Host ""
Write-Host "Structured deleted-items list:"
$deletedItems |
    Sort-Object Type, Path |
    Format-Table -AutoSize

Write-Host ""
Write-Host "JSON report:"
$deletedItems |
    Sort-Object Type, Path |
    ConvertTo-Json -Depth 4
