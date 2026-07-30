'use client';

import { useEffect, useState } from 'react';

import { ClockSeparator, SlidingNumber } from '@/components/ui/custom/sliding-number';

function getTimeParts(date: Date) {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

function formatDateTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

type HomeProps = {
  initialNow: string;
};

export function Home({ initialNow }: HomeProps) {
  const [now, setNow] = useState(() => new Date(initialNow));

  useEffect(() => {
    setNow(new Date());

    const id = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const time = getTimeParts(now);
  const dateTime = formatDateTime(now);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-lg">
      <div className="flex flex-col items-center gap-md rounded-4xl bg-card p-xl text-card-foreground">
        <time
          dateTime={dateTime}
          suppressHydrationWarning
          className="inline-flex items-center gap-2 font-mono tabular-nums text-display font-semibold tracking-tight"
        >
          <SlidingNumber value={time.hours} padStart />
          <ClockSeparator />
          <SlidingNumber value={time.minutes} padStart />
          <ClockSeparator />
          <SlidingNumber value={time.seconds} padStart />
        </time>
      </div>
    </main>
  );
}
