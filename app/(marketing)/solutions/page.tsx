import Link from "next/link"
import { Container } from "@/components/container"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { PackagesSection } from "@/components/home/packages-section"
import { TrustSection } from "@/components/home/trust-section"
import { buttonVariants } from "@/components/ui/button"
import { businessIntents, launchPlans } from "@/lib/data/marketing"
import { cn } from "@/lib/utils"

export const metadata = { title: "Solutions" }

export default function SolutionsPage() {
  return (
    <>
      <Container className="py-16">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Solutions</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          Launch paths for the business you are actually starting.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
          Not a catalogue of gigs. A plan per business type, then the experts to execute it.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businessIntents.map((intent) => {
            const plan = launchPlans[intent.id]
            return (
              <article key={intent.id} className="flex flex-col rounded-xl border bg-card p-5 shadow-card">
                <h2 className="text-lg font-semibold">{intent.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.timeline} · {plan.estimate}
                </p>
                <ol className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                  {plan.steps.slice(0, 5).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <Link
                  href={`/start?intent=${intent.id}`}
                  className={cn(buttonVariants({ variant: "outline" }), "mt-5 h-9")}
                >
                  Build this plan
                </Link>
              </article>
            )
          })}
        </div>
      </Container>
      <PackagesSection />
      <HowItWorksSection />
      <TrustSection />
    </>
  )
}
