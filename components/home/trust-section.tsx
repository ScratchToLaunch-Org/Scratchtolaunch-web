import { ShieldCheck, Receipt, ListChecks, LayoutDashboard } from "lucide-react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { trustCards } from "@/lib/data/marketing"

const icons = [ShieldCheck, Receipt, ListChecks, LayoutDashboard]

export function TrustSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Built around trust."
          description="A launch costs real money. The product is designed so you can see who is doing the work, what it costs, and what is done."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, index) => {
            const Icon = icons[index]
            return (
              <article key={card.title} className="rounded-xl border bg-card p-5 shadow-card">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-4 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
