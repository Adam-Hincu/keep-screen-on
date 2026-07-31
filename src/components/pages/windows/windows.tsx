import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/windows/sections/seo-section";
import { FaqSection } from "@/components/pages/shared/sections/faq-section";
import { HowItWorksSection } from "@/components/pages/shared/sections/how-it-works-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";

export function Windows() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero title="Stop your computer from turning off" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <HowItWorksSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <FaqSection pageKey="windows" />
      </PageInset>
    </main>
  );
}
