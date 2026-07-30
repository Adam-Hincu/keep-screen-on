import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/mac/sections/seo-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";

export function Mac() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero title="Stop your Mac from turning off" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
    </main>
  );
}
