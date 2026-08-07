import { Battery, Lock, Smartphone, Timer } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Open in Chrome or Samsung Internet",
    detail:
      "Load this page on your Android phone or tablet — no Play Store install.",
  },
  {
    icon: Timer,
    title: "Pick Always On, Custom, or a preset",
    detail:
      "Match the session length to your download, meeting, or reading time.",
  },
  {
    icon: Lock,
    title: "Start the wake lock",
    detail:
      "The browser requests Screen Wake Lock so the display stays awake in this tab.",
  },
  {
    icon: Battery,
    title: "Stop when finished",
    detail:
      "Release the lock to return to your normal screen timeout and save battery.",
  },
] as const;

export function AndroidTimelineSection() {
  return (
    <section className="pb-xl" aria-labelledby="android-timeline-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="android-timeline-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Android session timeline
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            A quick path from opening the page to releasing wake lock — without
            changing Android screen timeout settings.
          </p>
        </div>

        <ol className="flex list-none flex-col">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li key={step.title} className="flex gap-md">
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className="flex size-icon-lg shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
                  >
                    <Icon className="size-icon-sm" aria-hidden />
                  </span>
                  {!isLast ? (
                    <span
                      aria-hidden
                      className="w-px flex-1 bg-border opacity-subtle"
                    />
                  ) : null}
                </div>
                <div
                  className={
                    isLast ? "min-w-0 flex-1" : "min-w-0 flex-1 pb-lg"
                  }
                >
                  <h3 className="font-heading text-md font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
