"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Check } from "lucide-react"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const benefits = [
  {
    title: "Get qualified leads",
    body: "Founders arrive with a brief and a budget range, not a one-line “price?” message.",
  },
  {
    title: "Showcase your expertise",
    body: "A profile, portfolio and reviews in a product that looks like a business tool — not a gig board.",
  },
  {
    title: "Manage projects",
    body: "Milestones, files and messages live next to the order.",
  },
  {
    title: "Receive payments",
    body: "Checkout and milestone releases, with platform fees shown to the customer.",
  },
  {
    title: "Build your reputation",
    body: "Completed work and ratings stay attached to your name.",
  },
]

export default function BecomeProviderPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const profession = String(data.get("profession") ?? "").trim()
    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = "Name is required."
    if (!email.includes("@")) nextErrors.email = "Enter a valid email."
    if (profession.length < 2) nextErrors.profession = "Profession is required."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    const message = [
      `Profession: ${profession}`,
      `Experience: ${String(data.get("experience") ?? "")}`,
      `Location: ${String(data.get("location") ?? "")}`,
      `Services: ${String(data.get("services") ?? "")}`,
      `Portfolio: ${String(data.get("portfolio") ?? "")}`,
      `Starting price: ${String(data.get("price") ?? "")}`,
    ].join("\n")
    try {
      await api("/inquiries", {
        method: "POST",
        auth: false,
        body: JSON.stringify({
          kind: "PROVIDER_APPLICATION",
          name,
          email,
          message: message.length >= 10 ? message : `${message}\nApplication submitted.`,
          payload: {
            profession,
            experience: String(data.get("experience") ?? ""),
            location: String(data.get("location") ?? ""),
            services: String(data.get("services") ?? ""),
            portfolio: String(data.get("portfolio") ?? ""),
            price: String(data.get("price") ?? ""),
          },
        }),
      })
      setSent(true)
      toast.success("Application submitted", {
        description: "We’ll review it and email you when the profile is ready.",
      })
    } catch (reason) {
      toast.error(reason instanceof ApiError ? reason.message : "Could not submit the application")
    }
  }

  return (
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
            Providers
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
            Turn your expertise into income.
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground leading-7">
            Join professionals helping entrepreneurs launch their businesses.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Apply as a Provider</h2>
          <div className="mt-5 space-y-4">
            <Field label="Name" htmlFor="name" error={errors.name}>
              <Input id="name" name="name" className="h-11" />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email}>
              <Input id="email" name="email" type="email" className="h-11" />
            </Field>
            <Field label="Profession" htmlFor="profession" error={errors.profession}>
              <Input id="profession" name="profession" className="h-11" placeholder="CA, web studio, lawyer…" />
            </Field>
            <Field label="Experience" htmlFor="experience">
              <Input id="experience" name="experience" className="h-11" placeholder="e.g. 6 years" />
            </Field>
            <Field label="Location" htmlFor="location">
              <Input id="location" name="location" className="h-11" />
            </Field>
            <Field label="Services" htmlFor="services">
              <Input id="services" name="services" className="h-11" placeholder="GST, websites, brand…" />
            </Field>
            <Field label="Portfolio" htmlFor="portfolio">
              <Textarea id="portfolio" name="portfolio" placeholder="Links or a short description of recent work." />
            </Field>
            <Field label="Starting price (₹)" htmlFor="price">
              <Input id="price" name="price" className="h-11" inputMode="numeric" placeholder="7999" />
            </Field>
            <Button type="submit" className="h-11 w-full" disabled={sent}>
              {sent ? "Application received" : "Apply as a Provider"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
