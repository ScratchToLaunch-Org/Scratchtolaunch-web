"use client"

import { toast } from "sonner"
import { api } from "@/lib/api/client"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { useAdmin } from "@/components/admin/admin-context"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const { account } = useAdmin()

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Profile" }]} />
      <div className="flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {account.initials}
        </span>
        <div>
          <h1 className="text-2xl font-semibold">{account.name}</h1>
          <p className="text-sm text-muted-foreground">{account.title}</p>
        </div>
      </div>
      <section className="rounded-xl border bg-card p-5 text-sm">
        <p>Email: {account.email}</p>
        <p className="mt-2">Role: {account.title}</p>
      </section>
      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Security</h2>
        <p className="mt-2 text-sm text-muted-foreground">Signed in on this browser.</p>
        <Button
          variant="outline"
          className="mt-3 h-9"
          onClick={() =>
            api("/auth/forgot-password", { method: "POST", auth: false, body: JSON.stringify({ email: account.email }) })
              .then(() => toast.success("Password reset email sent"))
              .catch(() => toast.error("Could not send the reset email"))
          }
        >
          Reset password
        </Button>
      </section>
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="font-semibold">Notification preferences</h2>
        <div className="flex items-center justify-between text-sm">
          Delayed projects
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between text-sm">
          Daily digest
          <Switch defaultChecked />
        </div>
      </section>
    </div>
  )
}
