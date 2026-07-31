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
import { fireConfetti } from "@/components/ui/custom/confetti";
import { emailRegistrySources } from "@/lib/email-registry";
import { socialLinks } from "@/lib/social-links";
import { useEmailRegistrySubmit } from "@/hooks/use-email-registry-submit";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 4000;
const HIDE_DURATION_MS = 350;
const SUCCESS_DISMISS_MS = 1800;
const CONFETTI_DELAY_MS = 350;

type SocialLinkButtonProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLinkButton({ href, label, children }: SocialLinkButtonProps) {
  return (
    <Button
      nativeButton={false}
      render={
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        />
      }
      variant="outline"
      size="icon"
    >
      {children}
    </Button>
  );
}

function FollowPopup() {
  const popupRef = React.useRef<HTMLElement>(null);
  const confettiFiredRef = React.useRef(false);
  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const dismissPopup = React.useCallback(() => {
    setOpen(false);

    window.setTimeout(() => {
      setActive(false);
      setDismissed(true);
    }, HIDE_DURATION_MS);
  }, []);

  const { submit, isSubmitting, isSuccess, isError, errorMessage } =
    useEmailRegistrySubmit({
      source: emailRegistrySources.followPopup,
      onSuccess: () => {
        window.setTimeout(dismissPopup, SUCCESS_DISMISS_MS);
      },
    });

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

  React.useEffect(() => {
    if (!active) {
      setOpen(false);
      confettiFiredRef.current = false;
      return;
    }

    const frame = requestAnimationFrame(() => {
      setOpen(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [active]);

  React.useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      if (confettiFiredRef.current || !popupRef.current) return;

      confettiFiredRef.current = true;

      const rect = popupRef.current.getBoundingClientRect();
      const originY = (rect.top + rect.height * 0.35) / window.innerHeight;

      fireConfetti({
        particleCount: 56,
        origin: {
          x: rect.left / window.innerWidth,
          y: originY,
        },
        angle: -Math.PI * 0.75,
        spread: Math.PI * 0.55,
      });
    }, CONFETTI_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [open]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || isSuccess) {
      return;
    }

    await submit(email);
  };

  if (!mounted || !active) {
    return null;
  }

  return (
    <aside
      ref={popupRef}
      aria-live="polite"
      aria-label="Follow Adam"
      className={cn(
        "fixed right-0 bottom-0 z-40 w-[calc(100%-var(--spacing-8))] max-w-[calc(var(--spacing-24)*4+var(--spacing-12))] p-4 pr-[calc(var(--spacing-4)+var(--safe-area-inset-right))] pb-[calc(var(--spacing-4)+var(--safe-area-inset-bottom))] pl-[calc(var(--spacing-4)+var(--safe-area-inset-left))] transition-transform duration-normal ease-emphasized",
        open
          ? "pointer-events-auto translate-y-0"
          : "pointer-events-none translate-y-full",
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
          onClick={dismissPopup}
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
          className="mt-4 flex flex-col gap-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
              disabled={isSubmitting || isSuccess}
              aria-invalid={isError}
              aria-describedby={isError ? "follow-popup-email-error" : undefined}
              className="h-10 min-w-0 flex-1 rounded-4xl border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-disabled focus-visible:ring-[length:var(--ring-width-default)] focus-visible:ring-focus-ring-default aria-invalid:border-destructive-border aria-invalid:ring-[length:var(--ring-width-default)] aria-invalid:ring-destructive-ring"
            />
            <Button
              type="submit"
              size="default"
              className="shrink-0"
              disabled={isSubmitting || isSuccess}
            >
              {isSuccess ? "Joined!" : isSubmitting ? "Joining..." : "Join!"}
            </Button>
          </div>

          {isError && errorMessage ? (
            <p
              id="follow-popup-email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errorMessage}
            </p>
          ) : null}
        </form>

        <div className="mt-3 flex items-center gap-2">
          {socialLinks.x ? (
            <SocialLinkButton href={socialLinks.x} label="X">
              <XSocialIcon />
            </SocialLinkButton>
          ) : null}
          {socialLinks.youtube ? (
            <SocialLinkButton href={socialLinks.youtube} label="YouTube">
              <YoutubeSocialIcon />
            </SocialLinkButton>
          ) : null}
          {socialLinks.discord ? (
            <SocialLinkButton href={socialLinks.discord} label="Discord">
              <DiscordSocialIcon />
            </SocialLinkButton>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

export { FollowPopup };
