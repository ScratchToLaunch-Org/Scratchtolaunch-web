"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { formatINR } from "@/lib/format"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Listing = { id: string; title: string; price: number; deliveryDays?: number | null; service?: { slug: string } }

export default function ProviderServicesPage() {
  const { user } = useAuth()
  const [listed, setListed] = useState<Listing[]>([])

  useEffect(() => {
    if (!user?.providerId) return
    api<{ services?: Listing[] }>(`/providers/${user.providerId}`).then((row) => setListed(row.services ?? []))
  }, [user?.providerId])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Your services</h2>
        <Link href="/provider/services/new" className={cn(buttonVariants(), "h-10")}>New listing</Link>
      </div>
      <div className="space-y-3">
        {listed.map((service) => (
          <article key={service.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
            <div>
              <p className="font-semibold">{service.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatINR(service.price)}{service.deliveryDays ? ` · ${service.deliveryDays} days` : ""}
              </p>
            </div>
            {service.service?.slug ? (
              <Link href={`/services/${service.service.slug}`} className={cn(buttonVariants({ variant: "outline" }), "h-9")}>View</Link>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
