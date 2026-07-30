import { Hero } from "@/components/pages/windows/sections/hero";
import { SeoSection } from "@/components/pages/windows/sections/seo-section";
import { PageInset } from "@/components/pages/shared/page-inset";
import { SectionSeparator } from "@/components/pages/shared/section-separator";

export function Windows() {
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
