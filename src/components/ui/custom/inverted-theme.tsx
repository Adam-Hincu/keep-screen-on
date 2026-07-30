"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type InvertedThemeProps = React.ComponentProps<"div">;

function InvertedTheme({ className, children, ...props }: InvertedThemeProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const invertedThemeClass =
    mounted && resolvedTheme === "dark" ? "light" : "dark";

  return (
    <div className={cn(invertedThemeClass, className)} {...props}>
      {children}
    </div>
  );
}

export { InvertedTheme };
export type { InvertedThemeProps };
