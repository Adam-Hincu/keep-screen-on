import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/home/sections/seo-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero
          title="Stop your screen from turning off"
          action={
            <Link
              href="/temp"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Temp screen
            </Link>
          }
        />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
    </main>
  );
}
