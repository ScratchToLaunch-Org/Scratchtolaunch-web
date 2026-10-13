"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Building2,
  Camera,
  GraduationCap,
  Monitor,
  Rocket,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn } from "@/components/fade-in"
import { buttonVariants } from "@/components/ui/button"
import { businessIntents, launchPlans } from "@/lib/data/marketing"
import { cn } from "@/lib/utils"

const icons = {
  store: Store,
  building: Building2,
  monitor: Monitor,
  graduation: GraduationCap,
  camera: Camera,
  utensils: UtensilsCrossed,
  briefcase: Briefcase,
  rocket: Rocket,
  sparkles: Sparkles,
}

export function BuildingSection() {
  const [selected, setSelected] = useState<(typeof businessIntents)[number]["id"]>(
    "online-store"
  )
  const plan = useMemo(() => launchPlans[selected], [selected])

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Launch planner"
          title="What are you building?"
          description="Pick a business type. We’ll sketch a launch plan you can take into the full briefing."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {businessIntents.map((intent) => {
              const Icon = icons[intent.icon]
              const active = selected === intent.id
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => setSelected(intent.id)}
                  className={cn(
                    "rounded-xl border bg-card p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift",
                    active && "border-primary ring-2 ring-primary/20"
                  )}
                >
                  <Icon className="size-5 text-primary" />
                  <p className="mt-3 text-sm font-medium">{intent.label}</p>
                </button>
              )
            })}
          </div>

          <FadeIn className="rounded-xl border bg-card p-6 shadow-card">
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Your launch plan
            </p>
            <h3 className="mt-2 text-xl font-semibold">{plan.title}</h3>
            <ol className="mt-5 space-y-2.5">
              {plan.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="w-5 shrink-0 tabular-nums text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5 text-sm">
              <div>
                <p className="text-muted-foreground">Estimated range</p>
                <p className="mt-1 font-medium">{plan.estimate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Timeline</p>
                <p className="mt-1 font-medium">{plan.timeline}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Estimates exclude government fees unless listed later in checkout.
            </p>
            <Link
              href={`/start?intent=${selected}`}
              className={cn(buttonVariants({ size: "xl" }), "mt-5 w-full sm:w-auto")}
            >
              Build My Launch Plan
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
