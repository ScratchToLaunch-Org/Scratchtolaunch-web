"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatCompactINR } from "@/lib/format"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ManagersPage() {
  const { canManageOrg } = useAdmin()
  const { managers: adminManagers, getLocation } = useScopedAdminData()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Managers" }]} />
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Location Managers</h1>
        {canManageOrg ? (
          <Button className="h-9" onClick={() => setOpen(true)}>
            + Add Manager
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {adminManagers.map((manager) => {
          const location = getLocation(manager.locationIds[0] ?? "")
          return (
            <article key={manager.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold">{manager.name}</h2>
                  <p className="text-sm text-muted-foreground">{location?.name} Manager</p>
                </div>
                <span className="text-xs text-emerald-700">Active</span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Projects</dt>
                  <dd>{location?.totalProjects}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Customers</dt>
                  <dd>{location?.customers}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Revenue</dt>
                  <dd>{location ? formatCompactINR(location.revenue) : "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Performance</dt>
                  <dd>{manager.performance}%</dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/managers/${manager.id}`} className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
                  View
                </Link>
                <Button variant="ghost" className="h-8" onClick={() => toast.message("Edit (mock)")}>
                  Edit
                </Button>
              </div>
            </article>
          )
        })}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Manager</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              toast.success("Manager invited (mock)")
              setOpen(false)
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="mname">Name</Label>
              <Input id="mname" className="h-10" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="memail">Email</Label>
              <Input id="memail" type="email" className="h-10" required />
            </div>
            <Button type="submit" className="h-10 w-full">
              Send invite
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
