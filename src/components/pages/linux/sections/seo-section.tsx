export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Keep Your Linux Screen On Without Installing Anything
          </h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Keep Screen On is a free browser tool that keeps your Linux screen
              on and prevents it from turning off while this page remains open.
              Choose a time limit or No Limit, press Start, and keep your Linux
              display awake without changing power settings, screen blanking, or
              other desktop environment settings.
            </p>

            <p>
              The tool uses the Screen Wake Lock feature supported by Chrome,
              Firefox, and other modern browsers on Linux to prevent screen
              dimming, screen sleep, and automatic locking while the timer is
              running. It does not change your Linux settings, and there is
              nothing to download or install.
            </p>

            <p>
              It works on Ubuntu, Fedora, Debian, and other Linux distributions
              on laptops and desktop PCs in Chrome, Firefox, Chromium, Edge, and
              other supported browsers. Whether you need to keep your Linux
              display on for a few minutes or keep your computer awake for
              hours, you can start the timer and let it run until you&apos;re
              finished.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Why keep your Linux screen awake?
          </h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              The most common reason to keep your Linux screen on is to stay
              marked as online or active in work apps, messaging platforms,
              remote desktop sessions, and social media without your PC entering
              sleep mode or locking while you&apos;re away.
            </p>

            <p>
              It is also useful while downloads, uploads, backups, updates, and
              other long-running tasks are in progress on your Linux machine.
              Keeping your display awake helps prevent screen timeout, screen
              dimming, and interruptions caused by sleep mode.
            </p>

            <p>
              You can also use it whenever you want to keep your Linux display
              on, avoid repeated login prompts, prevent screen sleep during
              presentations, or simply stop your computer from sleeping for a
              while without changing your normal power settings.
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
                Does this change my Linux power or screen blanking settings?
              </dt>
              <dd>
                No. Your power management and screen blanking settings stay
                exactly the same. This tool keeps your Linux screen awake without
                changing your device settings.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">
                Does it stop my Linux PC from locking?
              </dt>
              <dd>
                It helps keep your Linux screen on and prevents screen sleep
                while the timer is running. On some devices, security policies
                or system restrictions may still lock the computer automatically.
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
                Does it work on Linux laptops and desktops?
              </dt>
              <dd>
                Yes. It works on many modern Linux laptops and desktop PCs in
                Chrome, Firefox, Chromium, Edge, and other supported browsers.
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="font-semibold text-foreground">Do I need to install anything?</dt>
              <dd>No. Everything runs directly in your Linux browser.</dd>
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
