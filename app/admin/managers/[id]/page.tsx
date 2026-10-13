"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { KpiCard } from "@/components/admin/kpi-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"

const permissionOptions = [
  { id: "projects", label: "Projects", defaultChecked: true },
  { id: "customers", label: "Customers", defaultChecked: true },
  { id: "providers", label: "Providers", defaultChecked: true },
  { id: "messages", label: "Messages", defaultChecked: true },
  { id: "reports", label: "Reports", defaultChecked: true },
  { id: "finance", label: "Company Financials", defaultChecked: false },
  { id: "other", label: "Other Locations", defaultChecked: false },
  { id: "admin", label: "Admin Management", defaultChecked: false },
]

export default function ManagerDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { locations: adminLocations, getLocation, getManager } = useScopedAdminData()
  const manager = getManager(params.id)
  const [perms, setPerms] = useState(
    Object.fromEntries(permissionOptions.map((item) => [item.id, item.defaultChecked]))
  )
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!manager) notFound()
  const location = getLocation(manager.locationIds[0] ?? "")

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/managers", label: "Managers" },
          { label: manager.name },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold">{manager.name}</h1>
        <p className="text-sm text-muted-foreground">{location?.name} Location Manager</p>
      </div>
      <section className="rounded-xl border bg-card p-5 text-sm">
        <h2 className="font-semibold">Profile</h2>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">Email</dt>
            <dd>{manager.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Phone</dt>
            <dd>{manager.phone}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Location</dt>
            <dd>{location?.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Joined</dt>
            <dd>{manager.joined}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Status</dt>
            <dd className="capitalize">{manager.status}</dd>
          </div>
        </dl>
      </section>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Active projects" value={String(location?.activeProjects ?? 0)} />
        <KpiCard label="Completed" value={String(location?.completedProjects ?? 0)} />
        <KpiCard label="Delayed" value={String(location?.delayedProjects ?? 0)} tone="warn" />
        <KpiCard label="Revenue" value={location ? formatCompactINR(location.revenue) : "—"} />
        <KpiCard label="Customer satisfaction" value={manager.satisfaction.toFixed(1)} />
      </div>
      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Assign Location</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <p>
            Manager
            <span className="mt-1 block font-medium">{manager.name}</span>
          </p>
          <label className="block">
            Location
            <select defaultValue={location?.id} className="mt-1 h-9 w-full rounded-lg border bg-background px-2">
              {adminLocations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <p>
            Permission
            <span className="mt-1 block font-medium">Location Manager</span>
          </p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {permissionOptions.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={perms[item.id]}
                onCheckedChange={(checked) =>
                  setPerms((current) => ({ ...current, [item.id]: Boolean(checked) }))
                }
              />
              {item.label}
            </label>
          ))}
        </div>
        <Button className="mt-5 h-9" onClick={() => toast.success("Assignment saved (mock)")}>
          Save Assignment
        </Button>
      </section>
    </div>
  )
}
