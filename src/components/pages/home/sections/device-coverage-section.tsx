const coverage = [
  {
    label: "Phones & tablets",
    detail:
      "iPhone, iPad, and Android devices in Safari, Chrome, and other browsers that support Screen Wake Lock.",
  },
  {
    label: "Laptops & desktops",
    detail:
      "Windows, Mac, and Linux machines in Chrome, Edge, Firefox, and Safari where wake lock is available.",
  },
  {
    label: "What stays unchanged",
    detail:
      "System screen timeout, Auto-Lock, and power settings are left alone — wake lock only applies while this tab stays open.",
  },
  {
    label: "When it helps most",
    detail:
      "Presentations, remote desktop, long downloads, dashboards, reading, and staying active in work or messaging apps.",
  },
] as const;

export function DeviceCoverageSection() {
  return (
    <section className="pb-xl" aria-labelledby="device-coverage-heading">
      <div className="flex flex-col gap-4">
        <h2
          id="device-coverage-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Where keep screen on works
        </h2>

        <dl className="grid grid-cols-1 gap-md sm:grid-cols-2">
          {coverage.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="font-heading text-md font-semibold text-foreground">
                {item.label}
              </dt>
              <dd className="leading-relaxed text-muted-foreground">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
