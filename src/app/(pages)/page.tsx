import { Home } from "@/components/pages/home/home";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebApplicationJsonLd } from "@/components/seo/web-application-json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <WebApplicationJsonLd pageKey="home" />
      <FaqJsonLd pageKey="home" />
      <Home />
    </>
  );
}
