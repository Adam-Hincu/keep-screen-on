type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type PwaInstallMethod = "native" | "manual";

export type PwaInstallState = {
  available: boolean;
  method: PwaInstallMethod | null;
};

export type PwaInstallResult =
  | { ok: true; method: "native"; outcome: "accepted" | "dismissed" }
  | { ok: true; method: "manual" }
  | { ok: false; reason: "unavailable" | "failed" };

export type PwaInstallController = {
  getState: () => PwaInstallState;
  subscribe: (listener: (state: PwaInstallState) => void) => () => void;
  requestInstall: () => Promise<PwaInstallResult>;
  start: () => void;
  dispose: () => void;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isStandaloneDisplay(): boolean {
  if (!isBrowser()) {
    return false;
  }

  if (window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  }

  return (
    "standalone" in navigator &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosDevice(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isInAppBrowser(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return /FBAN|FBAV|Instagram|Line\/|LinkedInApp|Twitter|Snapchat|TikTok/i.test(
    navigator.userAgent,
  );
}

function canOfferManualInstall(): boolean {
  return isIosDevice() && !isStandaloneDisplay() && !isInAppBrowser();
}

function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  void navigator.serviceWorker.register("/pwa/sw.js", { scope: "/" }).catch(() => {
    // Installability falls back to manual guidance on supported platforms.
  });
}

export function createPwaInstallController(): PwaInstallController {
  let started = false;
  let deferredPrompt: BeforeInstallPromptEvent | null = null;
  const listeners = new Set<(state: PwaInstallState) => void>();
  let beforeInstallHandler: ((event: Event) => void) | null = null;
  let appInstalledHandler: (() => void) | null = null;

  function buildState(): PwaInstallState {
    if (isStandaloneDisplay()) {
      return { available: false, method: null };
    }

    if (deferredPrompt) {
      return { available: true, method: "native" };
    }

    if (canOfferManualInstall()) {
      return { available: true, method: "manual" };
    }

    return { available: false, method: null };
  }

  function notify() {
    const state = buildState();

    for (const listener of listeners) {
      listener(state);
    }
  }

  function clearDeferredPrompt() {
    deferredPrompt = null;
    notify();
  }

  return {
    getState() {
      return buildState();
    },

    subscribe(listener) {
      listeners.add(listener);
      listener(buildState());

      return () => {
        listeners.delete(listener);
      };
    },

    async requestInstall() {
      const state = buildState();

      if (!state.available || !state.method) {
        return { ok: false, reason: "unavailable" } as const;
      }

      if (state.method === "manual") {
        return { ok: true, method: "manual" } as const;
      }

      if (!deferredPrompt) {
        return { ok: false, reason: "unavailable" } as const;
      }

      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        clearDeferredPrompt();
        return { ok: true, method: "native", outcome } as const;
      } catch {
        clearDeferredPrompt();
        return { ok: false, reason: "failed" } as const;
      }
    },

    start() {
      if (started || !isBrowser()) {
        return;
      }

      registerServiceWorker();

      beforeInstallHandler = (event: Event) => {
        event.preventDefault();
        deferredPrompt = event as BeforeInstallPromptEvent;
        notify();
      };

      appInstalledHandler = () => {
        clearDeferredPrompt();
      };

      window.addEventListener("beforeinstallprompt", beforeInstallHandler);
      window.addEventListener("appinstalled", appInstalledHandler);
      started = true;
      notify();
    },

    dispose() {
      if (beforeInstallHandler) {
        window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      }

      if (appInstalledHandler) {
        window.removeEventListener("appinstalled", appInstalledHandler);
      }

      beforeInstallHandler = null;
      appInstalledHandler = null;
      deferredPrompt = null;
      started = false;
      listeners.clear();
    },
  };
}

/** Shared controller for the install-app affordance. */
export const pwaInstall = createPwaInstallController();
