import { getPageByKey, type PageKey } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

type WebApplicationJsonLdProps = {
  pageKey: PageKey;
};

export function WebApplicationJsonLd({ pageKey }: WebApplicationJsonLdProps) {
  const page = getPageByKey(pageKey);
  const pageUrl = `${siteConfig.url}${page.path === "/" ? "" : page.path}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: pageUrl,
    description: page.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: page.operatingSystem,
    browserRequirements: "Requires a modern browser with Screen Wake Lock support.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.twitterUrl,
    },
    creator: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.twitterUrl,
    },
    copyrightHolder: {
      "@type": "Person",
      name: siteConfig.copyright,
    },
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
