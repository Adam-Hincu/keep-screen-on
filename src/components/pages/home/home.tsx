import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/home/sections/seo-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";

export function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero title="Stop your screen from turning off" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
    </main>
  );
}
