"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ApiError, api, apiList } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type CatalogService = { id: string; name: string }

export default function NewServicePage() {
  const { user } = useAuth()
  const [catalog, setCatalog] = useState<CatalogService[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    apiList<CatalogService>("/services?limit=100").then(setCatalog)
  }, [])

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="text-2xl font-semibold">Create a service</h2>
      <form
        className="mt-6 space-y-4 rounded-xl border bg-card p-5"
        onSubmit={async (event) => {
          event.preventDefault()
          if (!user?.providerId) return
          const data = new FormData(event.currentTarget)
          const days = Number(String(data.get("delivery") ?? "").replace(/[^0-9]/g, ""))
          try {
            await api(`/providers/${user.providerId}/services`, {
              method: "POST",
              body: JSON.stringify({
                serviceId: String(data.get("serviceId")),
                title: String(data.get("title")),
                description: String(data.get("description")),
                price: Number(data.get("price")),
                ...(Number.isFinite(days) && days > 0 ? { deliveryDays: days } : {}),
              }),
            })
            setSaved(true)
            toast.success("Listing saved")
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not save the listing")
          }
        }}
      >
        <Field label="Service title" htmlFor="title">
          <Input id="title" name="title" className="h-11" required placeholder="Business website" />
        </Field>
        <Field label="Catalog service" htmlFor="serviceId">
          <select id="serviceId" name="serviceId" className="h-11 w-full rounded-lg border bg-background px-3 text-sm" required>
            {catalog.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Description" htmlFor="description">
          <Textarea id="description" name="description" required />
        </Field>
        <Field label="Price (₹)" htmlFor="price">
          <Input id="price" name="price" className="h-11" inputMode="numeric" required />
        </Field>
        <Field label="Delivery days" htmlFor="delivery">
          <Input id="delivery" name="delivery" className="h-11" placeholder="7" />
        </Field>
        <Button type="submit" className="h-11 w-full" disabled={saved}>{saved ? "Saved" : "Publish listing"}</Button>
      </form>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
