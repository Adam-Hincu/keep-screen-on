import { Windows } from "@/components/pages/windows/windows";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("windows");

export default function WindowsPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="windows" />
      <FaqJsonLd pageKey="windows" />
      <Windows />
    </>
  );
}
