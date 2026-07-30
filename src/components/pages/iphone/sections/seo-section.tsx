export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Keep Your iPhone Screen On Without Installing Anything
          </h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Keep Screen On is a free browser tool that keeps your iPhone
              screen on and prevents it from turning off while this page remains
              open. Choose a time limit or No Limit, press Start, and keep your
              iPhone display awake without changing Auto-Lock or other iOS
              settings.
            </p>

            <p>
              The tool uses the Screen Wake Lock feature supported by Safari and
              other modern browsers on iOS to prevent screen dimming, screen
              sleep, and automatic locking while the timer is running. It does
              not change your iPhone settings, and there is nothing to download
              or install from the App Store.
            </p>

            <p>
              It works on iPhone and iPad in Safari, Chrome, and other
              supported browsers. Whether you need to keep your iPhone display
              on for a few minutes or keep your device awake for hours, you can
              start the timer and let it run until you&apos;re finished.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Why keep your iPhone screen awake?
          </h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              The most common reason to keep your iPhone screen on is to stay
              marked as online or active in work apps, messaging platforms,
              remote desktop sessions, and social media without your iPhone
              entering sleep mode or locking while you&apos;re away.
            </p>

            <p>
              It is also useful while downloads, uploads, backups, updates, and
              other long-running tasks are in progress on your iPhone or iPad.
              Keeping your display awake helps prevent screen timeout, screen
              dimming, and interruptions caused by Auto-Lock.
            </p>

            <p>
              You can also use it whenever you want to keep your iPhone display
              on, avoid repeated Face ID or passcode prompts, prevent screen
              sleep during presentations, or simply stop your iPhone from
              sleeping for a while without changing your normal Auto-Lock
              settings.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">How it works</h3>

          <ul className="flex list-none flex-col gap-2 text-muted-foreground leading-relaxed">
            <li>Choose No Limit, Custom, or one of the available time options.</li>
            <li>Press Start.</li>
            <li>Leave this page open while the timer is running.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">Frequently asked questions</h3>

          <dl className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does this change my iPhone Auto-Lock settings?
              </dt>
              <dd>
                No. Your Auto-Lock and power settings stay exactly the same.
                This tool keeps your iPhone screen awake without changing your
                device settings.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it stop my iPhone from locking?
              </dt>
              <dd>
                It helps keep your iPhone screen on and prevents screen sleep
                while the timer is running. On some devices, security policies
                or system restrictions may still lock the iPhone automatically.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Can it keep my iPhone awake?
              </dt>
              <dd>
                Yes. It helps keep your iPhone awake so work apps, messaging
                platforms, remote desktop sessions, dashboards, and similar
                services are less likely to become inactive because the screen
                turned off or the device entered sleep mode.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it work on iPhone and iPad?
              </dt>
              <dd>
                Yes. It works on many modern iPhones and iPads in Safari, Chrome,
                and other supported browsers on iOS and iPadOS.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">Do I need to install an app?</dt>
              <dd>No. Everything runs directly in your iPhone browser.</dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
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
