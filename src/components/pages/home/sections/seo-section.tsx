export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Keep Your Screen On Without Installing Anything
          </h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Keep Screen On is a free browser tool that keeps your screen on
              and prevents it from turning off while this page remains open.
              Choose a time limit or No Limit, press Start, and keep your screen
              awake without changing your screen timeout or device settings.
            </p>

            <p>
              The tool uses the Screen Wake Lock feature supported by modern
              browsers to prevent screen dimming, screen sleep, and automatic
              locking while the timer is running. It does not change your device
              settings, and there is nothing to download or install.
            </p>

            <p>
              It works on phones, tablets, laptops, and desktop computers.
              Whether you need to keep your display on for a few minutes or keep
              your computer awake for hours, you can start the timer and let it
              run until you&apos;re finished.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">Why keep your screen awake?</h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              The most common reason to keep your screen on is to stay marked as
              online or active in work apps, messaging platforms, remote desktop
              sessions, and social media without your computer entering sleep
              mode or locking while you&apos;re away.
            </p>

            <p>
              It is also useful while downloads, uploads, backups, updates, and
              other long-running or background tasks are in progress. Keeping
              your computer awake helps prevent screen timeout, screen dimming,
              and interruptions caused by sleep mode.
            </p>

            <p>
              You can also use it whenever you want to keep your display on,
              avoid repeated PIN or password prompts, prevent screen sleep
              during presentations, or simply stop your computer from sleeping
              for a while without changing your normal power settings.
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
                Does this change my screen timeout settings?
              </dt>
              <dd>
                No. Your screen timeout and power settings stay exactly the
                same. This tool keeps your screen awake without changing your
                device settings.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it stop my screen from locking?
              </dt>
              <dd>
                It helps keep your screen on and prevents screen sleep while the
                timer is running. On some devices, security policies or system
                restrictions may still lock the computer automatically.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Can it keep my computer awake?
              </dt>
              <dd>
                Yes. It helps keep your computer awake so work apps, messaging
                platforms, remote desktop sessions, dashboards, and similar
                services are less likely to become inactive because the screen
                turned off or the computer entered sleep mode.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it work on phones and computers?
              </dt>
              <dd>
                Yes. It works on many modern Android phones, iPhones, iPads,
                Windows PCs, Macs, Chromebooks, laptops, tablets, and desktop
                computers.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">Do I need to install anything?</dt>
              <dd>No. Everything runs directly in your browser.</dd>
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
