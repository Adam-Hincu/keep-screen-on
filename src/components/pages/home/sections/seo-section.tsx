export function SeoSection() {
  return (
    <section className="pb-xl" aria-labelledby="seo-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="seo-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Keep Screen On — Free Browser Wake Lock, No Signup
          </h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Keep Screen On is a free online wake lock that helps keep screen
              on, keep display on, and keep screen awake without installing
              anything or creating an account. Pick Always On, Custom, or a
              display timeout preset, activate browser wake lock, and prevent
              screen sleep — screen timeout and display timeout stay unchanged.
            </p>

            <p>
              Browser screen timeout control uses the Screen Wake Lock API to
              prevent screen dimming, display sleep, auto lock, and system
              sleep while wake lock is active. Free wake lock runs entirely in
              browser — no download, no signup, no app install required.
            </p>

            <p>
              Keep phone awake, keep laptop awake, keep computer awake during
              long sessions. Need screen always on for display timeout or screen
              stays awake for hours? Browser wake lock keeps screen active
              until session ends.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Why keep screen awake?
          </h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Keep screen awake, stay awake in work apps, messaging, remote
              desktop, dashboards without display sleep, screen sleep, sleep
              mode ending session. Browser wake lock helps remain active
              instead of going idle when display turns off.
            </p>

            <p>
              Prevent screen dimming, display timeout interruptions during
              downloads, uploads, backups, updates. Online wake lock keeps
              display on, reduces idle lock prompts, helps stop screen sleeping
              — simple way to disable screen timeout temporarily without
              editing screen timeout settings.
            </p>

            <p>
              Use no sleep page for presentations, reading, whenever screen
              always on, keep display on matter. Works on phones, tablets,
              laptops, desktop computers with Screen Wake Lock support — free
              wake lock, always available, no signup required.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Screen wake lock — how it helps
          </h3>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Screen wake lock prevents screen sleep, display sleep while page
              stays open. Does not change device settings — screen timeout
              settings, auto lock rules, power preferences stay same. Wake
              lock keeps screen on, keeps screen awake until page closes.
            </p>

            <p>
              Some devices may still enforce auto lock, system sleep through
              security policies. For most users, browser wake lock is enough to
              keep screen on, prevent screen dimming, stop screen sleeping
              during presentations, monitoring dashboards, remote desktop
              sessions, long background tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
