import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { getFaqByPageKey } from "@/lib/faq";
import type { PageKey } from "@/lib/pages";

type FaqSectionProps = {
  pageKey: PageKey;
};

export function FaqSection({ pageKey }: FaqSectionProps) {
  const items = getFaqByPageKey(pageKey);

  return (
    <section className="pb-xl" aria-labelledby="faq-heading">
      <div className="flex flex-col gap-4">
        <h2
          id="faq-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Frequently asked questions
        </h2>

        <Accordion defaultValue={[]}>
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
