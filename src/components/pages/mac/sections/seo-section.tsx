export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="seo-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Keep Your Mac Screen On Without Installing Anything
          </h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
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
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Why keep your Mac screen awake?
          </h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
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
      </div>
    </section>
  );
}
