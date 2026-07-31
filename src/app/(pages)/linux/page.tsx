import { Linux } from "@/components/pages/linux/linux";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("linux");

export default function LinuxPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="linux" />
      <FaqJsonLd pageKey="linux" />
      <Linux />
    </>
  );
}
