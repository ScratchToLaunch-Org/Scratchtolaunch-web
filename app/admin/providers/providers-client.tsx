"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { ProviderStatusBadge } from "@/components/admin/status-badges"
import { useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"
import { Input } from "@/components/ui/input"

export function ProvidersBoard() {
  const params = useSearchParams()
  const { providers, locations: adminLocations } = useScopedAdminData()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState(params.get("status") ?? "all")
  const filtered = useMemo(
    () =>
      providers.filter((item) => {
        const hay = `${item.name} ${item.contactName} ${item.category}`.toLowerCase()
        return hay.includes(query.toLowerCase()) && (status === "all" || item.status === status)
      }),
    [providers, query, status]
  )

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Providers" }]} />
      <h1 className="text-2xl font-semibold">Providers</h1>
      <div className="flex flex-wrap gap-2">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search providers..." className="h-9 w-64" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 rounded-lg border bg-background px-2 text-sm">
          <option value="all">Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <AdminTable columns={["Provider", "Category", "Location", "Projects", "Rating", "Earnings", "Status"]}>
        {filtered.map((provider) => (
          <tr key={provider.id}>
            <Td>
              <Link href={`/admin/providers/${provider.id}`} className="font-medium hover:underline">
                {provider.contactName}
              </Link>
              <p className="text-[11px] text-muted-foreground">{provider.name}</p>
            </Td>
            <Td>{provider.category}</Td>
            <Td>
              {provider.locationIds
                .map((id) => adminLocations.find((item) => item.id === id)?.name)
                .join(", ")}
            </Td>
            <Td>{provider.completedProjects}</Td>
            <Td>{provider.rating ? provider.rating.toFixed(1) : "—"}</Td>
            <Td>{provider.earnings ? formatCompactINR(provider.earnings) : "—"}</Td>
            <Td>
              <ProviderStatusBadge status={provider.status} />
            </Td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
