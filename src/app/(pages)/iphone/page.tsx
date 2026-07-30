import { Iphone } from "@/components/pages/iphone/iphone";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("iphone");

export default function IphonePage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="iphone" />
      <Iphone />
    </>
  );
}
