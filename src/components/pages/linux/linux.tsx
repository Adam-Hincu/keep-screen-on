import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/linux/sections/seo-section";
import { LinuxGuideSection } from "@/components/pages/linux/sections/linux-guide-section";
import { FaqSection } from "@/components/pages/shared/sections/faq-section";
import { HowItWorksSection } from "@/components/pages/shared/sections/how-it-works-section";
import { PlatformLinksSection } from "@/components/pages/shared/sections/platform-links-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";

export function Linux() {
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
        <PlatformLinksSection currentPageKey="linux" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <HowItWorksSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <FaqSection pageKey="linux" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <LinuxGuideSection />
      </PageInset>
    </main>
  );
}
