import { Hero } from "@/components/pages/home/sections/hero";
import { SeoSection } from "@/components/pages/home/sections/seo-section";
import { PageInset } from "@/components/pages/shared/page-inset";
import { SectionSeparator } from "@/components/pages/shared/section-separator";

export function Home() {
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
