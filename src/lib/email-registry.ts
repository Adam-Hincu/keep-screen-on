import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type SubmitEmailRegistryInput = {
  email: string;
  source: string;
};

export type SubmitEmailRegistryFailureReason =
  | "unconfigured"
  | "invalid_email"
  | "invalid_source"
  | "network"
  | "server";

export type SubmitEmailRegistryResult =
  | { ok: true }
  | { ok: false; reason: SubmitEmailRegistryFailureReason };

export type EmailRegistrySubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_MAX_LENGTH = 64;

function getClientContext() {
  if (typeof window === "undefined") {
    return {
      userAgent: null,
      referrer: null,
    };
  }

  return {
    userAgent: navigator.userAgent || null,
    referrer: document.referrer || null,
  };
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeSource(value: string): string {
  return value.trim();
}

function isValidEmail(value: string): boolean {
  return value.length > 0 && value.length <= 254 && EMAIL_PATTERN.test(value);
}

function isValidSource(value: string): boolean {
  return value.length > 0 && value.length <= SOURCE_MAX_LENGTH;
}

export async function submitEmailToRegistry(
  input: SubmitEmailRegistryInput,
): Promise<SubmitEmailRegistryResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, reason: "unconfigured" };
  }

  const email = normalizeEmail(input.email);
  const source = normalizeSource(input.source);

  if (!isValidEmail(email)) {
    return { ok: false, reason: "invalid_email" };
  }

  if (!isValidSource(source)) {
    return { ok: false, reason: "invalid_source" };
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return { ok: false, reason: "unconfigured" };
  }

  const { userAgent, referrer } = getClientContext();

  const { error } = await supabase.rpc("submit_keep_screen_on_email", {
    p_email: email,
    p_source: source,
    p_user_agent: userAgent,
    p_referrer: referrer,
  });

  if (error) {
    if (error.code === "22023") {
      return { ok: false, reason: "invalid_email" };
    }

    return { ok: false, reason: "server" };
  }

  return { ok: true };
}

export const emailRegistrySources = {
  emailPopup: "email-popup",
} as const;

export type EmailRegistrySource =
  (typeof emailRegistrySources)[keyof typeof emailRegistrySources];

export function getEmailRegistryErrorMessage(
  reason: SubmitEmailRegistryFailureReason,
): string {
  switch (reason) {
    case "invalid_email":
      return "Enter a valid email address.";
    case "invalid_source":
    case "unconfigured":
    case "network":
    case "server":
      return "Something went wrong. Please try again.";
  }
}
