"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { KpiCard } from "@/components/admin/kpi-card"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR } from "@/lib/format"

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { projects: adminProjects, providers: adminProviders, locations: adminLocations, getService } = useScopedAdminData()
  const service = getService(params.id)
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!service) notFound()
  const projects = adminProjects.filter((item) => item.serviceId === service.id)
  const providers = adminProviders.filter(
    (item) => item.category.toLowerCase().includes(service.category.toLowerCase().slice(0, 3)) || item.category === service.name.split(" ")[0]
  )

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/services", label: "Services" },
          { label: service.name },
        ]}
      />
      <h1 className="text-2xl font-semibold">{service.name}</h1>
      <p className="text-sm text-muted-foreground">{service.category}</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Projects" value={String(service.projects)} />
        <KpiCard label="Revenue" value={formatINR(service.revenue)} />
        <KpiCard label="Average order value" value={formatINR(service.avgValue)} />
        <KpiCard label="Avg completion" value={`${service.avgDays} days`} />
        <KpiCard label="Customer rating" value={service.rating.toFixed(1)} />
      </div>
      <section>
        <h2 className="mb-3 font-semibold">Current-cycle projects</h2>
        <AdminTable columns={["Project", "Location", "Value"]}>
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="hover:underline">
                  {project.name}
                </Link>
              </Td>
              <Td>{adminLocations.find((item) => item.id === project.locationId)?.name}</Td>
              <Td>{project.value ? formatINR(project.value) : "—"}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
      <section>
        <h2 className="mb-3 font-semibold">Providers offering this work</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {(providers.length ? providers : adminProviders.slice(0, 4)).map((provider) => (
            <li key={provider.id}>
              <Link href={`/admin/providers/${provider.id}`} className="block rounded-xl border bg-card p-4 text-sm hover:bg-muted/40">
                {provider.name}
                <span className="block text-muted-foreground">{provider.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
