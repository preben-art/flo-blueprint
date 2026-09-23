"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/site";

type FaqItem = { id?: string; question: string; answer: string };

export function FaqBlock({ ids, items }: { ids?: string[]; items?: readonly FaqItem[] }) {
  const list = items ?? (ids ? faqs.filter((f) => ids.includes(f.id)) : faqs);
  return (
    <Accordion type="single" collapsible className="w-full">
      {list.map((faq, i) => (
        <AccordionItem key={faq.id ?? faq.question} value={faq.id ?? `faq-${i}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}