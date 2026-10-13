import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { testimonials } from "@/lib/data/marketing"

export function TestimonialsSection() {
  return (
    <section className="border-y bg-card/60 py-20">
      <Container>
        <SectionHeading
          title="What launching should feel like"
          description="Illustrative stories for this product preview. Real customer stories will replace these."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="rounded-xl border bg-background p-6 shadow-card">
              <p className="text-[15px] leading-7">“{item.quote}”</p>
              <footer className="mt-6 text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  )
}
