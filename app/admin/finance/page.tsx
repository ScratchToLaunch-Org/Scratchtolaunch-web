"use client"

import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { KpiCard } from "@/components/admin/kpi-card"
import { RevenueAreaChart, SimpleBarChart } from "@/components/admin/charts"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"

export default function FinancePage() {
  const { stats: financeSummary, series: revenueSeries, services: adminServices } = useAdmin()
  const { locations } = useScopedAdminData()
  const locationRevenueSeries = locations.map((item) => ({ name: item.name, revenue: item.revenue }))
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Finance" }]} />
      <h1 className="text-2xl font-semibold">Finance</h1>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Revenue" value={formatCompactINR(financeSummary.revenue)} hint="This month" />
        <KpiCard label="Provider payouts" value={formatCompactINR(financeSummary.payouts)} />
        <KpiCard label="Platform revenue" value={formatCompactINR(financeSummary.platform)} />
        <KpiCard label="Pending payments" value={formatCompactINR(financeSummary.pending)} tone="warn" />
        <KpiCard label="Refunds" value={formatCompactINR(financeSummary.refunds)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Revenue</h2>
          <RevenueAreaChart data={revenueSeries} />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Payouts vs revenue</h2>
          <SimpleBarChart data={revenueSeries} dataKey="payouts" nameKey="month" />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Location revenue</h2>
          <SimpleBarChart data={locationRevenueSeries} dataKey="revenue" nameKey="name" />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Service revenue</h2>
          <SimpleBarChart
            data={adminServices.map((item) => ({ name: item.name.split(" ")[0], revenue: item.revenue }))}
            dataKey="revenue"
          />
        </section>
      </div>
    </div>
  )
}
