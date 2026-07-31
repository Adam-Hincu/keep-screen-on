"use client";

import {
  GA_MEASUREMENT_ID,
  getPageKeyFromPath,
  pageview,
  trackPageEngagement,
  trackPlatformPageView,
  trackUnsupportedBrowserOnLoad,
} from "@/lib/analytics";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef } from "react";

function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialPageview = useRef(true);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (isInitialPageview.current) {
      isInitialPageview.current = false;
      return;
    }

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

function PageEngagementTracker() {
  const pathname = usePathname();
  const accumulatedMsRef = useRef(0);
  const segmentStartRef = useRef<number | null>(null);
  const currentPathRef = useRef(pathname);
  const currentPageKeyRef = useRef(getPageKeyFromPath(pathname));
  const hasTrackedPageRef = useRef(false);

  const flush = useCallback((beacon = false) => {
    let dwellMs = accumulatedMsRef.current;

    if (
      segmentStartRef.current !== null &&
      document.visibilityState === "visible"
    ) {
      dwellMs += Date.now() - segmentStartRef.current;
    }

    trackPageEngagement(
      currentPageKeyRef.current,
      currentPathRef.current,
      Math.round(dwellMs / 1000),
      { beacon },
    );

    accumulatedMsRef.current = 0;
    segmentStartRef.current =
      document.visibilityState === "visible" ? Date.now() : null;
  }, []);

  useEffect(() => {
    const pageKey = getPageKeyFromPath(pathname);

    if (hasTrackedPageRef.current && currentPathRef.current !== pathname) {
      flush();
    }

    currentPathRef.current = pathname;
    currentPageKeyRef.current = pageKey;
    hasTrackedPageRef.current = true;

    trackPlatformPageView(pageKey);
    trackUnsupportedBrowserOnLoad(pageKey);

    segmentStartRef.current =
      document.visibilityState === "visible" ? Date.now() : null;
  }, [pathname, flush]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (segmentStartRef.current !== null) {
          accumulatedMsRef.current += Date.now() - segmentStartRef.current;
          segmentStartRef.current = null;
        }
        return;
      }

      segmentStartRef.current = Date.now();
    };

    const onPageHide = () => {
      flush(true);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      flush();
    };
  }, [flush]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsRouteTracker />
        <PageEngagementTracker />
      </Suspense>
    </>
  );
}
