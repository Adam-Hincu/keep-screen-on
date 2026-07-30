"use client";

import { Play, Square } from "lucide-react";
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
  const [selection, setSelection] = useState<Selection>("infinite");
  const [customTime, setCustomTime] = useState<TimeValue>(emptyTime);
  const [isActive, setIsActive] = useState(false);
  const [runningTime, setRunningTime] = useState<TimeValue>(emptyTime);
  const [showTabSwitchNotice, setShowTabSwitchNotice] = useState(false);

  const startedAtRef = useRef(0);
  const durationSecondsRef = useRef(0);
  const countUpRef = useRef(false);

  const staticTime =
    selection === "custom" ? customTime : selectionToTime(selection);
  const displayTime = isActive ? runningTime : staticTime;
  const canStart = selection !== "custom" || timeToSeconds(customTime) >= 1;

  const stopSession = useCallback(async () => {
    await keepScreenOn.release();
    setIsActive(false);
  }, []);

  const startSession = useCallback(async () => {
    if (!isKeepScreenOnSupported()) {
      return;
    }

    const countUp = selection === "infinite";
    const durationSeconds = countUp ? 0 : timeToSeconds(staticTime);
    const result = await keepScreenOn.request();

    if (!result.ok) {
      return;
    }

    countUpRef.current = countUp;
    durationSecondsRef.current = durationSeconds;
    startedAtRef.current = Date.now();
    setRunningTime(countUp ? emptyTime : secondsToTime(durationSeconds));
    setIsActive(true);
  }, [selection, staticTime]);

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
        void stopSession();
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isActive, stopSession]);

  useEffect(() => {
    tabSwitchNotice.start();
    const unsubscribe = tabSwitchNotice.subscribe(setShowTabSwitchNotice);

    return () => {
      unsubscribe();
      tabSwitchNotice.dispose();
    };
  }, []);

  useEffect(() => {
    return () => {
      void keepScreenOn.dispose();
    };
  }, []);

  const handleTabSwitchNoticeOpenChange = useCallback((open: boolean) => {
    setShowTabSwitchNotice(open);

    if (!open) {
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
          aria-label="Keep screen on with no time limit"
          aria-pressed={selection === "infinite"}
          disabled={isActive}
          onClick={() => setSelection("infinite")}
        >
          No Limit
        </Button>
        <Button
          type="button"
          variant={selection === "custom" ? "default" : "outline"}
          className={buttonClassName}
          aria-pressed={selection === "custom"}
          disabled={isActive}
          onClick={() => setSelection("custom")}
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
            onClick={() => setSelection(duration)}
          >
            {duration}
          </Button>
        ))}
      </div>

      {selection === "custom" ? (
        <TimePicker
          value={displayTime}
          onChange={setCustomTime}
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
              void stopSession();
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
