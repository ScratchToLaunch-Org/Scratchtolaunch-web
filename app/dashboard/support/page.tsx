"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Ticket = { id: string; subject: string; status: string; createdAt: string }

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])

  function load() {
    api<Ticket[]>("/support/tickets").then(setTickets).catch(() => setTickets([]))
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold">Support</h2>
      <ul className="space-y-2">
        {tickets.length === 0 ? <li className="text-sm text-muted-foreground">No tickets yet.</li> : null}
        {tickets.map((ticket) => (
          <li key={ticket.id} className="rounded-xl border bg-card px-4 py-3 text-sm">
            <p className="font-medium">{ticket.subject}</p>
            <p className="text-muted-foreground">{ticket.status} · {new Date(ticket.createdAt).toLocaleDateString("en-IN")}</p>
          </li>
        ))}
      </ul>
      <form
        className="space-y-4 rounded-xl border bg-card p-5"
        onSubmit={async (event) => {
          event.preventDefault()
          const form = event.currentTarget
          const data = new FormData(form)
          try {
            await api("/support/tickets", {
              method: "POST",
              body: JSON.stringify({
                subject: String(data.get("subject") ?? ""),
                body: String(data.get("details") ?? ""),
              }),
            })
            toast.success("Ticket created")
            form.reset()
            load()
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not create the ticket")
          }
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" className="h-11" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="details">What happened?</Label>
          <Textarea id="details" name="details" required />
        </div>
        <Button type="submit" className="h-10">Submit ticket</Button>
      </form>
    </div>
  )
}
