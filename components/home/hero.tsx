"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, Circle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/container"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Your business", state: "root" as const },
  { label: "Business setup", state: "done" as const },
  { label: "Brand identity", state: "done" as const },
  { label: "Website", state: "current" as const },
  { label: "Payments", state: "next" as const },
  { label: "Marketing", state: "next" as const },
  { label: "Ready to launch", state: "goal" as const },
]

export function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden border-b">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Business launch platform
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Your business idea deserves a launch plan.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
            From business registration and GST to branding, websites and
            marketing — get everything you need to launch your business in one
            place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/start" className={cn(buttonVariants({ size: "xl" }))}>
              Start My Business
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
            >
              Explore Services
            </Link>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
            {["Verified professionals", "Transparent pricing", "One place to manage everything"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <LaunchDashboard />
      </Container>
    </section>
  )
}

function LaunchDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[28px] bg-primary/5 blur-2xl" />
      <div className="relative rounded-2xl border bg-card p-5 shadow-lift sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Launch dashboard
            </p>
            <p className="mt-1 text-lg font-semibold">Northstar Apparel</p>
            <p className="text-sm text-muted-foreground">Online store · Bengaluru</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tabular-nums">62%</p>
            <p className="text-xs text-muted-foreground">ready to launch</p>
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "62%" }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className="mt-6 space-y-0">
          {steps.map((step, index) => (
            <li key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepIcon state={step.state} delay={0.45 + index * 0.08} />
                {index < steps.length - 1 ? (
                  <span
                    className={cn(
                      "w-px flex-1 min-h-4",
                      step.state === "done" || step.state === "root"
                        ? "bg-primary/40"
                        : "bg-border"
                    )}
                  />
                ) : null}
              </div>
              <div className="flex w-full items-center justify-between pb-3">
                <span
                  className={cn(
                    "text-sm",
                    step.state === "next" ? "text-muted-foreground" : "font-medium"
                  )}
                >
                  {step.label}
                </span>
                <StepLabel state={step.state} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}

function StepIcon({
  state,
  delay,
}: {
  state: (typeof steps)[number]["state"]
  delay: number
}) {
  if (state === "done") {
    return (
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
        className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <Check className="size-3" />
      </motion.span>
    )
  }
  if (state === "current") {
    return (
      <motion.span
        className="grid size-5 place-items-center rounded-full bg-primary/15 text-primary"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <ArrowRight className="size-3" />
      </motion.span>
    )
  }
  if (state === "goal") {
    return (
      <span className="grid size-5 place-items-center rounded-full bg-foreground text-[10px] text-background">
        🚀
      </span>
    )
  }
  return (
    <span className="grid size-5 place-items-center rounded-full border border-border bg-card">
      <Circle className="size-2.5 text-muted-foreground" />
    </span>
  )
}

function StepLabel({ state }: { state: (typeof steps)[number]["state"] }) {
  if (state === "done") return <span className="text-xs text-primary">Done</span>
  if (state === "current") return <span className="text-xs text-primary">In progress</span>
  if (state === "goal") return <span className="text-xs font-medium">Launch</span>
  if (state === "root") return <span className="text-xs text-muted-foreground">Brief</span>
  return <span className="text-xs text-muted-foreground">Queued</span>
}
