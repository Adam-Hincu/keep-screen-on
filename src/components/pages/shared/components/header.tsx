"use client";

import { useEffect, useState } from "react";

import { PageInset } from "@/components/pages/shared/components/page-inset";
import { ModeToggle } from "@/components/ui/custom/mode-toggle";

function readCssPx(variable: string) {
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;visibility:hidden;width:var(${variable})`;
  document.documentElement.appendChild(probe);
  const px = probe.offsetWidth;
  probe.remove();
  return px;
}

export function Header() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeFrom = readCssPx("--header-fade-from");
    const fadeTo = readCssPx("--header-fade-to");
    const range = Math.max(fadeTo - fadeFrom, 1);

    const onScroll = () => {
      setOpacity(
        Math.min(1, Math.max(0, (window.scrollY - fadeFrom) / range)),
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: `color-mix(in oklch, var(--header-surface) calc(${opacity * 100}%), transparent)`,
          borderBottomColor: `color-mix(in oklch, var(--border) calc(${opacity * 100}%), transparent)`,
          backdropFilter:
            opacity > 0
              ? `blur(calc(var(--blur-glass) * ${opacity}))`
              : undefined,
          WebkitBackdropFilter:
            opacity > 0
              ? `blur(calc(var(--blur-glass) * ${opacity}))`
              : undefined,
        }}
      />
      <PageInset className="relative flex justify-end py-3">
        <ModeToggle />
      </PageInset>
    </header>
  );
}
