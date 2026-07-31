"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { trackFaqExpand } from "@/lib/analytics";
import { getFaqByPageKey } from "@/lib/faq";
import type { PageKey } from "@/lib/pages";
import { useRef } from "react";

type FaqSectionProps = {
  pageKey: PageKey;
};

export function FaqSection({ pageKey }: FaqSectionProps) {
  const items = getFaqByPageKey(pageKey);
  const openItemsRef = useRef<string[]>([]);

  const handleValueChange = (value: string[]) => {
    const newlyOpened = value.filter(
      (entry) => !openItemsRef.current.includes(entry),
    );
    openItemsRef.current = value;

    for (const entry of newlyOpened) {
      const index = Number.parseInt(entry.replace("faq-", ""), 10);

      if (Number.isNaN(index) || !items[index]) {
        continue;
      }

      trackFaqExpand(pageKey, items[index].question, index);
    }
  };

  return (
    <section className="pb-xl" aria-labelledby="faq-heading">
      <div className="flex flex-col gap-4">
        <h2
          id="faq-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Frequently asked questions
        </h2>

        <Accordion defaultValue={[]} onValueChange={handleValueChange}>
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
