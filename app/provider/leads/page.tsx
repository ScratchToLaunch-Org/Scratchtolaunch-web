"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { formatINR } from "@/lib/format"

type Lead = {
  id: string
  title?: string
  name?: string
  value?: number
  customer?: { businessName?: string; city?: string }
  service?: { name?: string }
  createdAt?: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    api<{ newLeads: Lead[] }>("/provider/dashboard").then((data) => setLeads(data.newLeads ?? []))
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-2xl font-semibold">Leads</h2>
      {leads.length === 0 ? <p className="text-sm text-muted-foreground">No new leads. Assigned projects that are still new or assigned show up here.</p> : null}
      <div className="space-y-3">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded-xl border bg-card p-4">
            <p className="font-semibold">{lead.customer?.businessName ?? "Customer"}</p>
            <p className="text-sm text-muted-foreground">
              {lead.service?.name ?? lead.title ?? lead.name}
              {lead.customer?.city ? ` · ${lead.customer.city}` : ""}
              {lead.value ? ` · ${formatINR(lead.value)}` : ""}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
