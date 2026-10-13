"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Circle } from "lucide-react"
import { Container } from "@/components/container"
import { Button, buttonVariants } from "@/components/ui/button"
import { INDIAN_CITIES } from "@/lib/constants"
import { businessIntents, budgetEstimates, wizardOptions } from "@/lib/data/marketing"
import { ApiError, api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const BUDGET_RANGE: Record<string, { min: number; max: number }> = {
  "under-10k": { min: 0, max: 10000 },
  "10-25k": { min: 10000, max: 25000 },
  "25-50k": { min: 25000, max: 50000 },
  "50k-1l": { min: 50000, max: 100000 },
  "1l-plus": { min: 100000, max: 250000 },
}

const STEPS = 6

export function StartWizard() {
  const params = useSearchParams()
  const presetIntent = params.get("intent")
  const presetPackage = params.get("package")

  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState(params.get("goal") ?? "")
  const [type, setType] = useState(presetIntent ?? "")
  const [city, setCity] = useState("")
  const [budget, setBudget] = useState(
    presetPackage === "growth" ? "50k-1l" : presetPackage === "business" ? "25-50k" : ""
  )
  const [needs, setNeeds] = useState<string[]>([])
  const [accountError, setAccountError] = useState("")
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { user, register } = useAuth()

  const estimate = budgetEstimates[budget] ?? {
    investment: "₹25,000 – ₹40,000",
    timeline: "2–4 weeks",
  }

  const plan = useMemo(() => {
    const selectedNeeds = needs.length
      ? wizardOptions.needs.filter((item) => needs.includes(item.id))
      : wizardOptions.needs.filter((item) =>
          ["registration", "branding", "website", "payments", "marketing"].includes(item.id)
        )
    return selectedNeeds.map((item, index) => ({
      ...item,
      state: index < Math.max(2, Math.floor(selectedNeeds.length * 0.4)) ? "done" : "next",
    }))
  }, [needs])

  function next() {
    setStep((value) => Math.min(STEPS - 1, value + 1))
  }
  function back() {
    setStep((value) => Math.max(0, value - 1))
  }

  function toggleNeed(id: string) {
    setNeeds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  const canContinue = [
    Boolean(goal),
    Boolean(type),
    Boolean(city),
    Boolean(budget),
    needs.length > 0,
    true,
  ][step]

  return (
    <div className="hero-wash min-h-[calc(100vh-4rem)] py-10">
      <Container className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
          Business builder
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {step === 5 ? "Your Launch Plan" : "Let’s shape your launch."}
        </h1>
        <ProgressDots current={step} total={STEPS} />

        <div className="mt-8 rounded-2xl border bg-card p-5 shadow-card sm:p-8">
          {step === 0 ? (
            <Step
              title="What are you trying to launch?"
              options={wizardOptions.goals.map((item) => ({
                id: item.id,
                label: item.label,
                hint: item.hint,
              }))}
              value={goal}
              onChange={setGoal}
            />
          ) : null}
          {step === 1 ? (
            <Step
              title="What type of business?"
              options={businessIntents.map((item) => ({
                id: item.id,
                label: item.label,
              }))}
              value={type}
              onChange={setType}
            />
          ) : null}
          {step === 2 ? (
            <Step
              title="Where are you located?"
              options={INDIAN_CITIES.map((item) => ({ id: item, label: item }))}
              value={city}
              onChange={setCity}
            />
          ) : null}
          {step === 3 ? (
            <Step
              title="What's your approximate budget?"
              options={wizardOptions.budgets.map((item) => ({
                id: item.id,
                label: item.label,
              }))}
              value={budget}
              onChange={setBudget}
            />
          ) : null}
          {step === 4 ? (
            <div>
              <h2 className="text-xl font-semibold">What do you need?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Select everything that applies.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {wizardOptions.needs.map((item) => {
                  const active = needs.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleNeed(item.id)}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-left text-sm font-medium transition",
                        active
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "bg-background hover:border-foreground/20"
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
          {step === 5 ? (
            <div>
              <ol className="space-y-3">
                {plan.map((item) => (
                  <li key={item.id} className="flex items-center justify-between rounded-xl border px-4 py-3">
                    <span className="font-medium">{item.label}</span>
                    {item.state === "done" ? (
                      <span className="inline-flex items-center gap-1 text-sm text-primary">
                        <Check className="size-4" /> Ready to start
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Circle className="size-3.5" /> Next
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-4 rounded-xl bg-muted/70 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated investment</p>
                  <p className="mt-1 text-lg font-semibold">{estimate.investment}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated launch timeline</p>
                  <p className="mt-1 text-lg font-semibold">{estimate.timeline}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Range is for professional and platform work. Government fees are separate.
              </p>
              <form
                className="mt-6 space-y-3"
                onSubmit={async (event) => {
                  event.preventDefault()
                  setAccountError("")
                  setSaving(true)
                  try {
                    const data = new FormData(event.currentTarget)
                    const range = BUDGET_RANGE[budget]
                    if (!user) {
                      const fullName = String(data.get("fullName") ?? "").trim()
                      const [firstName, ...rest] = fullName.split(" ")
                      await register({
                        email: String(data.get("email") ?? ""),
                        password: String(data.get("password") ?? ""),
                        firstName: firstName || "Founder",
                        lastName: rest.join(" ") || "Founder",
                        role: "CUSTOMER",
                        businessName: String(data.get("business") ?? "") || undefined,
                        city,
                      })
                    }
                    await api("/launch-plans", {
                      method: "POST",
                      body: JSON.stringify({
                        goal,
                        businessType: type,
                        city,
                        budgetBand: budget,
                        budgetMin: range?.min,
                        budgetMax: range?.max,
                        estimatedDuration: estimate.timeline,
                        needs,
                      }),
                    })
                    router.push("/dashboard")
                  } catch (reason) {
                    setAccountError(reason instanceof ApiError ? reason.message : "Could not save the launch plan")
                    setSaving(false)
                  }
                }}
              >
                {user ? null : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Your name</Label>
                      <Input id="fullName" name="fullName" className="h-11" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="business">Business name</Label>
                      <Input id="business" name="business" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" className="h-11" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" className="h-11" minLength={8} required />
                    </div>
                  </div>
                )}
                {accountError ? <p className="text-sm text-destructive">{accountError}</p> : null}
                <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="h-11" disabled={saving}>
                  {saving ? "Saving…" : "Start My Launch"}
                </Button>
                <Link
                  href="/contact?intent=expert"
                  className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
                >
                  Talk to an Expert
                </Link>
                </div>
              </form>
            </div>
          ) : null}

          {step < 5 ? (
            <div className="mt-8 flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={back} disabled={step === 0} className="h-10">
                <ArrowLeft className="size-4" />
                Back
              </Button>
              <Button onClick={next} disabled={!canContinue} className="h-10 px-4">
                Continue
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

function Step({
  title,
  options,
  value,
  onChange,
}: {
  title: string
  options: { id: string; label: string; hint?: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "rounded-xl border px-4 py-4 text-left transition",
                active
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "bg-background hover:border-foreground/20"
              )}
            >
              <p className="font-medium">{option.label}</p>
              {option.hint ? (
                <p className="mt-1 text-sm text-muted-foreground">{option.hint}</p>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mt-6 flex items-center gap-1" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className="flex flex-1 items-center gap-1 last:flex-none">
          <span
            className={cn(
              "size-2.5 rounded-full",
              index <= current ? "bg-primary" : "bg-border"
            )}
          />
          {index < total - 1 ? (
            <span
              className={cn("h-px w-full", index < current ? "bg-primary" : "bg-border")}
            />
          ) : null}
        </span>
      ))}
    </div>
  )
}
