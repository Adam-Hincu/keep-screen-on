import {
  bodyClassName,
  headingClassName,
  questionClassName,
  subheadingClassName,
} from "@/components/pages/shared/seo-section-styles";

export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className={headingClassName}>
            Keep Your Mac Screen On Without Installing Anything
          </h2>

          <div className={`flex flex-col gap-4 ${bodyClassName}`}>
            <p>
              Keep Screen On is a free browser tool that keeps your Mac screen
              on and prevents it from turning off while this page remains open.
              Choose a time limit or No Limit, press Start, and keep your Mac
              display awake without changing Energy Saver or other macOS
              settings.
            </p>

            <p>
              The tool uses the Screen Wake Lock feature supported by Safari,
              Chrome, and other modern browsers on macOS to prevent screen
              dimming, screen sleep, and automatic locking while the timer is
              running. It does not change your Mac settings, and there is
              nothing to download or install.
            </p>

            <p>
              It works on MacBook, iMac, Mac mini, and Mac Studio in Safari,
              Chrome, Firefox, and other supported browsers. Whether you need to
              keep your Mac display on for a few minutes or keep your computer
              awake for hours, you can start the timer and let it run until
              you&apos;re finished.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>
            Why keep your Mac screen awake?
          </h3>

          <div className={`flex flex-col gap-4 ${bodyClassName}`}>
            <p>
              The most common reason to keep your Mac screen on is to stay
              marked as online or active in work apps, messaging platforms,
              remote desktop sessions, and social media without your Mac entering
              sleep mode or locking while you&apos;re away.
            </p>

            <p>
              It is also useful while downloads, uploads, backups, updates, and
              other long-running tasks are in progress on your Mac. Keeping your
              display awake helps prevent screen timeout, screen dimming, and
              interruptions caused by sleep mode.
            </p>

            <p>
              You can also use it whenever you want to keep your Mac display on,
              avoid repeated password prompts, prevent screen sleep during
              presentations, or simply stop your computer from sleeping for a
              while without changing your normal Energy Saver settings.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>How it works</h3>

          <ul className={`flex list-none flex-col gap-2 ${bodyClassName}`}>
            <li>Choose No Limit, Custom, or one of the available time options.</li>
            <li>Press Start.</li>
            <li>Leave this page open while the timer is running.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={subheadingClassName}>Frequently asked questions</h3>

          <dl className={`flex flex-col gap-4 ${bodyClassName}`}>
            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does this change my Mac Energy Saver settings?
              </dt>
              <dd>
                No. Your Energy Saver and power settings stay exactly the same.
                This tool keeps your Mac screen awake without changing your
                device settings.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does it stop my Mac from locking?
              </dt>
              <dd>
                It helps keep your Mac screen on and prevents screen sleep while
                the timer is running. On some devices, security policies or
                system restrictions may still lock the Mac automatically.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>Can it keep my Mac awake?</dt>
              <dd>
                Yes. It helps keep your Mac awake so work apps, messaging
                platforms, remote desktop sessions, dashboards, and similar
                services are less likely to become inactive because the screen
                turned off or the computer entered sleep mode.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                Does it work on MacBook and desktop Macs?
              </dt>
              <dd>
                Yes. It works on MacBook, iMac, Mac mini, Mac Studio, and other
                modern Macs in Safari, Chrome, Firefox, and other supported
                browsers.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>Do I need to install anything?</dt>
              <dd>No. Everything runs directly in your Mac browser.</dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className={questionClassName}>
                What happens if I close the page?
              </dt>
              <dd>The Screen Wake Lock ends when the page is closed.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
