"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/shadcn/button";
import { getPageKeyFromPath, trackThemeChange } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const themes = ["light", "dark", "system"] as const;

type Theme = (typeof themes)[number];

type ModeToggleProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "onClick"
> & {
  variant?: "default" | "ghost";
};

function ModeToggle({
  variant = "default",
  className,
  ...props
}: ModeToggleProps) {
  const pathname = usePathname();
  const pageKey = getPageKeyFromPath(pathname);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const currentTheme = (theme ?? "system") as Theme;
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    trackThemeChange(pageKey, nextTheme);
  };

  const buttonVariant = variant === "ghost" ? "ghost" : "outline";
  const activeTheme = (theme ?? "system") as Theme;
  const Icon =
    activeTheme === "light" ? Sun : activeTheme === "dark" ? Moon : Monitor;

  const label =
    activeTheme === "light"
      ? "Light mode"
      : activeTheme === "dark"
        ? "Dark mode"
        : "System theme";

  if (!mounted) {
    return (
      <Button
        variant={buttonVariant}
        size="icon"
        className={cn(className)}
        aria-hidden
        disabled
        {...props}
      >
        <span className="size-icon-sm" />
      </Button>
    );
  }

  return (
    <Button
      variant={buttonVariant}
      size="icon"
      className={cn(className)}
      onClick={cycleTheme}
      aria-label={`${label}. Click to change theme.`}
      title={label}
      {...props}
    >
      <Icon />
    </Button>
  );
}

function ModeToggleGhost(props: Omit<ModeToggleProps, "variant">) {
  return <ModeToggle variant="ghost" {...props} />;
}

export { ModeToggle, ModeToggleGhost, themes };
export type { ModeToggleProps, Theme };
