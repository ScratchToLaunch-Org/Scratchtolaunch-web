import Link from "next/link"
import { Check } from "lucide-react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn } from "@/components/fade-in"
import { buttonVariants } from "@/components/ui/button"
import { launchPackages } from "@/lib/data/marketing"
import { PRICE_DISCLAIMER } from "@/lib/constants"
import { formatINRFrom } from "@/lib/format"
import { cn } from "@/lib/utils"

export function PackagesSection() {
  return (
    <section className="py-20" id="packages">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title="Launch packages"
          description="Coordinated starting points. Swap services in or out after the briefing."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {launchPackages.map((pack, index) => (
            <FadeIn key={pack.id} delay={index * 0.05}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-xl border bg-card p-6 shadow-card",
                  pack.popular && "border-primary ring-2 ring-primary/15"
                )}
              >
                {pack.popular ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold">{pack.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pack.audience}</p>
                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {formatINRFrom(pack.priceFrom)}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pack.cta.href}
                  className={cn(
                    buttonVariants({
                      variant: pack.popular ? "default" : "outline",
                      size: "xl",
                    }),
                    "mt-8 w-full"
                  )}
                >
                  {pack.cta.label}
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-muted-foreground">
          {PRICE_DISCLAIMER}
        </p>
      </Container>
    </section>
  )
}
