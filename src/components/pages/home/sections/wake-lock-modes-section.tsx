const modes = [
  {
    name: "Always On",
    summary: "No time limit — wake lock stays active until you stop it or close the tab.",
    bestFor: "Dashboards, monitoring, long remote sessions",
  },
  {
    name: "Custom",
    summary: "Pick an exact duration with the time picker, then start when ready.",
    bestFor: "Meetings, downloads, timed presentations",
  },
  {
    name: "Presets",
    summary: "Quick display-timeout style durations without opening system settings.",
    bestFor: "Short tasks when you already know how long you need",
  },
] as const;

const keeps = [
  "Screen from dimming while this tab is open and wake lock is active",
  "Display from sleeping for the selected duration or until you stop",
  "Your normal screen timeout and power settings unchanged after the session",
] as const;

const doesNot = [
  "Install software or change OS power plans permanently",
  "Override enterprise policies that force lock or sleep",
  "Keep the screen on after the tab is closed or the session ends",
] as const;

export function WakeLockModesSection() {
  return (
    <section className="pb-xl" aria-labelledby="wake-lock-modes-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="wake-lock-modes-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Session modes at a glance
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Choose how long the browser should hold a wake lock. Every mode runs
            in-page — no signup, no download.
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 gap-md sm:grid-cols-3">
          {modes.map((mode) => (
            <li
              key={mode.name}
              className="flex flex-col gap-md rounded-2xl border border-border bg-card p-md"
            >
              <h3 className="font-heading text-md font-semibold text-foreground">
                {mode.name}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {mode.summary}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Best for: </span>
                {mode.bestFor}
              </p>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          <figure className="flex flex-col gap-md rounded-2xl border border-border bg-card p-md">
            <figcaption className="font-heading text-md font-semibold text-foreground">
              What wake lock keeps doing
            </figcaption>
            <ul className="flex list-disc flex-col gap-2 pl-lg text-muted-foreground marker:text-muted-foreground">
              {keeps.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </figure>

          <figure className="flex flex-col gap-md rounded-2xl border border-border bg-card p-md">
            <figcaption className="font-heading text-md font-semibold text-foreground">
              What it does not change
            </figcaption>
            <ul className="flex list-disc flex-col gap-2 pl-lg text-muted-foreground marker:text-muted-foreground">
              {doesNot.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
