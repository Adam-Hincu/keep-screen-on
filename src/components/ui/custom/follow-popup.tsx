"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import {
  DiscordSocialIcon,
  XSocialIcon,
  YoutubeSocialIcon,
} from "@/components/ui/custom/social-icons";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 4000;
const HIDE_DURATION_MS = 350;

function FollowPopup() {
  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (document.visibilityState !== "visible" || dismissed) {
        return;
      }

      timeout = setTimeout(() => {
        setActive(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setOpen(true);
          });
        });
      }, SHOW_DELAY_MS);
    };

    schedule();
    document.addEventListener("visibilitychange", schedule);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setOpen(false);

    window.setTimeout(() => {
      setActive(false);
      setDismissed(true);
    }, HIDE_DURATION_MS);
  };

  if (!mounted || !active) {
    return null;
  }

  return (
    <aside
      aria-live="polite"
      aria-label="Follow Adam"
      className={cn(
        "fixed right-0 bottom-0 z-40 w-[calc(100%-var(--spacing-8))] max-w-[calc(var(--spacing-24)*4+var(--spacing-12))] origin-bottom-right p-4 pr-[calc(var(--spacing-4)+var(--safe-area-inset-right))] pb-[calc(var(--spacing-4)+var(--safe-area-inset-bottom))] pl-[calc(var(--spacing-4)+var(--safe-area-inset-left))] transition-[opacity,transform] duration-normal ease-emphasized will-change-transform",
        open
          ? "pointer-events-auto translate-x-0 translate-y-0 opacity-100"
          : "pointer-events-none translate-x-8 translate-y-10 opacity-0"
      )}
    >
      <div
        className="relative rounded-4xl border border-glass-border bg-glass p-md shadow-xl ring-[length:var(--border-default-width)] ring-border"
        style={{
          backdropFilter: "blur(var(--blur-glass))",
          WebkitBackdropFilter: "blur(var(--blur-glass))",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={handleDismiss}
          className="absolute top-3 right-3 rounded-full text-muted-foreground transition-colors duration-normal ease-emphasized outline-none hover:text-foreground focus-visible:ring-[length:var(--ring-width-default)] focus-visible:ring-focus-ring-default"
        >
          <XIcon className="size-icon-sm" />
        </button>

        <div className="flex items-start gap-3 pr-8">
          <Avatar className="size-12">
            <AvatarImage src="/images/profile-picture.jpg" alt="Adam" />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm leading-tight font-semibold tracking-tight text-foreground">
              Hi, Im Adam 👋
            </p>
            <p className="mt-1 text-sm leading-normal text-muted-foreground">
              Get free software that saves you hours. Join amazing builders and
              be the first to receive every new tool, 100% free.
            </p>
          </div>
        </div>

        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            readOnly
            aria-readonly="true"
            tabIndex={-1}
            className="h-10 min-w-0 flex-1 rounded-4xl border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="default" className="shrink-0">
            Join!
          </Button>
        </form>

        <div className="mt-3 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="X"
          >
            <XSocialIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="YouTube"
          >
            <YoutubeSocialIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Discord"
          >
            <DiscordSocialIcon />
          </Button>
        </div>
      </div>
    </aside>
  );
}

export { FollowPopup };
