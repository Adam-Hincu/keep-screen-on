import Link from "next/link";

import { getLinkedPages, type PageKey } from "@/lib/pages";

type PlatformLinksSectionProps = {
  currentPageKey: PageKey;
};

export function PlatformLinksSection({
  currentPageKey,
}: PlatformLinksSectionProps) {
  const linkedPages = getLinkedPages(currentPageKey);

  return (
    <section className="pb-xl" aria-labelledby="platform-links-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2
            id="platform-links-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Keep screen on for your device
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Open a device-specific page for iPhone, Android, Mac, Windows, or
            Linux — same free browser wake lock, no signup.
          </p>
        </div>

        <ul className="flex list-none flex-wrap gap-x-6 gap-y-3">
          {linkedPages.map((page) => (
            <li key={page.key}>
              <Link
                href={page.path}
                className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[length:var(--ring-width-default)] focus-visible:ring-focus-ring-default"
              >
                {page.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
