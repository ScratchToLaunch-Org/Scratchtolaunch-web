"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { KpiCard } from "@/components/admin/kpi-card"
import { ProviderStatusBadge, ProjectStatusBadge } from "@/components/admin/status-badges"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { Button } from "@/components/ui/button"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR, formatINR } from "@/lib/format"

export default function ProviderDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { projects: adminProjects, locations: adminLocations, getProvider } = useScopedAdminData()
  const provider = getProvider(params.id)
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!provider) notFound()
  const listed = adminProjects.filter((item) => item.providerId === provider.id)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/providers", label: "Providers" },
          { label: provider.name },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{provider.contactName}</h1>
          <p className="text-sm text-muted-foreground">
            {provider.name} · {provider.category}
          </p>
          <div className="mt-2">
            <ProviderStatusBadge status={provider.status} />
          </div>
        </div>
        {provider.status === "pending" ? (
          <Button className="h-9" onClick={() => toast.success("Provider approved (mock)")}>
            Approve provider
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Projects completed" value={String(provider.completedProjects)} />
        <KpiCard label="On-time delivery" value={`${provider.onTime}%`} />
        <KpiCard label="Customer rating" value={provider.rating ? provider.rating.toFixed(1) : "—"} />
        <KpiCard label="Response rate" value={`${provider.responseRate}%`} />
      </div>
      <section className="rounded-xl border bg-card p-5 text-sm">
        <h2 className="font-semibold">Profile</h2>
        <p className="mt-2 text-muted-foreground">{provider.about}</p>
        <p className="mt-3">
          Locations:{" "}
          {provider.locationIds
            .map((id) => adminLocations.find((item) => item.id === id)?.name)
            .join(", ")}
        </p>
        <p>Earnings: {provider.earnings ? formatCompactINR(provider.earnings) : "—"}</p>
        <p>Active projects: {provider.activeProjects}</p>
      </section>
      <section>
        <h2 className="mb-3 font-semibold">Projects</h2>
        <AdminTable columns={["Project", "Status", "Value"]}>
          {listed.map((project) => (
            <tr key={project.id}>
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="hover:underline">
                  {project.name}
                </Link>
              </Td>
              <Td>
                <ProjectStatusBadge status={project.status} />
              </Td>
              <Td>{project.value ? formatINR(project.value) : "—"}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
    </div>
  )
}
