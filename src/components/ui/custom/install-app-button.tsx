"use client";

import * as React from "react";
import { Download } from "lucide-react";

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
  pwaInstall,
  type PwaInstallState,
} from "@/lib/pwa-install";
import { cn } from "@/lib/utils";

type InstallAppButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
>;

function InstallAppButton({ className, ...props }: InstallAppButtonProps) {
  const [state, setState] = React.useState<PwaInstallState>({
    available: false,
    method: null,
  });
  const [manualOpen, setManualOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    pwaInstall.start();
    return pwaInstall.subscribe(setState);
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = async () => {
    const result = await pwaInstall.requestInstall();

    if (result.ok && result.method === "manual") {
      setManualOpen(true);
    }
  };

  if (!mounted || !state.available) {
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
