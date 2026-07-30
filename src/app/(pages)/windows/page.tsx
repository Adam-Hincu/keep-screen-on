import { Windows } from "@/components/pages/windows/windows";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("windows");

export default function WindowsPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="windows" />
      <Windows />
    </>
  );
}
