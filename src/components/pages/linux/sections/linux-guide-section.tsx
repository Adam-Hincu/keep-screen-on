const distributions = [
  {
    name: "Ubuntu / Debian-based",
    notes: [
      "Works in Chrome, Chromium, Firefox, and Edge where Wake Lock is enabled",
      "No need to change GNOME or KDE power profiles for a temporary session",
      "Useful during apt upgrades, ISO writes, and long compiles",
    ],
  },
  {
    name: "Fedora / RHEL-based",
    notes: [
      "Same browser wake lock flow as other Linux desktops",
      "Leaves systemd sleep settings and idle inhibitors untouched",
      "Handy for PackageKit updates and overnight jobs watched in a browser tab",
    ],
  },
  {
    name: "Other desktops",
    notes: [
      "XFCE, Cinnamon, and similar environments keep their own blanking rules",
      "Wake lock only applies while this tab remains open and active",
      "Press Stop or close the tab to release the lock immediately",
    ],
  },
] as const;

export function LinuxGuideSection() {
  return (
    <section className="pb-xl" aria-labelledby="linux-guide-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="linux-guide-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Linux desktop keep-awake guide
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Distribution-oriented notes for using browser wake lock instead of
            editing power or screen-blanking settings.
          </p>
        </div>

        <ol className="flex list-none flex-col gap-md">
          {distributions.map((distro, index) => (
            <li
              key={distro.name}
              className="flex flex-col gap-md rounded-2xl border border-border bg-card p-md sm:flex-row sm:gap-lg"
            >
              <span
                aria-hidden
                className="flex size-icon-lg shrink-0 items-center justify-center rounded-full bg-muted font-heading text-sm font-semibold text-muted-foreground"
              >
                {index + 1}
              </span>
              <div className="flex min-w-0 flex-col gap-3">
                <h3 className="font-heading text-md font-semibold text-foreground">
                  {distro.name}
                </h3>
                <ul className="flex list-disc flex-col gap-2 pl-lg text-muted-foreground marker:text-muted-foreground">
                  {distro.notes.map((note) => (
                    <li key={note} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <aside className="rounded-2xl border border-dashed border-border bg-muted p-md">
          <p className="leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Tip: </span>
            Wayland and X11 sessions both work when the browser exposes Screen
            Wake Lock. If a compositor policy forces idle lock, end the browser
            session and adjust that policy separately — this page never rewrites
            desktop environment config files.
          </p>
        </aside>
      </div>
    </section>
  );
}
