"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { apiList } from "@/lib/api/client"
import { buttonVariants } from "@/components/ui/button"
import { StatusPill } from "@/components/status-pill"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  name: string
  status: string
  deadline?: string | null
  provider?: { businessName?: string } | null
  milestones?: { title: string; status: string }[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    apiList<Project>("/projects?limit=100").then(setProjects)
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h2 className="text-2xl font-semibold">Projects</h2>
      {projects.length === 0 ? <p className="text-sm text-muted-foreground">No projects yet. Checkout a service to start one.</p> : null}
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground">Provider: {project.provider?.businessName ?? "Unassigned"}</p>
              </div>
              <StatusPill status={project.status === "COMPLETED" ? "done" : "in-progress"} label={project.status.replaceAll("_", " ")} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <p>{project.deadline ? `Due ${new Date(project.deadline).toLocaleDateString("en-IN")}` : "No deadline"}</p>
              <Link href={`/dashboard/projects/${project.id}`} className={cn(buttonVariants(), "h-9")}>
                Open Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
