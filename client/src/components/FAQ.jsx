import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "../utils/faq.json";

const FAQ = () => {
  return (
    <div className="max-w-7xl mx-auto my-14 px-7 md:px-4">
      <Accordion type="single" collapsible>
        {faqs?.faqs?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item?.question}</AccordionTrigger>
            <AccordionContent>{item?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
