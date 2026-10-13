"use client"

import { useState } from "react"
import Link from "next/link"
import { AttentionList } from "@/components/admin/attention-list"
import { IndiaOpsMap } from "@/components/admin/india-ops-map"
import { KpiCard } from "@/components/admin/kpi-card"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { ProjectStatusBadge } from "@/components/admin/status-badges"
import { RevenueAreaChart, SimpleBarChart } from "@/components/admin/charts"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR, formatINR, greetingForHour } from "@/lib/format"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function AdminHomePage() {
  const { account, isManager, stats, series } = useAdmin()
  const data = useScopedAdminData()
  const hello = greetingForHour(new Date().getHours())
  const [range, setRange] = useState("6m")

  if (isManager) {
    return <ManagerHome hello={hello} name={account.name.split(" ")[0]} />
  }

  const chartData = range === "7d" || range === "30d" ? series.slice(-2) : series

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {hello}, {account.name} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across ScratchToLaunch.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">19 Sep 2026 · India</p>
      </div>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold">ScratchToLaunch Today</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Mini label="Active Projects" value={String(stats.activeProjects)} />
          <Mini label="Need Attention" value={String(stats.needAttention)} />
          <Mini label="Revenue Today" value={formatCompactINR(stats.revenueToday)} />
          <Mini label="Projects Completed" value={String(stats.completed)} />
          <Mini label="On-Time Delivery" value={`${stats.onTime}%`} />
        </div>
        <div className="mt-5">
          <p className="text-xs font-medium text-muted-foreground">What changed today?</p>
          <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-5">
            {data.attention.slice(0, 5).map((item) => (
              <li key={item.id} className="text-muted-foreground">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Total Projects" value={String(stats.totalProjects)} hint="All time" />
        <KpiCard label="Active Projects" value={String(stats.activeProjects)} hint="Currently in progress" />
        <KpiCard label="Revenue" value={formatCompactINR(stats.revenue)} hint="Recorded payments" />
        <KpiCard label="Customers" value={stats.customers.toLocaleString("en-IN")} hint="" />
        <KpiCard label="Providers" value={String(stats.providers)} hint={`${stats.providersActive} currently active`} />
        <KpiCard label="Delayed Projects" value={String(stats.delayed)} hint="Needs attention" tone="bad" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Needs Your Attention</h2>
          <Link href="/admin/notifications" className="text-sm text-primary hover:underline">
            Alert center
          </Link>
        </div>
        <AttentionList items={data.attention.slice(0, 5)} />
      </section>

      <section className="rounded-xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Business Overview</h2>
          <div className="flex gap-1">
            {[
              ["7d", "7 days"],
              ["30d", "30 days"],
              ["3m", "3 months"],
              ["6m", "6 months"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRange(id)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs",
                  range === id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <Tabs defaultValue="revenue" className="mt-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue">
            <RevenueAreaChart data={chartData} />
          </TabsContent>
          <TabsContent value="projects">
            <SimpleBarChart data={chartData} dataKey="projects" nameKey="month" />
          </TabsContent>
          <TabsContent value="customers">
            <SimpleBarChart data={chartData} dataKey="customers" nameKey="month" />
          </TabsContent>
          <TabsContent value="orders">
            <SimpleBarChart data={chartData} dataKey="completed" nameKey="month" />
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Location Performance</h2>
          <Link href="/admin/locations" className="text-sm text-primary hover:underline">
            All locations
          </Link>
        </div>
        <AdminTable columns={["Location", "Manager", "Projects", "Active", "Completed", "Revenue", "Delayed", ""]}>
          {data.locations.map((location) => {
            const manager = data.getManager(location.managerId)
            return (
              <tr key={location.id} className="hover:bg-muted/40">
                <Td className="font-medium">{location.name}</Td>
                <Td>{manager?.name}</Td>
                <Td className="tabular-nums">{location.totalProjects}</Td>
                <Td className="tabular-nums">{location.activeProjects}</Td>
                <Td className="tabular-nums">{location.completedProjects}</Td>
                <Td className="tabular-nums">{formatCompactINR(location.revenue)}</Td>
                <Td className={location.delayedProjects ? "tabular-nums text-red-700" : "tabular-nums"}>
                  {location.delayedProjects}
                </Td>
                <Td>
                  <Link href={`/admin/locations/${location.id}`} className="text-sm text-primary hover:underline">
                    View Location
                  </Link>
                </Td>
              </tr>
            )
          })}
        </AdminTable>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Operations Across India</h2>
        <IndiaOpsMap locations={data.locations} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Live projects</h2>
          <Link href="/admin/projects" className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
            Open board
          </Link>
        </div>
        <AdminTable columns={["Project", "Customer", "Location", "Status", "Value"]}>
          {data.projects.slice(0, 8).map((project) => (
            <tr key={project.id}>
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="font-medium hover:underline">
                  {project.name}
                </Link>
              </Td>
              <Td>{data.customers.find((item) => item.id === project.customerId)?.business}</Td>
              <Td>{data.getLocation(project.locationId)?.name}</Td>
              <Td>
                <ProjectStatusBadge status={project.status} />
              </Td>
              <Td className="tabular-nums">{project.value ? formatINR(project.value) : "—"}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function ManagerHome({ hello, name }: { hello: string; name: string }) {
  const { account } = useAdmin()
  const data = useScopedAdminData()
  const location = data.locations.find((item) => item.id === account.locationId) ?? data.locations[0]
  if (!location) return null
  const upcoming = [...data.projects]
    .filter((item) => item.status !== "completed")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 6)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {hello}, {name} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{location.name} Operations</p>
      </div>
      <section className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">You are responsible for:</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Mini label="projects" value={String(location.totalProjects)} />
          <Mini label="customers" value={String(location.customers)} />
          <Mini label="providers" value={String(location.providers)} />
          <Mini label="revenue" value={formatCompactINR(location.revenue)} />
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Needs Attention</h2>
        <AttentionList items={data.attention} />
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Your Projects</h2>
        <AdminTable columns={["Project", "Customer", "Status", "Deadline"]}>
          {data.projects.slice(0, 10).map((project) => (
            <tr key={project.id}>
              <Td>
                <Link href={`/admin/projects/${project.id}`} className="font-medium hover:underline">
                  {project.name}
                </Link>
              </Td>
              <Td>{data.customers.find((item) => item.id === project.customerId)?.business}</Td>
              <Td>
                <ProjectStatusBadge status={project.status} />
              </Td>
              <Td>{project.deadline.slice(5)}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Upcoming Deadlines</h2>
        <ul className="divide-y rounded-xl border bg-card">
          {upcoming.map((project) => (
            <li key={project.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <Link href={`/admin/projects/${project.id}`} className="font-medium hover:underline">
                {project.name}
              </Link>
              <span className="text-muted-foreground">{project.deadline}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Provider Performance</h2>
        <AdminTable columns={["Provider", "Active", "On-time", "Rating"]}>
          {data.providers
            .filter((item) => item.status === "active")
            .map((provider) => (
              <tr key={provider.id}>
                <Td>
                  <Link href={`/admin/providers/${provider.id}`} className="hover:underline">
                    {provider.name}
                  </Link>
                </Td>
                <Td>{provider.activeProjects}</Td>
                <Td>{provider.onTime}%</Td>
                <Td>{provider.rating.toFixed(1)}</Td>
              </tr>
            ))}
        </AdminTable>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Recent Activity</h2>
        <ul className="space-y-2 text-sm">
          {data.projects[0]?.activity.map((item) => (
            <li key={item.id} className="rounded-lg border bg-card px-4 py-3">
              <p>{item.text}</p>
              <p className="text-xs text-muted-foreground">{item.at}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
