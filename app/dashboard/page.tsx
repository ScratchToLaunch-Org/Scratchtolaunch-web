"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Circle, ArrowRight } from "lucide-react"
import { StatusPill } from "@/components/status-pill"
import { api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { greetingForHour } from "@/lib/format"

type LaunchItem = { id: string; title: string; status: string }
type ProjectRow = { id: string; title: string; status: string; provider?: { businessName?: string } | null }

export default function DashboardOverviewPage() {
  const { user } = useAuth()
  const [hello, setHello] = useState("Hello")
  const [items, setItems] = useState<LaunchItem[]>([])
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    setHello(greetingForHour(new Date().getHours()))
    api<{ launchPlans: { items: LaunchItem[] }[]; activeProjects: ProjectRow[] }>("/customer/dashboard")
      .then((data) => {
        setItems(data.launchPlans[0]?.items ?? [])
        setProjects(data.activeProjects ?? [])
      })
      .catch((reason: Error) => setError(reason.message))
  }, [])

  const done = items.filter((item) => item.status === "DONE" || item.status === "COMPLETED").length
  const progress = items.length ? Math.round((done / items.length) * 100) : projects.length ? 10 : 0

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{hello} 👋</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {user?.customer?.businessName ?? "Your business"} is {progress}% ready to launch.
        </h2>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <section className="rounded-xl border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">Launch checklist</h3>
          <Link href="/dashboard/launch" className="text-sm text-primary hover:underline">
            View plan
          </Link>
        </div>
        <ul className="mt-4 divide-y">
          {items.length === 0 ? (
            <li className="py-4 text-sm text-muted-foreground">
              No launch plan yet. <Link href="/start" className="text-primary hover:underline">Build one</Link>.
            </li>
          ) : null}
          {items.map((item) => {
            const status = item.status === "DONE" || item.status === "COMPLETED" ? "done" : item.status === "IN_PROGRESS" ? "in-progress" : "upcoming"
            return (
              <li key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <StatusIcon status={status} />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.status.replaceAll("_", " ").toLowerCase()}</p>
                  </div>
                </div>
                <StatusPill status={status} label={status === "done" ? "Done" : status === "in-progress" ? "In progress" : "Queued"} />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

function StatusIcon({ status }: { status: "done" | "in-progress" | "upcoming" }) {
  if (status === "done") {
    return (
      <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-3.5" />
      </span>
    )
  }
  if (status === "in-progress") {
    return (
      <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
        <ArrowRight className="size-3.5" />
      </span>
    )
  }
  return (
    <span className="grid size-7 place-items-center rounded-full border text-muted-foreground">
      <Circle className="size-3.5" />
    </span>
  )
}
