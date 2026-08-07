const useCases = [
  {
    title: "Stay active in work apps",
    body: "Prevent idle status in messaging, collaboration, and remote desktop tools while you step away briefly.",
  },
  {
    title: "Long downloads and backups",
    body: "Keep the display from sleeping mid-transfer so progress dialogs and system prompts stay visible.",
  },
  {
    title: "Presentations and demos",
    body: "Hold the screen awake for decks, kiosks, and live demos without editing power settings beforehand.",
  },
  {
    title: "Reading and monitoring",
    body: "Leave recipes, scores, dashboards, or logs on-screen without constant taps to wake the device.",
  },
  {
    title: "Phones, tablets, and PCs",
    body: "Same free wake lock flow across device-specific pages for iPhone, Android, Mac, Windows, and Linux.",
  },
  {
    title: "No account required",
    body: "Open the page, start a session, and stop whenever you are done — nothing to install or register.",
  },
] as const;

export function UseCasesSection() {
  return (
    <section className="pb-xl" aria-labelledby="use-cases-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="use-cases-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Common keep-awake scenarios
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Practical situations where a temporary browser wake lock is enough —
            without touching system screen timeout settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          {useCases.map((useCase) => (
            <article
              key={useCase.title}
              className="flex flex-col gap-2 border-l border-brand pl-md [border-left-width:var(--border-thick-width)]"
            >
              <h3 className="font-heading text-md font-semibold text-foreground">
                {useCase.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {useCase.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
