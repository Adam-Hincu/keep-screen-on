import { Mac } from "@/components/pages/mac/mac";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("mac");

export default function MacPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="mac" />
      <FaqJsonLd pageKey="mac" />
      <Mac />
    </>
  );
}
