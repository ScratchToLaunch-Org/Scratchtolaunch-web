"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { StatusPill } from "@/components/status-pill"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Item = { id: string; title: string; status: string }

export default function LaunchPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [summary, setSummary] = useState("")

  useEffect(() => {
    api<{ launchPlans: { city?: string; businessType?: string; items: Item[] }[] }>("/customer/dashboard").then((data) => {
      const plan = data.launchPlans[0]
      setItems(plan?.items ?? [])
      setSummary([user?.customer?.businessName, plan?.businessType, plan?.city].filter(Boolean).join(" · "))
    })
  }, [user?.customer?.businessName])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">My Launch</h2>
        <p className="mt-1 text-sm text-muted-foreground">{summary || "Your launch plan"}</p>
      </div>
      <ol className="space-y-3">
        {items.map((item, index) => {
          const status = item.status === "DONE" || item.status === "COMPLETED" ? "done" : item.status === "IN_PROGRESS" ? "in-progress" : "upcoming"
          return (
            <li key={item.id} className="rounded-xl border bg-card p-4 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Step {index + 1}</p>
                  <h3 className="mt-1 font-semibold">{item.title}</h3>
                </div>
                <StatusPill status={status} label={item.status.replaceAll("_", " ")} />
              </div>
              <Link href="/services" className={cn(buttonVariants({ variant: "outline" }), "mt-4 h-9")}>
                Book this
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
