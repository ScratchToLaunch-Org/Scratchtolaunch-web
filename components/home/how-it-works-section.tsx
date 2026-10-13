import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { howItWorks } from "@/lib/data/marketing"

export function HowItWorksSection() {
  return (
    <section className="border-y bg-card/60 py-20">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How it works"
          description="Four steps from a messy idea to a dashboard you can actually run."
        />
        <ol className="mt-12 grid gap-8 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <li key={item.step} className="relative">
              {index < howItWorks.length - 1 ? (
                <span className="pointer-events-none absolute top-5 left-[2.25rem] hidden h-px w-[calc(100%-1rem)] bg-border lg:block" />
              ) : null}
              <div className="flex gap-4 lg:block">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border bg-background text-sm font-semibold">
                  {item.step}
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
