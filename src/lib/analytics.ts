import {
  getKeepScreenOnSupport,
  isKeepScreenOnSupported,
  type KeepScreenOnErrorReason,
  type KeepScreenOnUnsupportedReason,
} from "@/lib/keep-screen-on";
import { sitePages, type PageKey } from "@/lib/pages";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventParams = Record<string, string | number | boolean>;

export type DurationType = "no_limit" | "preset" | "custom";

export type PresetDuration = "1h" | "2h" | "4h" | "6h";

export type SessionStopReason =
  | "manual"
  | "timer_complete"
  | "wake_lock_released"
  | "page_unload";

export type DurationParams = {
  duration_type: DurationType;
  duration_seconds: number;
  preset?: PresetDuration;
};

export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams,
  options?: { beacon?: boolean },
) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  const cleaned: AnalyticsEventParams = {};

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        cleaned[key] = value;
      }
    }
  }

  if (options?.beacon) {
    window.gtag("event", eventName, {
      ...cleaned,
      transport_type: "beacon",
    });
    return;
  }

  window.gtag("event", eventName, cleaned);
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function getPageKeyFromPath(pathname: string): PageKey | "unknown" {
  const path = pathname.split("?")[0] || "/";
  const page = sitePages.find((entry) => entry.path === path);
  return page?.key ?? "unknown";
}

export function getDetectedPlatform():
  | "ios"
  | "android"
  | "macos"
  | "windows"
  | "linux"
  | "other"
  | "unknown" {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const ua = navigator.userAgent;

  if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }

  if (/Android/.test(ua)) {
    return "android";
  }

  if (/Mac/.test(navigator.platform) || /Macintosh/.test(ua)) {
    return "macos";
  }

  if (/Win/.test(navigator.platform) || /Windows/.test(ua)) {
    return "windows";
  }

  if (/Linux/.test(navigator.platform) || /Linux/.test(ua)) {
    return "linux";
  }

  return "other";
}

export function getBrowserBucket():
  | "safari"
  | "chrome"
  | "firefox"
  | "edge"
  | "samsung"
  | "other"
  | "unknown" {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const ua = navigator.userAgent;

  if (/Edg\//.test(ua)) {
    return "edge";
  }

  if (/SamsungBrowser/.test(ua)) {
    return "samsung";
  }

  if (/Firefox\//.test(ua)) {
    return "firefox";
  }

  if (/CriOS/.test(ua) || (/Chrome\//.test(ua) && !/Edg\//.test(ua))) {
    return "chrome";
  }

  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
    return "safari";
  }

  return "other";
}

