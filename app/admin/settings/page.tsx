"use client"

import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SITE } from "@/lib/constants"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Settings" }]} />
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Section title="Company">
        <Field label="Company name" htmlFor="company">
          <Input id="company" className="h-10" defaultValue={SITE.name} />
        </Field>
        <Field label="Contact" htmlFor="contact">
          <Input id="contact" className="h-10" defaultValue="ops@scratchtolaunch.in" />
        </Field>
      </Section>
      <Section title="Locations">
        <p className="text-sm text-muted-foreground">
          Manage cities from the locations directory. New cities inherit Pune as the template ops setup.
        </p>
      </Section>
      <Section title="Users & Roles">
        <p className="text-sm text-muted-foreground">
          Permissions follow the signed-in role. Owners and super admins can change platform settings.
        </p>
      </Section>
      <Section title="Notifications">
        <Toggle label="Email notifications" hint="Digest of delayed projects" />
        <Toggle label="Project alerts" hint="Status and deadline changes" />
        <Toggle label="Payment alerts" hint="Failed and pending collections" />
      </Section>
      <Section title="Platform">
        <Field label="Currency" htmlFor="currency">
          <Input id="currency" className="h-10" defaultValue="INR" />
        </Field>
        <Field label="Timezone" htmlFor="tz">
          <Input id="tz" className="h-10" defaultValue="Asia/Kolkata" />
        </Field>
        <Field label="Default project duration" htmlFor="days">
          <Input id="days" className="h-10" defaultValue="14 days" />
        </Field>
      </Section>
      <Button
        className="h-10"
        onClick={async () => {
          const value = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value
          try {
            await api("/settings", {
              method: "PUT",
              body: JSON.stringify({
                companyName: value("company"),
                contact: value("contact"),
                currency: value("currency"),
                timezone: value("tz"),
                defaultDuration: value("days"),
              }),
            })
            toast.success("Settings saved")
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not save settings")
          }
        }}
      >
        Save settings
      </Button>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-5">
      <h2 className="font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function Toggle({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch defaultChecked />
    </div>
  )
}
