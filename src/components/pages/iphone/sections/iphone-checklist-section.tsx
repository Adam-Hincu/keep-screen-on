const autoLock = [
  {
    term: "System Auto-Lock",
    definition:
      "Controls when iPhone locks after idle time. Keep Screen On does not edit this setting.",
  },
  {
    term: "Browser wake lock",
    definition:
      "Holds the display awake only while this Safari or Chrome tab keeps an active session.",
  },
  {
    term: "After you stop",
    definition:
      "Auto-Lock and Low Power Mode behave as before — nothing permanent was changed.",
  },
] as const;

const checklist = [
  "Use Safari or a Chromium-based browser with Wake Lock support on your iOS version",
  "Leave this tab in the foreground for the most reliable keep-awake behavior",
  "Choose Always On for open-ended demos, or Custom for a known duration",
  "Press Stop when finished so the display can dim and lock normally again",
  "Expect managed devices with forced passcode policies to still lock on schedule",
] as const;

export function IphoneChecklistSection() {
  return (
    <section className="pb-xl" aria-labelledby="iphone-checklist-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="iphone-checklist-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            iPhone Auto-Lock checklist
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            How temporary wake lock relates to Auto-Lock — and what to verify
            before a long on-screen session.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
          <dl className="flex flex-col gap-md">
            {autoLock.map((item) => (
              <div
                key={item.term}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-md"
              >
                <dt className="font-heading text-md font-semibold text-foreground">
                  {item.term}
                </dt>
                <dd className="leading-relaxed text-muted-foreground">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>

          <figure className="flex flex-col gap-md rounded-2xl border border-border bg-muted p-md">
            <figcaption className="font-heading text-md font-semibold text-foreground">
              Before you start
            </figcaption>
            <ul className="flex list-none flex-col gap-3">
              {checklist.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="flex size-icon-md shrink-0 items-center justify-center rounded-full bg-card font-heading text-xs font-semibold text-muted-foreground"
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
