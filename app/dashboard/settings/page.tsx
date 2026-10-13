"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { user } = useAuth()
  const [business, setBusiness] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    setBusiness(user?.customer?.businessName ?? "")
    setEmail(user?.customer?.email ?? user?.email ?? "")
    setPhone(user?.customer?.phone ?? user?.phone ?? "")
  }, [user])

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <form
        className="space-y-4 rounded-xl border bg-card p-5"
        onSubmit={async (event) => {
          event.preventDefault()
          if (!user?.customerId) return
          try {
            await api(`/customers/${user.customerId}`, {
              method: "PATCH",
              body: JSON.stringify({ businessName: business, email, phone }),
            })
            toast.success("Settings saved")
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not save settings")
          }
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="business">Business name</Label>
          <Input id="business" value={business} onChange={(event) => setBusiness(event.target.value)} className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} className="h-11" />
        </div>
        <Button type="submit" className="h-10">Save changes</Button>
      </form>
    </div>
  )
}
