import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/data/marketing"

export function FaqSection() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          title="Questions, answered"
          description="Straightforward answers. If a fee or timeline depends on a government office, we say so."
        />
        <Accordion className="mt-10">
          {faqs.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="py-4 text-[15px]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
