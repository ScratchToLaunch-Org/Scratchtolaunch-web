import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Landmark,
  LineChart,
  Palette,
  Scale,
  MonitorSmartphone,
} from "lucide-react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn } from "@/components/fade-in"
import { fetchCategories, fetchServices } from "@/lib/api/catalog"
import { serviceCategories } from "@/lib/data/catalog"

const icons = {
  "business-setup": Landmark,
  finance: Briefcase,
  brand: Palette,
  website: MonitorSmartphone,
  marketing: LineChart,
  legal: Scale,
}

export async function ServicesSection() {
  let cards = serviceCategories
  try {
    const [categories, services] = await Promise.all([fetchCategories(), fetchServices()])
    if (categories.length) {
      cards = categories.map((category) => ({
        id: category.id as (typeof serviceCategories)[number]["id"],
        name: category.name,
        description: category.description,
        count: category.count,
        services: services.filter((service) => service.category === category.id).map((service) => service.title),
      }))
    }
  } catch {
    cards = serviceCategories
  }

  return (
    <section className="border-y bg-card/60 py-20">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Everything your business needs."
          description="Book one specialist or assemble a launch. Categories are designed around the work founders actually have to finish."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((category, index) => {
            const Icon = icons[category.id as keyof typeof icons] ?? Briefcase
            return (
              <FadeIn key={category.id} delay={index * 0.04}>
                <Link
                  href={`/services?category=${category.id}`}
                  className="group flex h-full flex-col rounded-xl border bg-background p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/8 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category.count} services
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {category.services.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
