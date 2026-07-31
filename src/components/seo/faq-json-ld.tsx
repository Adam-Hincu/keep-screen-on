import { getFaqByPageKey } from "@/lib/faq";
import type { PageKey } from "@/lib/pages";

type FaqJsonLdProps = {
  pageKey: PageKey;
};

export function FaqJsonLd({ pageKey }: FaqJsonLdProps) {
  const items = getFaqByPageKey(pageKey);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
