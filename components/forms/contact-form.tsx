"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const params = useSearchParams()
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()
    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = "Please enter your name."
    if (!email.includes("@")) nextErrors.email = "Enter a valid email."
    if (message.length < 10) nextErrors.message = "Tell us a little more."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSending(true)
    try {
      await api("/inquiries", {
        method: "POST",
        auth: false,
        body: JSON.stringify({
          kind: "CONTACT",
          name,
          email,
          message,
          payload: {
            intent: String(data.get("intent") ?? ""),
            provider: String(data.get("provider") ?? ""),
          },
        }),
      })
      toast.success("Message received", { description: "We’ll reply by email." })
      form.reset()
    } catch (reason) {
      toast.error(reason instanceof ApiError ? reason.message : "Could not send the message")
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border bg-card p-6 shadow-card">
      <input type="hidden" name="intent" defaultValue={params.get("intent") ?? ""} />
      <input type="hidden" name="provider" defaultValue={params.get("provider") ?? ""} />
      <Field label="Name" htmlFor="name" error={errors.name}>
        <Input id="name" name="name" className="h-11" autoComplete="name" />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email}>
        <Input id="email" name="email" type="email" className="h-11" autoComplete="email" />
      </Field>
      <Field label="What do you need?" htmlFor="message" error={errors.message}>
        <Textarea id="message" name="message" className="min-h-32" placeholder="A short brief is enough." />
      </Field>
      <Button type="submit" className="h-11 px-5" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </Button>
    </form>
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
