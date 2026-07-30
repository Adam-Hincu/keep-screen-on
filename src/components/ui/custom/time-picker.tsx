"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import {
  ClockSeparator,
  SlidingNumber,
} from "@/components/ui/custom/sliding-number";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";

type TimeValue = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimeDisplayProps = {
  value: TimeValue;
  className?: string;
};

type TimePickerProps = {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  className?: string;
  playing?: boolean;
};

const stepperClassName =
  "size-10 shrink-0 touch-none rounded-4xl select-none [&_svg]:size-icon-sm";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRepeatIntervalMs() {
  return Math.max(50, Math.floor(getHoldDelayMs() / 4));
}

function getHoldDelayMs() {
  if (typeof window === "undefined") {
    return 350;
  }

  const duration = getComputedStyle(document.documentElement)
    .getPropertyValue("--duration-normal")
    .trim();

  if (duration.endsWith("ms")) {
    return Number.parseInt(duration, 10);
  }

  if (duration.endsWith("s")) {
    return Number.parseFloat(duration) * 1000;
  }

  return 350;
}

function StepperButton({
  label,
  onStep,
  children,
}: {
  label: string;
  onStep: () => void;
  children: React.ReactNode;
}) {
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const stepRef = useRef(onStep);

  stepRef.current = onStep;

  const stopHold = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = undefined;
    }

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = undefined;
    }
  }, []);

  const startHold = useCallback(
    (pointerId: number, target: HTMLElement) => {
      stopHold();
      target.setPointerCapture(pointerId);
      stepRef.current();

      holdTimeoutRef.current = setTimeout(() => {
        holdIntervalRef.current = setInterval(() => {
          stepRef.current();
        }, getRepeatIntervalMs());
      }, getHoldDelayMs());
    },
    [stopHold],
  );

  useEffect(() => stopHold, [stopHold]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={stepperClassName}
      aria-label={label}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        startHold(event.pointerId, event.currentTarget);
      }}
      onPointerUp={stopHold}
      onPointerCancel={stopHold}
      onLostPointerCapture={stopHold}
      onContextMenu={(event) => event.preventDefault()}
    >
      {children}
    </Button>
  );
}

function TimeField({
  label,
  value,
  onStep,
}: {
  label: string;
  value: number;
  onStep: (delta: number) => void;
}) {
  const stepUp = useCallback(() => {
    onStep(1);
  }, [onStep]);

  const stepDown = useCallback(() => {
    onStep(-1);
  }, [onStep]);

  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-col items-center gap-2"
    >
      <StepperButton label={`Increase ${label}`} onStep={stepUp}>
        <ChevronUp aria-hidden="true" />
      </StepperButton>
      <SlidingNumber value={value} padStart />
      <StepperButton label={`Decrease ${label}`} onStep={stepDown}>
        <ChevronDown aria-hidden="true" />
      </StepperButton>
    </div>
  );
}

function TimeFace({ value, className }: TimeDisplayProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-4xl font-bold tracking-tight tabular-nums sm:text-display",
        className,
      )}
    >
      <SlidingNumber value={value.hours} padStart />
      <ClockSeparator />
      <SlidingNumber value={value.minutes} padStart />
      <ClockSeparator />
      <SlidingNumber value={value.seconds} padStart />
    </span>
  );
}

function TimeDisplay({ value, className }: TimeDisplayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex w-full min-w-0 items-center justify-center py-12 sm:py-16",
        className,
      )}
    >
      <TimeFace value={value} />
    </div>
  );
}

function TimePicker({
  value,
  onChange,
  className,
  playing = false,
}: TimePickerProps) {
  const valueRef = useRef(value);
  valueRef.current = value;

  const stepField = useCallback(
    (field: keyof TimeValue, delta: number, min: number, max: number) => {
      const current = valueRef.current[field];
      const next = clamp(current + delta, min, max);

      if (next === current) {
        return;
      }

      const nextValue = { ...valueRef.current, [field]: next };
      valueRef.current = nextValue;
      onChange(nextValue);
    },
    [onChange],
  );

  return (
    <div
      role="group"
      aria-label="Custom duration"
      className={cn(
        "flex w-full min-w-0 items-center justify-center py-12 sm:py-16",
        className,
      )}
    >
      {playing ? (
        <TimeFace value={value} />
      ) : (
        <div className="inline-flex items-center gap-2 font-mono text-4xl font-bold tracking-tight tabular-nums sm:gap-3 sm:text-display">
          <TimeField
            label="hours"
            value={value.hours}
            onStep={(delta) => stepField("hours", delta, 0, 99)}
          />
          <ClockSeparator />
          <TimeField
            label="minutes"
            value={value.minutes}
            onStep={(delta) => stepField("minutes", delta, 0, 59)}
          />
          <ClockSeparator />
          <TimeField
            label="seconds"
            value={value.seconds}
            onStep={(delta) => stepField("seconds", delta, 0, 59)}
          />
        </div>
      )}
    </div>
  );
}

export { TimeDisplay, TimePicker };
export type { TimePickerProps, TimeValue };
