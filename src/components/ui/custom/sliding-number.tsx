'use client'

import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

import { cn } from '@/lib/utils'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const STRIP = [...DIGITS, ...DIGITS, ...DIGITS];
const STRIP_BASE = 10;

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(value / place) % 10;
  const [measureRef, bounds] = useMeasure();
  const height = bounds.height;
  const [index, setIndex] = useState(STRIP_BASE + digit);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);
  const prevDigitRef = useRef(digit);

  useEffect(() => {
    if (!height) return;

    const prev = prevDigitRef.current;
    if (prev === digit) return;

    let delta = digit - prev;
    if (delta > 5) delta -= 10;
    if (delta < -5) delta += 10;

    setIndex((current) => current + delta);
    prevDigitRef.current = digit;
  }, [digit, height]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !height) return;

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return;
      if (index < STRIP_BASE || index >= STRIP_BASE + 10) {
        setTransitionEnabled(false);
        setIndex(STRIP_BASE + digit);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionEnabled(true));
        });
      }
    };

    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [index, height, digit]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip">
      <div ref={measureRef} className="invisible">
        0
      </div>
      {height > 0 && (
        <div
          ref={stripRef}
          className={cn(
            'absolute inset-x-0 top-0 flex flex-col',
            transitionEnabled && 'sliding-digit-strip'
          )}
          style={{ transform: `translateY(-${index * height}px)` }}
        >
          {STRIP.map((number, stripIndex) => (
            <span
              key={stripIndex}
              className="flex items-center justify-center"
              style={{ height }}
            >
              {number}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = '.',
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split('.');
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split('');
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  return (
    <div className="flex items-center font-mono tabular-nums">
      {value < 0 && '-'}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split('').map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}
