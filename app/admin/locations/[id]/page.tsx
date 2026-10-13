"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { KpiCard } from "@/components/admin/kpi-card"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { DotStatus, ProjectStatusBadge } from "@/components/admin/status-badges"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR, formatINR, formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

export default function LocationDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { projects: adminProjects, getCustomer, getLocation, getManager, getProvider, getService } = useScopedAdminData()
  const location = getLocation(params.id)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const projects = useMemo(
    () =>
      adminProjects.filter((item) => {
        if (!location || item.locationId !== location.id) return false
        if (status !== "all" && item.status !== status) return false
        const customer = getCustomer(item.customerId)
        return `${item.name} ${customer?.business}`.toLowerCase().includes(query.toLowerCase())
      }),
    [adminProjects, getCustomer, location?.id, query, status]
  )
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!location) notFound()
  const manager = getManager(location.managerId)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/locations", label: "Locations" },
          { label: location.name },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{location.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manager:{" "}
            <Link href={`/admin/managers/${manager?.id}`} className="font-medium text-foreground hover:underline">
              {manager?.name}
            </Link>
          </p>
          <div className="mt-2">
            <DotStatus active label="Active" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/admin/managers/${manager?.id}`} className={cn(buttonVariants({ variant: "outline" }), "h-9")}>
            View Manager
          </Link>
          <Button variant="outline" className="h-9" onClick={() => toast.message("Assign project (mock)")}>
            Assign Project
          </Button>
          <Link href="/admin/providers" className={cn(buttonVariants({ variant: "outline" }), "h-9")}>
            Add Provider
          </Link>
          <Button className="h-9" onClick={() => toast.success("Report generated (mock)")}>
            Generate Report
          </Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        <KpiCard label="Total Projects" value={String(location.totalProjects)} />
        <KpiCard label="Active Projects" value={String(location.activeProjects)} />
        <KpiCard label="Completed" value={String(location.completedProjects)} />
        <KpiCard label="Revenue" value={formatCompactINR(location.revenue)} />
        <KpiCard label="Customers" value={String(location.customers)} />
        <KpiCard label="Providers" value={String(location.providers)} />
        <KpiCard label="Delayed Projects" value={String(location.delayedProjects)} tone={location.delayedProjects ? "bad" : "good"} />
      </div>
      <section>
        <h2 className="text-lg font-semibold">{location.name} Projects</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." className="h-9 w-full sm:w-64" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 rounded-lg border bg-background px-2 text-sm">
            <option value="all">Status</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
        <AdminTable
          className="mt-4"
          columns={["Project", "Customer", "Service", "Provider", "Manager", "Status", "Deadline", "Value"]}
        >
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="font-medium hover:underline">
                  {project.name}
                </Link>
              </Td>
              <Td>{getCustomer(project.customerId)?.business}</Td>
              <Td>{getService(project.serviceId)?.name}</Td>
              <Td>{getProvider(project.providerId ?? "")?.name ?? "—"}</Td>
              <Td>{manager?.name.split(" ")[0]}</Td>
              <Td>
                <ProjectStatusBadge status={project.status} />
              </Td>
              <Td>{formatShortDate(project.deadline)}</Td>
              <Td>{project.value ? formatINR(project.value) : "—"}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
    </div>
  )
}
