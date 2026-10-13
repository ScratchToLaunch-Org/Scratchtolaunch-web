"use client"

import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { RevenueAreaChart, SimpleBarChart } from "@/components/admin/charts"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"

export default function AnalyticsPage() {
  const { series: revenueSeries } = useAdmin()
  const { locations } = useScopedAdminData()
  const locationRevenueSeries = locations.map((item) => ({ name: item.name, revenue: item.revenue }))
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Analytics" }]} />
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Revenue over time</h2>
          <RevenueAreaChart data={revenueSeries} />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Projects created</h2>
          <SimpleBarChart data={revenueSeries} dataKey="projects" nameKey="month" />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Projects completed</h2>
          <SimpleBarChart data={revenueSeries} dataKey="completed" nameKey="month" />
        </section>
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Customer growth</h2>
          <SimpleBarChart data={revenueSeries} dataKey="customers" nameKey="month" />
        </section>
        <section className="rounded-xl border bg-card p-5 lg:col-span-2">
          <h2 className="font-semibold">Location revenue</h2>
          <SimpleBarChart data={locationRevenueSeries} dataKey="revenue" nameKey="name" />
        </section>
      </div>
    </div>
  )
}
