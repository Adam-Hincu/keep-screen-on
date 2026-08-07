const rows = [
  {
    approach: "Windows Settings → Power",
    installs: "No",
    temporary: "No — changes stick until you revert",
    scope: "Whole PC power plan",
  },
  {
    approach: "Third-party keep-awake apps",
    installs: "Yes",
    temporary: "Depends on the app",
    scope: "Often system-wide",
  },
  {
    approach: "Keep Screen On (this page)",
    installs: "No",
    temporary: "Yes — ends when you stop or close the tab",
    scope: "Current browser tab only",
  },
] as const;

export function WindowsCompareSection() {
  return (
    <section className="pb-xl" aria-labelledby="windows-compare-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="windows-compare-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Windows keep-awake options compared
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            How this free browser wake lock stacks up against changing Windows
            power settings or installing desktop utilities.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of Windows power settings, third-party apps, and browser
              wake lock
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Approach
                </th>
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Install required
                </th>
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Temporary session
                </th>
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Scope
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.approach}
                  className="border-b border-border last:border-b-0"
                >
                  <th
                    scope="row"
                    className="p-md font-semibold text-foreground"
                  >
                    {row.approach}
                  </th>
                  <td className="p-md leading-relaxed text-muted-foreground">
                    {row.installs}
                  </td>
                  <td className="p-md leading-relaxed text-muted-foreground">
                    {row.temporary}
                  </td>
                  <td className="p-md leading-relaxed text-muted-foreground">
                    {row.scope}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
