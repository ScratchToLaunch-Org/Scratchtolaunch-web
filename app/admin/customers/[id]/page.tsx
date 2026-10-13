"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { KpiCard } from "@/components/admin/kpi-card"
import { ProjectStatusBadge } from "@/components/admin/status-badges"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR } from "@/lib/format"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { projects: adminProjects, getCustomer, getLocation, getProvider } = useScopedAdminData()
  const customer = getCustomer(params.id)
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!customer) notFound()
  const location = getLocation(customer.locationId)
  const projects = adminProjects.filter((item) => item.customerId === customer.id)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/customers", label: "Customers" },
          { label: customer.business },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold">{customer.business}</h1>
        <p className="text-sm text-muted-foreground">{customer.contact} · {location?.name}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Customer lifetime value" value={formatINR(customer.spend)} />
        <KpiCard label="Active projects" value={String(customer.activeProjects)} />
        <KpiCard label="Customer since" value={customer.joined} />
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="rounded-xl border bg-card p-5 text-sm">
          <p>Contact: {customer.email} · {customer.phone}</p>
          <p className="mt-2">Type: {customer.type}</p>
          <p className="mt-2">Location: {location?.name}</p>
        </TabsContent>
        <TabsContent value="projects">
          <AdminTable columns={["Project", "Provider", "Status", "Value"]}>
            {projects.map((project) => (
              <tr key={project.id}>
                <Td>
                  <Link href={`/admin/projects/${project.id}`} className="hover:underline">
                    {project.name}
                  </Link>
                </Td>
                <Td>{getProvider(project.providerId ?? "")?.name ?? "—"}</Td>
                <Td>
                  <ProjectStatusBadge status={project.status} />
                </Td>
                <Td>{project.value ? formatINR(project.value) : "—"}</Td>
              </tr>
            ))}
          </AdminTable>
        </TabsContent>
        <TabsContent value="payments" className="text-sm text-muted-foreground">
          Lifetime spend {formatINR(customer.spend)}. Individual invoices appear here when payments go live.
        </TabsContent>
        <TabsContent value="documents" className="text-sm text-muted-foreground">
          GST certificate, agreements and brand files will attach to the customer record.
        </TabsContent>
        <TabsContent value="activity" className="text-sm text-muted-foreground">
          Joined {customer.joined}. Last project update is on the live project timeline.
        </TabsContent>
      </Tabs>
    </div>
  )
}
