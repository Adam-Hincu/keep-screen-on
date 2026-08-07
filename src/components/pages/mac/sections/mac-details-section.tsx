import { ChevronDown } from "lucide-react";

const topics = [
  {
    title: "Energy Saver vs browser wake lock",
    body: "Energy Saver and Battery settings control how macOS blanks the display system-wide. Keep Screen On only holds a wake lock while this Safari or Chrome tab stays open — your Energy Saver preferences are left alone.",
  },
  {
    title: "MacBook, iMac, Mac mini, Mac Studio",
    body: "The same page works across Apple silicon and Intel Macs in supported browsers. Start Always On or a timed session when you need the display to stay lit for demos, downloads, or remote work.",
  },
  {
    title: "Password prompts and sleep",
    body: "Preventing display sleep reduces repeated password prompts caused by the screen locking while a long task runs. Closing the tab or pressing Stop ends the wake lock immediately.",
  },
  {
    title: "When macOS may still sleep",
    body: "Managed Macs with forced lock policies, low-power modes, or closed-lid laptop behavior can still override browser wake lock. For everyday use on a personal Mac, the in-browser session is usually enough.",
  },
] as const;

export function MacDetailsSection() {
  return (
    <section className="pb-xl" aria-labelledby="mac-details-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="mac-details-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Mac display reference
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Expand each topic for macOS-specific notes on keeping the screen
            awake from the browser.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {topics.map((topic) => (
            <details
              key={topic.title}
              className="group rounded-2xl border border-border bg-card p-md"
            >
              <summary className="cursor-pointer list-none font-heading text-md font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {topic.title}
                  <ChevronDown
                    aria-hidden
                    className="size-icon-sm shrink-0 text-muted-foreground transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:var(--ease-emphasized)] group-open:rotate-180"
                  />
                </span>
              </summary>
              <p className="mt-md leading-relaxed text-muted-foreground">
                {topic.body}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
