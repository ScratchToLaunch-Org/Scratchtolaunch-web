"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api/client"
import { StatusPill } from "@/components/status-pill"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  name: string
  status: string
  deadline?: string | null
  paymentStatus?: string
  provider?: { businessName?: string } | null
  milestones?: { id: string; title: string; status: string; dueDate?: string | null }[]
  files?: { id: string; filename?: string; name?: string; mimeType?: string; downloadUrl?: string }[]
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    api<Project>(`/projects/${params.id}`)
      .then(setProject)
      .catch((reason: Error) => setError(reason.message))
  }, [params.id])

  if (error) return <p className="text-sm text-destructive">{error}</p>
  if (!project) return <p className="text-sm text-muted-foreground">Loading project…</p>

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{project.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Provider: {project.provider?.businessName ?? "Unassigned"}</p>
        </div>
        <StatusPill status={project.status === "COMPLETED" ? "done" : "in-progress"} label={project.status.replaceAll("_", " ")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Due date" value={project.deadline ? new Date(project.deadline).toLocaleDateString("en-IN") : "—"} />
        <Card label="Payment" value={project.paymentStatus ?? "—"} />
        <Card label="Status" value={project.status.replaceAll("_", " ")} />
      </div>
      <section className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold">Milestones</h3>
        <ul className="mt-4 space-y-3">
          {(project.milestones ?? []).map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span>{item.title}</span>
              <span className="text-muted-foreground">{item.status}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold">Files</h3>
        <ul className="mt-4 space-y-2">
          {(project.files ?? []).length === 0 ? <li className="text-sm text-muted-foreground">No files yet.</li> : null}
          {(project.files ?? []).map((file) => (
            <li key={file.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <span>{file.filename || file.name}</span>
              {file.downloadUrl ? (
                <a href={file.downloadUrl} className="text-primary hover:underline">Download</a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
      <Link href="/dashboard/messages" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
        Open messages
      </Link>
    </div>
  )
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium capitalize">{value}</p>
    </div>
  )
}
