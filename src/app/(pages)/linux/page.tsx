import { Linux } from "@/components/pages/linux/linux";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("linux");

export default function LinuxPage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="linux" />
      <Linux />
    </>
  );
}
