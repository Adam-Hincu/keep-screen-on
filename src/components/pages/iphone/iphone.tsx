import { Hero } from "@/components/pages/shared/sections/hero";
import { SeoSection } from "@/components/pages/iphone/sections/seo-section";
import { IphoneChecklistSection } from "@/components/pages/iphone/sections/iphone-checklist-section";
import { FaqSection } from "@/components/pages/shared/sections/faq-section";
import { HowItWorksSection } from "@/components/pages/shared/sections/how-it-works-section";
import { PlatformLinksSection } from "@/components/pages/shared/sections/platform-links-section";
import { PageInset } from "@/components/pages/shared/components/page-inset";
import { SectionSeparator } from "@/components/pages/shared/components/section-separator";

export function Iphone() {
  return (
    <main className="flex flex-1 flex-col">
      <PageInset className="flex flex-1 flex-col">
        <Hero title="Stop your iPhone from turning off" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <SeoSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <PlatformLinksSection currentPageKey="iphone" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <HowItWorksSection />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <FaqSection pageKey="iphone" />
      </PageInset>
      <SectionSeparator />
      <PageInset>
        <IphoneChecklistSection />
      </PageInset>
    </main>
  );
}
