const browsers = [
  {
    name: "Chrome",
    desktop: "Supported",
    mobile: "Supported on Android",
  },
  {
    name: "Edge",
    desktop: "Supported",
    mobile: "Supported where Wake Lock is available",
  },
  {
    name: "Firefox",
    desktop: "Supported on recent versions",
    mobile: "Limited / version-dependent",
  },
  {
    name: "Safari",
    desktop: "Supported on recent macOS",
    mobile: "Supported on recent iOS / iPadOS",
  },
  {
    name: "Samsung Internet",
    desktop: "—",
    mobile: "Supported on Android",
  },
] as const;

export function BrowserSupportSection() {
  return (
    <section className="pb-xl" aria-labelledby="browser-support-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="browser-support-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Browser wake lock support
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Keep Screen On relies on the Screen Wake Lock API. Support varies by
            browser and OS — this matrix summarizes typical availability for the
            free online tool.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Screen Wake Lock support by browser on desktop and mobile
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Browser
                </th>
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Desktop
                </th>
                <th
                  scope="col"
                  className="p-md font-heading font-semibold text-foreground"
                >
                  Mobile / tablet
                </th>
              </tr>
            </thead>
            <tbody>
              {browsers.map((browser) => (
                <tr
                  key={browser.name}
                  className="border-b border-border last:border-b-0"
                >
                  <th
                    scope="row"
                    className="p-md font-semibold text-foreground"
                  >
                    {browser.name}
                  </th>
                  <td className="p-md leading-relaxed text-muted-foreground">
                    {browser.desktop}
                  </td>
                  <td className="p-md leading-relaxed text-muted-foreground">
                    {browser.mobile}
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
