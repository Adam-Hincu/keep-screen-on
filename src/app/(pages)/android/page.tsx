import { Android } from "@/components/pages/android/android";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("android");

export default function AndroidPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="android" />
      <Android />
    </>
  );
}
