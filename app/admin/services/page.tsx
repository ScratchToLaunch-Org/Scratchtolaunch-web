"use client"

import Link from "next/link"
import { KpiCard } from "@/components/admin/kpi-card"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { useAdmin } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"

export default function ServicesPage() {
  const { services: adminServices } = useAdmin()
  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Services" }]} />
      <h1 className="text-2xl font-semibold">Top Services</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {adminServices.map((service) => (
          <Link
            key={service.id}
            href={`/admin/services/${service.id}`}
            className="rounded-xl border bg-card p-5 transition hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{formatCompactINR(service.revenue)}</p>
            <p className="text-sm text-muted-foreground">{service.projects} projects</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