export function isPwaStandalone(): boolean {
  if (typeof window === "undefined") {
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

const osPageKeys = new Set<PageKey>([
  "iphone",
  "android",
  "mac",
  "windows",
  "linux",
]);

export function isPlatformMismatch(pageKey: PageKey | "unknown"): boolean {
  if (!osPageKeys.has(pageKey as PageKey)) {
    return false;
  }

  const detected = getDetectedPlatform();
  const pageToDetected: Partial<Record<PageKey, string>> = {
    iphone: "ios",
    android: "android",
    mac: "macos",
    windows: "windows",
    linux: "linux",
  };

  const expected = pageToDetected[pageKey as PageKey];
  return expected !== undefined && detected !== expected && detected !== "unknown";
}

export function getCommonAnalyticsParams(pageKey: PageKey | "unknown") {
  return {
    page_key: pageKey,
    detected_os: getDetectedPlatform(),
    browser: getBrowserBucket(),
    is_pwa: isPwaStandalone(),
    wake_lock_supported: isKeepScreenOnSupported(),
  };
}

export function buildDurationParams(
  selection: "infinite" | "custom" | PresetDuration,
  customSeconds: number,
): DurationParams {
  if (selection === "infinite") {
    return {
      duration_type: "no_limit",
      duration_seconds: 0,
    };
  }

  if (selection === "custom") {
    return {
      duration_type: "custom",
      duration_seconds: customSeconds,
    };
  }

  const hours = Number.parseInt(selection, 10);

  return {
    duration_type: "preset",
    duration_seconds: hours * 3600,
    preset: selection,
  };
}

export function trackPlatformPageView(pageKey: PageKey | "unknown") {
  trackEvent("platform_page_view", {
    ...getCommonAnalyticsParams(pageKey),
    landing_os_page: pageKey,
    platform_mismatch: isPlatformMismatch(pageKey),
  });
}

export function trackBrowserUnsupportedVisit(
  pageKey: PageKey | "unknown",
  reason: KeepScreenOnUnsupportedReason,
) {
  trackEvent("browser_unsupported_visit", {
    ...getCommonAnalyticsParams(pageKey),
    reason,
  });
}

export function trackPageEngagement(
  pageKey: PageKey | "unknown",
  pagePath: string,
  dwellSeconds: number,
  options?: { beacon?: boolean },
) {
  if (dwellSeconds < 1) {
    return;
  }

  trackEvent(
    "page_engagement",
    {
      ...getCommonAnalyticsParams(pageKey),
      page_path: pagePath,
      landing_os_page: pageKey,
      dwell_seconds: dwellSeconds,
      platform_mismatch: isPlatformMismatch(pageKey),
    },
    options,
  );
}

export function trackDurationSelected(
  pageKey: PageKey | "unknown",
  selection: "infinite" | "custom" | PresetDuration,
  customSeconds: number,
) {
  const duration = buildDurationParams(selection, customSeconds);

  trackEvent("duration_selected", {
    ...getCommonAnalyticsParams(pageKey),
    selection,
    duration_type: duration.duration_type,
    duration_seconds: duration.duration_seconds,
    ...(duration.preset ? { preset: duration.preset } : {}),
  });
}

export function trackCustomTimeSet(
  pageKey: PageKey | "unknown",
  hours: number,
  minutes: number,
  seconds: number,
) {
  trackEvent("custom_time_set", {
    ...getCommonAnalyticsParams(pageKey),
    hours,
    minutes,
    seconds,
    duration_seconds: hours * 3600 + minutes * 60 + seconds,
  });
}

export function trackSessionStart(
  pageKey: PageKey | "unknown",
  duration: DurationParams,
) {
  trackEvent("session_start", {
    ...getCommonAnalyticsParams(pageKey),
    duration_type: duration.duration_type,
    duration_seconds: duration.duration_seconds,
    ...(duration.preset ? { preset: duration.preset } : {}),
  });
}

export function trackSessionEnd(
  pageKey: PageKey | "unknown",
  duration: DurationParams,
  stopReason: SessionStopReason,
  elapsedSeconds: number,
  options?: { beacon?: boolean },
) {
  trackEvent(
    "session_end",
    {
      ...getCommonAnalyticsParams(pageKey),
      duration_type: duration.duration_type,
      duration_seconds: duration.duration_seconds,
      ...(duration.preset ? { preset: duration.preset } : {}),
      stop_reason: stopReason,
      elapsed_seconds: elapsedSeconds,
    },
    options,
  );
}

export function trackWakeLockFailed(
  pageKey: PageKey | "unknown",
  reason: KeepScreenOnErrorReason | KeepScreenOnUnsupportedReason,
) {
  trackEvent("wake_lock_failed", {
    ...getCommonAnalyticsParams(pageKey),
    reason,
  });
}

export function trackTabSwitchDuringSession(
  pageKey: PageKey | "unknown",
  elapsedSeconds: number,
) {
  trackEvent("tab_switch_during_session", {
    ...getCommonAnalyticsParams(pageKey),
    elapsed_seconds: elapsedSeconds,
  });
}

export function trackTabSwitchNoticeView(pageKey: PageKey | "unknown") {
  trackEvent("tab_switch_notice_view", getCommonAnalyticsParams(pageKey));
}

export function trackTabSwitchNoticeDismiss(pageKey: PageKey | "unknown") {
  trackEvent("tab_switch_notice_dismiss", getCommonAnalyticsParams(pageKey));
}

export function trackPwaInstallClick(
  pageKey: PageKey | "unknown",
  method: "native" | "manual",
) {
  trackEvent("pwa_install_click", {
    ...getCommonAnalyticsParams(pageKey),
    method,
  });
}

export function trackPwaInstallResult(
  pageKey: PageKey | "unknown",
  outcome:
    | "accepted"
    | "dismissed"
    | "manual_shown"
    | "unavailable"
    | "failed",
  method?: "native" | "manual",
) {
  trackEvent("pwa_install_result", {
    ...getCommonAnalyticsParams(pageKey),
    outcome,
    ...(method ? { method } : {}),
  });
}

export function trackFaqExpand(
  pageKey: PageKey,
  question: string,
  index: number,
) {
  trackEvent("faq_expand", {
    ...getCommonAnalyticsParams(pageKey),
    question,
    faq_index: index,
  });
}

export function trackThemeChange(
  pageKey: PageKey | "unknown",
  theme: "light" | "dark" | "system",
) {
  trackEvent("theme_change", {
    ...getCommonAnalyticsParams(pageKey),
    theme,
  });
}

export function trackUnsupportedBrowserOnLoad(pageKey: PageKey | "unknown") {
  const support = getKeepScreenOnSupport();

  if (!support.supported) {
    trackBrowserUnsupportedVisit(pageKey, support.reason);
  }
}
