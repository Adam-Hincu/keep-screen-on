"use client";

import { Play, Square } from "lucide-react";
import { useState } from "react";

import { InvertedTheme } from "@/components/ui/custom/inverted-theme";
import {
  TimeDisplay,
  TimePicker,
  type TimeValue,
} from "@/components/ui/custom/time-picker";
import { Button } from "@/components/ui/shadcn/button";

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

  const displayTime =
    selection === "custom" ? customTime : selectionToTime(selection);
  const canStart = selection !== "custom" || timeToSeconds(customTime) >= 1;

  return (
    <InvertedTheme className="flex w-full flex-col gap-2 rounded-4xl bg-card p-md text-card-foreground sm:w-fit">
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
          value={customTime}
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
          onClick={() => setIsActive((active) => !active)}
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
    </InvertedTheme>
  );
}
