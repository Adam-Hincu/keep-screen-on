const headingClassName =
  "font-heading text-2xl font-semibold tracking-tight text-foreground";

const subheadingClassName =
  "font-heading text-xl font-semibold tracking-tight text-foreground";

const bodyClassName = "text-muted-foreground leading-relaxed";

const questionClassName = "font-semibold text-foreground";

export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className={headingClassName}>
            Keep Your Screen On Without Installing Anything
          </h2>

          <div className={`flex flex-col gap-4 ${bodyClassName}`}>
            <p>
              Keep Screen On is a free browser tool that stops your screen from
              turning off while this tab remains open. Choose a time limit or
              select No Limit, then press Start to keep your screen awake.
            </p>

            <p>
              The tool uses your browser&apos;s Screen Wake Lock feature to
              prevent the display from dimming, locking, or going to sleep. It
              does not change your screen timeout settings, power settings, or
              device preferences.
            </p>

            <p>
              It works on supported phones, tablets, laptops, and desktop
              computers. There is nothing to download, no account to create, and
              no setup required.
            </p>

            <p>
              Use it when you need to keep your screen on for a set amount of
              time or until you close the tab. You can select 1 hour, 2 hours, 4
              hours, 6 hours, set a custom time, or choose No Limit.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>Why keep your screen awake?</h3>

          <div className={`flex flex-col gap-4 ${bodyClassName}`}>
            <p>
              The most common reason to keep your screen on is to stay marked as
              online or active in work apps, messaging platforms, remote desktop
              sessions, and social media without your computer going to sleep or
              locking while you&apos;re away.
            </p>

            <p>
              It is also useful when downloads, uploads, long-running tasks,
              background tasks, or any other task needs to keep running without
              being interrupted by screen timeout or sleep mode.
            </p>

            <p>
              Keeping your screen awake also helps avoid repeated PIN or password
              prompts, interrupted presentations, and other situations where you
              simply need your computer to stay on for a while without changing
              your device settings.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>How it works</h3>

          <ol className={`flex list-decimal flex-col gap-2 pl-6 ${bodyClassName}`}>
            <li>
              Choose No Limit, Custom, or one of the available time options.
            </li>
            <li>
              Press <strong className={questionClassName}>Start</strong>.
            </li>
            <li>Keep this tab open while the timer is running.</li>
          </ol>

          <p className={bodyClassName}>
            The wake lock only works while this tab remains open and your browser
            supports the Screen Wake Lock API.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>Frequently asked questions</h3>

          <dl className={`flex flex-col gap-4 ${bodyClassName}`}>
            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does this change my screen timeout settings?
              </dt>
              <dd>
                No. Your normal screen timeout and power settings stay the
                same.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does it stop my screen from locking?
              </dt>
              <dd>
                It keeps the screen awake while the tab is open and active.
                Device security rules, company policies, and browser limits may
                still lock the device in some cases.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Can it keep my computer online?
              </dt>
              <dd>
                It helps prevent interruptions caused by the screen turning off
                or the device becoming idle by always keeping the screen on.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does it work on phones and computers?
              </dt>
              <dd>
                It works on many modern Android phones, tablets, Windows
                computers, Macs, Chromebooks, iPhones, and iPads that support
                the Screen Wake Lock API.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>Do I need to install anything?</dt>
              <dd>
                No. The tool runs directly in your browser without an app,
                extension, or account.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                What happens if I close the tab?
              </dt>
              <dd>The screen wake lock ends when the tab is closed.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
