"use client"

import Link from "next/link"
import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { ProjectStatusBadge } from "@/components/admin/status-badges"
import { useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR, formatShortDate } from "@/lib/format"
import { Input } from "@/components/ui/input"
import type { AdminProject, AdminProjectStatus } from "@/lib/admin/types"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { cn } from "@/lib/utils"

const columns: { id: AdminProjectStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "assigned", label: "Assigned" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "completed", label: "Completed" },
  { id: "delayed", label: "Delayed" },
]

export function ProjectsBoard() {
  const params = useSearchParams()
  const { projects, locations: adminLocations, getCustomer, getManager, getProvider, getService } = useScopedAdminData()
  const [view, setView] = useState<"table" | "kanban">("table")
  const [query, setQuery] = useState(params.get("q") ?? "")
  const [status, setStatus] = useState(params.get("status") ?? "all")
  const [board, setBoard] = useState<AdminProject[]>(projects)

  useEffect(() => {
    setBoard(projects)
  }, [projects])

  const filtered = useMemo(() => {
    const source = view === "kanban" ? board : projects
    return source.filter((project) => {
      const customer = getCustomer(project.customerId)
      const hay = `${project.name} ${project.code} ${customer?.business ?? ""}`.toLowerCase()
      const matchesQuery = hay.includes(query.toLowerCase())
      const matchesStatus = status === "all" || project.status === status
      return matchesQuery && matchesStatus
    })
  }, [board, projects, query, status, view])

  function onDrop(statusId: AdminProjectStatus, projectId: string) {
    setBoard((current) =>
      current.map((item) => (item.id === projectId ? { ...item, status: statusId } : item))
    )
  }

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Projects" }]} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">All Projects</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} in this view</p>
        </div>
        <div className="flex rounded-lg border p-0.5">
          {(["table", "kanban"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium capitalize",
                view === item ? "bg-foreground text-background" : "text-muted-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects..."
          className="h-9 w-full sm:w-64"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-9 rounded-lg border bg-background px-2 text-sm"
        >
          <option value="all">Status</option>
          {columns.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {view === "table" ? (
        <AdminTable
          columns={["Project", "Customer", "Service", "Provider", "Manager", "Status", "Deadline", "Value"]}
        >
          {filtered.map((project) => (
            <tr key={project.id} className="hover:bg-muted/40">
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="font-medium hover:underline">
                  {project.name}
                </Link>
                <p className="text-[11px] text-muted-foreground">{project.code}</p>
              </Td>
              <Td>{getCustomer(project.customerId)?.business}</Td>
              <Td>{getService(project.serviceId)?.name}</Td>
              <Td>{getProvider(project.providerId ?? "")?.name ?? "Unassigned"}</Td>
              <Td>{getManager(project.managerId)?.name.split(" ")[0]}</Td>
              <Td>
                <ProjectStatusBadge status={project.status} />
              </Td>
              <Td>{formatShortDate(project.deadline)}</Td>
              <Td className="tabular-nums">{project.value ? formatINR(project.value) : "—"}</Td>
            </tr>
          ))}
        </AdminTable>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-64 shrink-0 rounded-xl border bg-muted/30 p-2"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const id = event.dataTransfer.getData("text/plain")
                if (id) onDrop(column.id, id)
              }}
            >
              <p className="px-1 py-1.5 text-xs font-medium text-muted-foreground">
                {column.label} · {filtered.filter((item) => item.status === column.id).length}
              </p>
              <div className="space-y-2">
                {filtered
                  .filter((item) => item.status === column.id)
                  .map((project) => (
                    <article
                      key={project.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData("text/plain", project.id)}
                      className="cursor-grab rounded-lg border bg-card p-3 active:cursor-grabbing"
                    >
                      <Link href={`/admin/projects/${project.id}`} className="text-sm font-medium hover:underline">
                        {project.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getCustomer(project.customerId)?.business}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getProvider(project.providerId ?? "")?.name ?? "Unassigned"} ·{" "}
                        {adminLocations.find((item) => item.id === project.locationId)?.name}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span>{project.value ? formatINR(project.value) : "—"}</span>
                        <span>{formatShortDate(project.deadline)}</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {getManager(project.managerId)?.name.split(" ")[0]} · {project.progress}%
                      </p>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
