'use client';

import { useEffect, useState } from 'react';

import { SlidingNumber } from '@/components/ui/custom/sliding-number';

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

export function Home() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const time = getTimeParts(now);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-lg">
      <div className="flex flex-col items-center gap-md rounded-4xl border border-widget-border bg-widget p-xl text-widget-foreground shadow-md">
        <time
          dateTime={formatDateTime(now)}
          className="flex items-center gap-2 text-display font-semibold leading-none tracking-tight"
        >
          <SlidingNumber value={time.hours} padStart />
          <span aria-hidden>:</span>
          <SlidingNumber value={time.minutes} padStart />
          <span aria-hidden>:</span>
          <SlidingNumber value={time.seconds} padStart />
        </time>
      </div>
    </main>
  );
}
