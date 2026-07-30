import { Hero } from "@/components/pages/mac/sections/hero";
import { SeoSection } from "@/components/pages/mac/sections/seo-section";
import { PageInset } from "@/components/pages/shared/page-inset";
import { SectionSeparator } from "@/components/pages/shared/section-separator";

export function Mac() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
    </main>
  );
}
