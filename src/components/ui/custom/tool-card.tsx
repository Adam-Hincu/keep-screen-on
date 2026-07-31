"use client";

import { Play, Square } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  TimeDisplay,
  TimePicker,
  type TimeValue,
} from "@/components/ui/custom/time-picker";
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
  buildDurationParams,
  getPageKeyFromPath,
  trackCustomTimeSet,
  trackDurationSelected,
  trackSessionEnd,
  trackSessionStart,
  trackTabSwitchNoticeDismiss,
  trackWakeLockFailed,
  type DurationParams,
  type SessionStopReason,
} from "@/lib/analytics";
import { isKeepScreenOnSupported, keepScreenOn } from "@/lib/keep-screen-on";
import { tabSwitchNotice } from "@/lib/tab-switch-notice";

const durations = ["1h", "2h", "4h", "6h"] as const;

type Duration = (typeof durations)[number];
type Selection = "infinite" | "custom" | Duration;

const buttonClassName = "h-12 min-w-0 flex-1 font-semibold sm:min-w-20";
const toggleButtonClassName =
  "h-12 min-w-20 gap-2 px-lg font-semibold [&_svg]:size-icon-sm";

const emptyTime: TimeValue = { hours: 0, minutes: 0, seconds: 0 };

function timeToSeconds(time: TimeValue) {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

function secondsToTime(totalSeconds: number): TimeValue {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

function selectionToTime(selection: Selection): TimeValue {
  if (selection === "infinite" || selection === "custom") {
    return emptyTime;
  }

  return {
    hours: Number.parseInt(selection, 10),
    minutes: 0,
    seconds: 0,
  };
}

export function ToolCard() {
  const pathname = usePathname();
  const pageKey = getPageKeyFromPath(pathname);

  const [selection, setSelection] = useState<Selection>("infinite");
  const [customTime, setCustomTime] = useState<TimeValue>(emptyTime);
  const [isActive, setIsActive] = useState(false);
  const [runningTime, setRunningTime] = useState<TimeValue>(emptyTime);
  const [showTabSwitchNotice, setShowTabSwitchNotice] = useState(false);

  const startedAtRef = useRef(0);
  const durationSecondsRef = useRef(0);
  const countUpRef = useRef(false);
  const isActiveRef = useRef(false);
  const sessionDurationRef = useRef<DurationParams>(
    buildDurationParams("infinite", 0),
  );
  const sessionEndedRef = useRef(false);
  const pageKeyRef = useRef(pageKey);

  pageKeyRef.current = pageKey;

  const staticTime =
    selection === "custom" ? customTime : selectionToTime(selection);
  const displayTime = isActive ? runningTime : staticTime;
  const canStart = selection !== "custom" || timeToSeconds(customTime) >= 1;

  const getElapsedSeconds = useCallback(() => {
    if (!isActiveRef.current || startedAtRef.current === 0) {
      return 0;
    }

    return Math.floor((Date.now() - startedAtRef.current) / 1000);
  }, []);

  const endSessionAnalytics = useCallback(
    (stopReason: SessionStopReason, options?: { beacon?: boolean }) => {
      if (sessionEndedRef.current) {
        return;
      }

      sessionEndedRef.current = true;
      trackSessionEnd(
        pageKeyRef.current,
        sessionDurationRef.current,
        stopReason,
        getElapsedSeconds(),
        options,
      );
    },
    [getElapsedSeconds],
  );

  const stopSession = useCallback(
    async (stopReason: SessionStopReason = "manual") => {
      endSessionAnalytics(stopReason);
      await keepScreenOn.release();
      setIsActive(false);
      isActiveRef.current = false;
    },
    [endSessionAnalytics],
  );

  const selectDuration = useCallback(
    (nextSelection: Selection) => {
      setSelection(nextSelection);

      if (isActiveRef.current) {
        return;
      }

      const customSeconds =
        nextSelection === "custom" ? timeToSeconds(customTime) : 0;
      trackDurationSelected(pageKeyRef.current, nextSelection, customSeconds);
    },
    [customTime],
  );

  const handleCustomTimeChange = useCallback((nextTime: TimeValue) => {
    setCustomTime(nextTime);

    if (isActiveRef.current) {
      return;
    }

    trackCustomTimeSet(
      pageKeyRef.current,
      nextTime.hours,
      nextTime.minutes,
      nextTime.seconds,
    );
  }, []);

  const startSession = useCallback(async () => {
    if (!isKeepScreenOnSupported()) {
      trackWakeLockFailed(pageKeyRef.current, "unsupported");
      return;
    }

    const countUp = selection === "infinite";
    const durationSeconds = countUp ? 0 : timeToSeconds(staticTime);
    const durationParams = buildDurationParams(
      selection,
      timeToSeconds(customTime),
    );

    sessionEndedRef.current = false;
    sessionDurationRef.current = durationParams;

    const result = await keepScreenOn.request({
      onRelease: () => {
        if (!keepScreenOn.isSessionActive() || !isActiveRef.current) {
          return;
        }

        endSessionAnalytics("wake_lock_released");
        setIsActive(false);
        isActiveRef.current = false;
      },
      onError: (failure) => {
        if (!isActiveRef.current) {
          return;
        }

        trackWakeLockFailed(pageKeyRef.current, failure.reason);
      },
    });

    if (!result.ok) {
      trackWakeLockFailed(pageKeyRef.current, result.reason);
      return;
    }

    countUpRef.current = countUp;
    durationSecondsRef.current = durationSeconds;
    startedAtRef.current = Date.now();
    setRunningTime(countUp ? emptyTime : secondsToTime(durationSeconds));
    setIsActive(true);
    isActiveRef.current = true;
    trackSessionStart(pageKeyRef.current, durationParams);
  }, [customTime, endSessionAnalytics, selection, staticTime]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);

      if (countUpRef.current) {
        setRunningTime(secondsToTime(elapsed));
        return;
      }

      const remaining = Math.max(0, durationSecondsRef.current - elapsed);
      setRunningTime(secondsToTime(remaining));

      if (remaining === 0) {
        void stopSession("timer_complete");
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isActive, stopSession]);

  useEffect(() => {
    tabSwitchNotice.setElapsedSecondsProvider(getElapsedSeconds);
    tabSwitchNotice.start();
    const unsubscribe = tabSwitchNotice.subscribe(setShowTabSwitchNotice);

    return () => {
      unsubscribe();
      tabSwitchNotice.dispose();
    };
  }, [getElapsedSeconds]);

  useEffect(() => {
    const onPageHide = () => {
      if (isActiveRef.current) {
        endSessionAnalytics("page_unload", { beacon: true });
        isActiveRef.current = false;
      }
    };

    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      void keepScreenOn.dispose();
    };
  }, [endSessionAnalytics]);

  const handleTabSwitchNoticeOpenChange = useCallback((open: boolean) => {
    setShowTabSwitchNotice(open);

    if (!open) {
      trackTabSwitchNoticeDismiss(pageKeyRef.current);
      tabSwitchNotice.dismiss();
    }
  }, []);

  return (
    <>
      <Dialog
        open={showTabSwitchNotice}
        onOpenChange={handleTabSwitchNoticeOpenChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keep this tab active</DialogTitle>
            <DialogDescription>
              You left this tab during an active screen on session. To keep your screen
              lit, stay on this tab, otherwise your device may go to sleep.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => handleTabSwitchNoticeOpenChange(false)}
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex w-full flex-col gap-2 rounded-4xl bg-card p-md text-card-foreground sm:w-fit">
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={selection === "infinite" ? "default" : "outline"}
          className={buttonClassName}
          aria-label="Keep screen on with always-on mode"
          aria-pressed={selection === "infinite"}
          disabled={isActive}
          onClick={() => selectDuration("infinite")}
        >
          Always On
        </Button>
        <Button
          type="button"
          variant={selection === "custom" ? "default" : "outline"}
          className={buttonClassName}
          aria-pressed={selection === "custom"}
          disabled={isActive}
          onClick={() => selectDuration("custom")}
        >
          Custom
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {durations.map((duration) => (
          <Button
            key={duration}
            type="button"
            variant={selection === duration ? "default" : "outline"}
            className={buttonClassName}
            aria-pressed={selection === duration}
            disabled={isActive}
            onClick={() => selectDuration(duration)}
          >
            {duration}
          </Button>
        ))}
      </div>

      {selection === "custom" ? (
        <TimePicker
          value={displayTime}
          onChange={handleCustomTimeChange}
          playing={isActive}
        />
      ) : (
        <TimeDisplay value={displayTime} />
      )}

      <div className="flex justify-center">
        <Button
          type="button"
          variant={isActive ? "stop" : "default"}
          className={toggleButtonClassName}
          aria-label={
            isActive
              ? "Stop keeping screen on"
              : canStart
                ? "Start keeping screen on"
                : "Set a custom duration of at least 1 second to start"
          }
          aria-pressed={isActive}
          disabled={!isActive && !canStart}
          onClick={() => {
            if (isActive) {
              void stopSession("manual");
            } else {
              void startSession();
            }
          }}
        >
          {isActive ? (
            <>
              <Square aria-hidden="true" fill="currentColor" strokeWidth={0} />
              Stop
            </>
          ) : (
            <>
              <Play aria-hidden="true" fill="currentColor" strokeWidth={0} />
              Start
            </>
          )}
        </Button>
      </div>
    </div>
    </>
  );
}
