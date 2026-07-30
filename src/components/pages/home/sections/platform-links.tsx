import Link from "next/link";

import { platformPages } from "@/lib/pages";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { subheadingClassName } from "@/components/pages/shared/seo-section-styles";
import { cn } from "@/lib/utils";

export function PlatformLinks() {
  return (
    <section aria-labelledby="platform-links-heading">
      <div className="flex flex-col gap-4">
        <h2 id="platform-links-heading" className={subheadingClassName}>
          Choose your device
        </h2>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {platformPages.map((page) => (
            <li key={page.key}>
              <Link
                href={page.path}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-auto w-full flex-col items-start gap-1 px-4 py-4 text-left whitespace-normal",
                )}
              >
                <span className="font-semibold text-foreground">
                  {page.linkLabel}
                </span>
                <span className="text-sm font-regular text-muted-foreground">
                  {page.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
