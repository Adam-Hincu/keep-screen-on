export type LeaveGuardUnsupportedReason = "unsupported";

export type LeaveGuardSupport =
  | { supported: true }
  | { supported: false; reason: LeaveGuardUnsupportedReason };

export type LeaveGuardController = {
  support: () => LeaveGuardSupport;
  isSupported: () => boolean;
  isActive: () => boolean;
  enable: () => void;
  disable: () => void;
  dispose: () => void;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getLeaveGuardSupport(): LeaveGuardSupport {
  if (!isBrowser()) {
    return { supported: false, reason: "unsupported" };
  }

  return { supported: true };
}

export function isLeaveGuardSupported(): boolean {
  return getLeaveGuardSupport().supported;
}

function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = "";
}

export function createLeaveGuard(): LeaveGuardController {
  let active = false;

  return {
    support: getLeaveGuardSupport,

    isSupported: isLeaveGuardSupported,

    isActive() {
      return active;
    },

    enable() {
      if (active || !isBrowser()) {
        return;
      }

      window.addEventListener("beforeunload", handleBeforeUnload);
      active = true;
    },

    disable() {
      if (!active || !isBrowser()) {
        return;
      }

      window.removeEventListener("beforeunload", handleBeforeUnload);
      active = false;
    },

    dispose() {
      this.disable();
    },
  };
}

/** Shared controller for the app. Create your own with `createLeaveGuard()` if needed. */
export const leaveGuard = createLeaveGuard();
