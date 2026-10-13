"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useScopedAdminData } from "@/components/admin/admin-context"

export default function NewLocationPage() {
  const router = useRouter()
  const { managers: adminManagers } = useScopedAdminData()
  const [saved, setSaved] = useState(false)

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/locations", label: "Locations" },
          { label: "New" },
        ]}
      />
      <h1 className="text-2xl font-semibold">Add location</h1>
      <form
        className="space-y-4 rounded-xl border bg-card p-5"
        onSubmit={async (event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const city = String(data.get("city") ?? "")
          try {
            await api("/locations", {
              method: "POST",
              body: JSON.stringify({
                name: String(data.get("name") ?? ""),
                city,
                state: String(data.get("state") ?? "Maharashtra"),
                code: city.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase() || "LOC",
                status: String(data.get("status")) === "inactive" ? "INACTIVE" : "ACTIVE",
                phone: String(data.get("phone") ?? "") || undefined,
                email: String(data.get("email") ?? "") || undefined,
                description: String(data.get("description") ?? "") || undefined,
              }),
            })
            setSaved(true)
            toast.success("Location created")
            router.push("/admin/locations")
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not create the location")
          }
        }}
      >
        <Field label="Location name" htmlFor="name">
          <Input id="name" name="name" className="h-10" required />
        </Field>
        <Field label="City" htmlFor="city">
          <Input id="city" name="city" className="h-10" required />
        </Field>
        <Field label="State" htmlFor="state">
          <Input id="state" name="state" className="h-10" defaultValue="Maharashtra" />
        </Field>
        <Field label="Manager" htmlFor="manager">
          <select id="manager" name="manager" className="h-10 w-full rounded-lg border bg-transparent px-2 text-sm">
            {adminManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" className="h-10" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" className="h-10" />
        </Field>
        <Field label="Status" htmlFor="status">
          <select id="status" name="status" className="h-10 w-full rounded-lg border bg-transparent px-2 text-sm">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </Field>
        <Field label="Description" htmlFor="description">
          <Textarea id="description" name="description" />
        </Field>
        <Button type="submit" className="h-10" disabled={saved}>
          Create Location
        </Button>
      </form>
    </div>
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
