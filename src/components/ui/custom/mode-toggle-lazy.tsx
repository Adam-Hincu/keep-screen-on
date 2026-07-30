"use client"

import dynamic from "next/dynamic"

const ModeToggleGhost = dynamic(
  () =>
    import("@/components/ui/custom/mode-toggle").then(
      (module) => module.ModeToggleGhost
    ),
  { ssr: false }
)

function ModeToggleLazy() {
  return <ModeToggleGhost />
}

export { ModeToggleLazy }
