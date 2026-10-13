"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ProviderProfileSettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [profession, setProfession] = useState("")
  const [about, setAbout] = useState("")

  useEffect(() => {
    if (!user?.providerId) return
    api<{ businessName?: string; name?: string; profession?: string; bio?: string; about?: string }>(`/providers/${user.providerId}`).then((row) => {
      setName(row.name || row.businessName || "")
      setProfession(row.profession || "")
      setAbout(row.about || row.bio || "")
    })
  }, [user?.providerId])

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <form
        className="space-y-4 rounded-xl border bg-card p-5"
        onSubmit={async (event) => {
          event.preventDefault()
          if (!user?.providerId) return
          try {
            await api(`/providers/${user.providerId}`, {
              method: "PATCH",
              body: JSON.stringify({ businessName: name, profession, bio: about }),
            })
            toast.success("Profile updated")
          } catch (reason) {
            toast.error(reason instanceof ApiError ? reason.message : "Could not update the profile")
          }
        }}
      >
        <Field label="Studio name" htmlFor="name">
          <Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="h-11" />
        </Field>
        <Field label="Profession" htmlFor="profession">
          <Input id="profession" value={profession} onChange={(event) => setProfession(event.target.value)} className="h-11" />
        </Field>
        <Field label="About" htmlFor="about">
          <Textarea id="about" value={about} onChange={(event) => setAbout(event.target.value)} />
        </Field>
        <Button type="submit" className="h-10">Save profile</Button>
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
