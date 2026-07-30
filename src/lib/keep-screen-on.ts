import { leaveGuard } from "@/lib/leave-guard";

export type KeepScreenOnUnsupportedReason = "unsupported" | "insecure-context";

export type KeepScreenOnErrorReason =
  | KeepScreenOnUnsupportedReason
  | "permission-denied"
  | "document-hidden"
  | "aborted"
  | "unknown";

export type KeepScreenOnSupport =
  | { supported: true }
  | { supported: false; reason: KeepScreenOnUnsupportedReason };

export type KeepScreenOnRequestResult =
  | { ok: true }
  | { ok: false; reason: KeepScreenOnErrorReason; message?: string };

export type KeepScreenOnOptions = {
  /** Re-request the lock when the tab becomes visible again. Default: true */
  reacquire?: boolean;
  /** Prompt before closing, refreshing, or navigating away. Default: true */
  leaveGuard?: boolean;
  onRelease?: () => void;
  onActive?: () => void;
  onError?: (result: Extract<KeepScreenOnRequestResult, { ok: false }>) => void;
};

export type KeepScreenOnController = {
  support: () => KeepScreenOnSupport;
  isSupported: () => boolean;
  /** Whether a session is requested, even if the wake lock was released (e.g. tab hidden). */
  isSessionActive: () => boolean;
  isActive: () => boolean;
  request: (options?: KeepScreenOnOptions) => Promise<KeepScreenOnRequestResult>;
  requestFor: (
    durationMs: number,
    options?: KeepScreenOnOptions,
  ) => Promise<KeepScreenOnRequestResult>;
  release: () => Promise<void>;
  dispose: () => Promise<void>;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof navigator !== "undefined";
}

export function getKeepScreenOnSupport(): KeepScreenOnSupport {
  if (!isBrowser()) {
    return { supported: false, reason: "unsupported" };
  }

  if (!window.isSecureContext) {
    return { supported: false, reason: "insecure-context" };
  }

  if (!("wakeLock" in navigator) || typeof navigator.wakeLock?.request !== "function") {
    return { supported: false, reason: "unsupported" };
  }

  return { supported: true };
}

export function isKeepScreenOnSupported(): boolean {
  return getKeepScreenOnSupport().supported;
}

function mapWakeLockError(error: unknown): Extract<KeepScreenOnRequestResult, { ok: false }> {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return {
        ok: false,
        reason: "permission-denied",
        message: error.message,
      };
    }

    if (error.name === "AbortError") {
      return {
        ok: false,
        reason: "aborted",
        message: error.message,
      };
    }

    return {
      ok: false,
      reason: "unknown",
      message: error.message,
    };
  }

  return { ok: false, reason: "unknown" };
}

export function createKeepScreenOn(): KeepScreenOnController {
  let sentinel: WakeLockSentinel | null = null;
  let wantsActive = false;
  let reacquire = true;
  let useLeaveGuard = true;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let options: KeepScreenOnOptions = {};
  let visibilityHandler: (() => void) | null = null;
  let releaseHandler: (() => void) | null = null;

  function clearTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function detachReleaseListener() {
    if (sentinel && releaseHandler) {
      sentinel.removeEventListener("release", releaseHandler);
    }
    releaseHandler = null;
  }

  function attachReleaseListener() {
    if (!sentinel) {
      return;
    }

    detachReleaseListener();

    releaseHandler = () => {
      sentinel = null;
      options.onRelease?.();

      if (!wantsActive || !reacquire) {
        return;
      }

      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }

      void acquire(false);
    };

    sentinel.addEventListener("release", releaseHandler);
  }

  function ensureVisibilityListener() {
    if (visibilityHandler || typeof document === "undefined") {
      return;
    }

    visibilityHandler = () => {
      if (document.visibilityState === "visible" && wantsActive) {
        void acquire(false);
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler);
  }

  function removeVisibilityListener() {
    if (visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", visibilityHandler);
    }
    visibilityHandler = null;
  }

  function syncLeaveGuard() {
    if (!useLeaveGuard) {
      leaveGuard.disable();
      return;
    }

    if (wantsActive) {
      leaveGuard.enable();
      return;
    }

    leaveGuard.disable();
  }

  async function acquire(notifyActive: boolean): Promise<KeepScreenOnRequestResult> {
    const support = getKeepScreenOnSupport();
    if (!support.supported) {
      const failure = { ok: false as const, reason: support.reason };
      options.onError?.(failure);
      return failure;
    }

    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      const failure = { ok: false as const, reason: "document-hidden" as const };
      options.onError?.(failure);
      return failure;
    }

    if (sentinel && !sentinel.released) {
      if (notifyActive) {
        options.onActive?.();
      }
      return { ok: true };
    }

    try {
      sentinel = await navigator.wakeLock.request("screen");
      attachReleaseListener();

      if (notifyActive) {
        options.onActive?.();
      }

      return { ok: true };
    } catch (error) {
      sentinel = null;
      const failure = mapWakeLockError(error);
      options.onError?.(failure);
      return failure;
    }
  }

  return {
    support: getKeepScreenOnSupport,

    isSupported: isKeepScreenOnSupported,

    isSessionActive() {
      return wantsActive;
    },

    isActive() {
      return sentinel !== null && !sentinel.released;
    },

    async request(nextOptions: KeepScreenOnOptions = {}) {
      wantsActive = true;
      options = nextOptions;
      reacquire = nextOptions.reacquire ?? true;
      useLeaveGuard = nextOptions.leaveGuard ?? true;
      ensureVisibilityListener();
      const result = await acquire(true);

      if (result.ok) {
        syncLeaveGuard();
      } else {
        wantsActive = false;
      }

      return result;
    },

    async requestFor(durationMs: number, nextOptions: KeepScreenOnOptions = {}) {
      const result = await this.request(nextOptions);
      if (!result.ok) {
        return result;
      }

      clearTimer();

      if (Number.isFinite(durationMs) && durationMs > 0) {
        timerId = setTimeout(() => {
          void this.release();
        }, durationMs);
      }

      return result;
    },

    async release() {
      wantsActive = false;
      syncLeaveGuard();
      clearTimer();
      detachReleaseListener();

      if (sentinel && !sentinel.released) {
        try {
          await sentinel.release();
        } catch {
          // Already released by the platform.
        }
      }

      sentinel = null;
    },

    async dispose() {
      await this.release();
      removeVisibilityListener();
      leaveGuard.dispose();
      options = {};
    },
  };
}

/** Shared controller for the app. Create your own with `createKeepScreenOn()` if needed. */
export const keepScreenOn = createKeepScreenOn();
