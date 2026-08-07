import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/home/sections/seo-section";
import { FaqSection } from "@/components/pages/shared/sections/faq-section";
import { HowItWorksSection } from "@/components/pages/shared/sections/how-it-works-section";
import { PageGuideSection } from "@/components/pages/shared/sections/page-guide-section";
import { PlatformLinksSection } from "@/components/pages/shared/sections/platform-links-section";
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
      <SectionSeparator />
      <PageInset>
        <PageGuideSection pageKey="home" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <PlatformLinksSection currentPageKey="home" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <HowItWorksSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <FaqSection pageKey="home" />
      </PageInset>
    </main>
  );
}
