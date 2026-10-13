"use client"

import { useEffect, useState } from "react"
import { ServiceCard } from "@/components/services/service-card"
import { fetchServices } from "@/lib/api/catalog"
import type { Service } from "@/lib/types"

export default function DashboardServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetchServices().then(setServices).catch(() => setServices([]))
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Services</h2>
        <p className="mt-1 text-sm text-muted-foreground">Live catalog. Book one to open a project.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  )
}
