"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { HealthBadge, ProjectStatusBadge } from "@/components/admin/status-badges"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR, formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"

export default function AdminProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const { loading } = useAdmin()
  const { getCustomer, getLocation, getManager, getProject, getProvider, getService } = useScopedAdminData()
  const project = getProject(params.id)
  const [note, setNote] = useState("")
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!project) notFound()

  const customer = getCustomer(project.customerId)
  const provider = project.providerId ? getProvider(project.providerId) : null
  const manager = getManager(project.managerId)
  const location = getLocation(project.locationId)
  const service = getService(project.serviceId)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/locations", label: "Locations" },
          { href: `/admin/locations/${location?.id}`, label: location?.name ?? "Location" },
          { href: "/admin/projects", label: "Projects" },
          { label: customer?.business ?? "Project" },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {customer?.business} — {project.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <ProjectStatusBadge status={project.status} />
            <span className="text-muted-foreground">{project.code}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-9" onClick={() => toast.message("Reassignment queued (mock)")}>
            Reassign
          </Button>
          <Button className="h-9" onClick={() => toast.success("Status updated (mock)")}>
            Update status
          </Button>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Meta label="Location" value={location?.name} href={`/admin/locations/${location?.id}`} />
        <Meta label="Manager" value={manager?.name} href={`/admin/managers/${manager?.id}`} />
        <Meta label="Customer" value={customer?.business} href={`/admin/customers/${customer?.id}`} />
        <Meta label="Provider" value={provider?.name ?? "Unassigned"} href={provider ? `/admin/providers/${provider.id}` : undefined} />
        <Meta label="Value" value={project.value ? formatINR(project.value) : "Quotation"} />
      </dl>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Project timeline</h2>
          <ol className="mt-5 space-y-0">
            {project.timeline.map((stage, index) => (
              <li key={stage.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "grid size-2.5 rounded-full",
                      stage.status === "done" && "bg-emerald-500",
                      stage.status === "current" && "bg-primary",
                      stage.status === "upcoming" && "bg-border"
                    )}
                  />
                  {index < project.timeline.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium">{stage.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {stage.date ? formatShortDate(stage.date) : "Upcoming"} · {stage.owner} · {stage.status}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stage.notes}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-4">
          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Project Health</h2>
            <div className="mt-3">
              <HealthBadge health={project.health} />
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums">{project.progress}%</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Deadline {formatShortDate(project.deadline)}</p>
            <p className="text-sm">
              {project.daysRemaining >= 0
                ? `${project.daysRemaining} days remaining`
                : `${Math.abs(project.daysRemaining)} days overdue`}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{service?.name} · {project.priority} priority</p>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Assigned Provider</h2>
            {provider ? (
              <>
                <p className="mt-2 text-lg font-medium">{provider.contactName}</p>
                <p className="text-sm text-muted-foreground">
                  {provider.name} · {provider.category}
                </p>
                <p className="mt-2 text-sm">★ {provider.rating.toFixed(1)} · {provider.completedProjects} completed · {provider.activeProjects} active</p>
                <p className="text-xs text-muted-foreground">Response time {provider.responseTime}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href={`/admin/providers/${provider.id}`} className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
                    View Provider
                  </Link>
                  <Button variant="ghost" className="h-8" onClick={() => toast.message("Message sent (mock)")}>
                    Message Provider
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No provider assigned yet.</p>
            )}
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Customer</h2>
            <p className="mt-2 text-lg font-medium">{customer?.business}</p>
            <p className="text-sm text-muted-foreground">{location?.name}</p>
            <p className="mt-2 text-sm">{customer?.activeProjects} active · spent {formatINR(customer?.spend ?? 0)}</p>
            <p className="text-xs text-muted-foreground">Customer since {customer?.joined}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/admin/customers/${customer?.id}`} className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
                View Customer
              </Link>
              <Button variant="ghost" className="h-8" onClick={() => toast.message("Message sent (mock)")}>
                Message Customer
              </Button>
            </div>
          </section>
        </div>
      </div>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Activity</h2>
        <ul className="mt-4 space-y-3">
          {project.activity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-semibold">
                {item.actorInitials}
              </span>
              <div>
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.at}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Project Files</h2>
        <ul className="mt-3 divide-y">
          {project.files.map((file) => (
            <li key={file.name} className="flex items-center justify-between py-2 text-sm">
              <span>
                {file.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  {file.type} · {file.size}
                </span>
              </span>
              <span className="flex gap-3 text-xs">
                <button type="button" className="text-primary" onClick={() => toast.message("Preview (mock)")}>
                  View
                </button>
                <button type="button" className="text-primary" onClick={() => toast.message("Download (mock)")}>
                  Download
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Communication</h2>
        <Tabs defaultValue="internal" className="mt-4">
          <TabsList>
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <p className="text-sm text-muted-foreground">Customer asked whether WhatsApp can sit on every page.</p>
          </TabsContent>
          <TabsContent value="provider">
            <p className="text-sm text-muted-foreground">Provider confirmed homepage v2 is in files.</p>
          </TabsContent>
          <TabsContent value="internal">
            <div className="space-y-3">
              {project.internalNotes.map((item) => (
                <blockquote key={item.at} className="rounded-lg bg-muted/60 px-3 py-2 text-sm">
                  “{item.body}”
                  <footer className="mt-1 text-xs text-muted-foreground">
                    {item.author} · {item.at}
                  </footer>
                </blockquote>
              ))}
              <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note..." />
              <Button
                className="h-9"
                onClick={() => {
                  toast.success("Note added (mock)")
                  setNote("")
                }}
              >
                + Add Internal Note
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function Meta({
  label,
  value,
  href,
}: {
  label: string
  value?: string
  href?: string
}) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium">
        {href ? (
          <Link href={href} className="hover:underline">
            {value}
          </Link>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}
