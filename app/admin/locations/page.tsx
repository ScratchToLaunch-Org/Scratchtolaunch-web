"use client"

import Link from "next/link"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { DotStatus } from "@/components/admin/status-badges"
import { KpiCard } from "@/components/admin/kpi-card"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LocationsPage() {
  const { canManageOrg } = useAdmin()
  const { locations, getManager } = useScopedAdminData()

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Locations" }]} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Locations</h1>
          <p className="text-sm text-muted-foreground">Each city has a manager accountable for delivery.</p>
        </div>
        {canManageOrg ? (
          <Link href="/admin/locations/new" className={cn(buttonVariants(), "h-9")}>
            Add location
          </Link>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Locations" value={String(locations.length)} />
        <KpiCard
          label="Active projects"
          value={String(locations.reduce((sum, item) => sum + item.activeProjects, 0))}
        />
        <KpiCard
          label="Revenue"
          value={formatCompactINR(locations.reduce((sum, item) => sum + item.revenue, 0))}
        />
      </div>
      <AdminTable columns={["Location", "Manager", "Projects", "Revenue", "Delayed", "Status", ""]}>
        {locations.map((location) => (
          <tr key={location.id}>
            <Td className="font-medium">
              <Link href={`/admin/locations/${location.id}`} className="hover:underline">
                {location.name}
              </Link>
            </Td>
            <Td>{getManager(location.managerId)?.name}</Td>
            <Td>{location.totalProjects}</Td>
            <Td>{formatCompactINR(location.revenue)}</Td>
            <Td className={location.delayedProjects ? "text-red-700" : ""}>{location.delayedProjects}</Td>
            <Td>
              <DotStatus active={location.status === "active"} label="Active" />
            </Td>
            <Td>
              <Link href={`/admin/locations/${location.id}`} className="text-primary hover:underline">
                View
              </Link>
            </Td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
