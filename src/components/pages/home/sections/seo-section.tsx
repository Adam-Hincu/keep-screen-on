const headingClassName =
  "font-heading text-2xl font-semibold tracking-tight text-foreground";

const subheadingClassName =
  "font-heading text-xl font-semibold tracking-tight text-foreground";

const bodyClassName = "text-muted-foreground";

export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className={headingClassName}>
            Keep Your Screen On Without Installing Anything.
          </h2>

          <div className={`flex flex-col gap-4 ${bodyClassName}`}>
            <p>
              Keep Screen On is a free browser tool that helps keep your screen
              awake while you work, read, cook, present, study, or watch
              something. Instead of changing your device&apos;s screen timeout
              settings, you can temporarily keep your display active with a
              single click.
            </p>

            <p>
              This page uses your browser&apos;s Screen Wake Lock feature to
              prevent your screen from dimming or going to sleep while it stays
              open. When you&apos;re done, simply allow your screen to sleep
              again and your normal settings will continue to work as usual.
            </p>

            <p>
              It works on most modern phones, tablets, laptops, and desktop
              computers that support the Screen Wake Lock API. There is nothing
              to install, no account to create, and no permissions beyond
              allowing your browser to keep the screen awake.
            </p>

            <p>
              If you were looking for a way to keep your screen on, prevent
              screen sleep, disable screen timeout for a while, or use a simple
              browser wake lock, you&apos;re in the right place. This tool is
              designed for quick temporary use without changing permanent power
              or display settings.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>Common uses</h3>
          <p className={bodyClassName}>
            People use Keep Screen On while following recipes, giving
            presentations, reading long articles or PDFs, monitoring dashboards,
            watching live information, making video calls, studying, or whenever
            they need the screen to stay awake without touching the device every
            few minutes.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>How it works</h3>
          <ol className={`flex list-decimal flex-col gap-2 pl-6 ${bodyClassName}`}>
            <li>Choose how long you want to keep your screen on.</li>
            <li>Click Keep Screen On.</li>
            <li>Leave this page open and visible.</li>
            <li>
              When you&apos;re finished, click Allow Screen to Sleep to return
              to your normal screen timeout.
            </li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>Frequently asked questions</h3>
          <dl className={`flex flex-col gap-4 ${bodyClassName}`}>
            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does this change my screen timeout settings?
              </dt>
              <dd>
                No. Your device settings stay exactly the same. The screen stays
                awake only while this page is active.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it work on phones and computers?
              </dt>
              <dd>
                Yes. It works on many Android phones, iPhones, iPads, Windows
                PCs, Macs, Chromebooks, and other devices that support the
                Screen Wake Lock API.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Do I need to install anything?
              </dt>
              <dd>
                No. Everything runs directly in your browser, so you can keep
                your screen awake without downloading an app or extension.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                What happens if I close this page?
              </dt>
              <dd>
                Your browser wake lock ends and your normal screen timeout takes
                over again.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
