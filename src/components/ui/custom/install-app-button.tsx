"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import {
  getPageKeyFromPath,
  trackPwaInstallClick,
  trackPwaInstallResult,
} from "@/lib/analytics";
import {
  pwaInstall,
  type PwaInstallState,
} from "@/lib/pwa-install";
import { cn } from "@/lib/utils";

type InstallAppButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
>;

function InstallAppButton({ className, ...props }: InstallAppButtonProps) {
  const pathname = usePathname();
  const pageKey = getPageKeyFromPath(pathname);

  const [state, setState] = React.useState<PwaInstallState>({
    available: false,
    method: null,
  });
  const [manualOpen, setManualOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    pwaInstall.start();
    return pwaInstall.subscribe(setState);
  }, []);

  const handleClick = async () => {
    const currentState = pwaInstall.getState();

    if (!currentState.available || !currentState.method) {
      trackPwaInstallResult(pageKey, "unavailable");
      return;
    }

    trackPwaInstallClick(pageKey, currentState.method);

    const result = await pwaInstall.requestInstall();

    if (!result.ok) {
      trackPwaInstallResult(pageKey, result.reason);
      return;
    }

    if (result.method === "manual") {
      trackPwaInstallResult(pageKey, "manual_shown", "manual");
      setManualOpen(true);
      return;
    }

    trackPwaInstallResult(pageKey, result.outcome, "native");
  };

  if (!state.available) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="default"
        className={cn(className)}
        onClick={handleClick}
        aria-label="Install app"
      >
        <Download />
        Install app
      </Button>

      <Dialog open={manualOpen} onOpenChange={setManualOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install app</DialogTitle>
            <DialogDescription>
              Tap Share in the browser toolbar, then choose Add to Home Screen.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="button" onClick={() => setManualOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { InstallAppButton };
export type { InstallAppButtonProps };
