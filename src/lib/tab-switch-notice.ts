import { keepScreenOn } from "@/lib/keep-screen-on";

export type TabSwitchNoticeOptions = {
  isSessionActive?: () => boolean;
  onNotice?: () => void;
};

export type TabSwitchNoticeController = {
  shouldShow: () => boolean;
  dismiss: () => void;
  subscribe: (listener: (shouldShow: boolean) => void) => () => void;
  start: () => void;
  dispose: () => void;
};

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

export function createTabSwitchNotice(
  options: TabSwitchNoticeOptions = {},
): TabSwitchNoticeController {
  let leftTabWhileSessionActive = false;
  let pendingNotice = false;
  let started = false;
  let visibilityHandler: (() => void) | null = null;
  const listeners = new Set<(shouldShow: boolean) => void>();

  const isSessionActive =
    options.isSessionActive ?? (() => keepScreenOn.isSessionActive());

  function notify() {
    for (const listener of listeners) {
      listener(pendingNotice);
    }
  }

  function handleVisibilityChange() {
    if (!isBrowser()) {
      return;
    }

    if (document.visibilityState === "hidden") {
      if (isSessionActive()) {
        leftTabWhileSessionActive = true;
      }
      return;
    }

    if (!leftTabWhileSessionActive) {
      return;
    }

    leftTabWhileSessionActive = false;

    if (!isSessionActive()) {
      return;
    }

    pendingNotice = true;
    options.onNotice?.();
    notify();
  }

  return {
    shouldShow() {
      return pendingNotice;
    },

    dismiss() {
      if (!pendingNotice) {
        return;
      }

      pendingNotice = false;
      notify();
    },

    subscribe(listener) {
      listeners.add(listener);
      listener(pendingNotice);

      return () => {
        listeners.delete(listener);
      };
    },

    start() {
      if (started || !isBrowser()) {
        return;
      }

      visibilityHandler = handleVisibilityChange;
      document.addEventListener("visibilitychange", visibilityHandler);
      started = true;
    },

    dispose() {
      if (visibilityHandler) {
        document.removeEventListener("visibilitychange", visibilityHandler);
      }

      visibilityHandler = null;
      started = false;
      leftTabWhileSessionActive = false;
      pendingNotice = false;
      listeners.clear();
    },
  };
}

/** Shared controller wired to the keep-screen-on session. */
export const tabSwitchNotice = createTabSwitchNotice();
