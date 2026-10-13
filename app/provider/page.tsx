"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { formatINR } from "@/lib/format"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  title?: string
  name?: string
  status: string
  deadline?: string | null
  value?: number
  customer?: { businessName?: string }
  service?: { name?: string }
}

type Dashboard = {
  activeProjects: Project[]
  newLeads: Project[]
  completedProjects: Project[]
  earnings: { paid: number; pending: number }
}

export default function ProviderHomePage() {
  const { user } = useAuth()
  const [data, setData] = useState<Dashboard | null>(null)

  useEffect(() => {
    api<Dashboard>("/provider/dashboard").then(setData).catch(() => setData(null))
  }, [])

  const orders = data?.activeProjects ?? []

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, {user?.firstName}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{user?.provider?.businessName}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active projects" value={String(orders.length)} />
        <Stat label="New leads" value={String(data?.newLeads.length ?? 0)} />
        <Stat label="Completed projects" value={String(data?.completedProjects.length ?? 0)} />
        <Stat label="Earnings" value={formatINR(data?.earnings.paid ?? 0)} />
      </div>
      <section className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Active orders</h3>
          <Link href="/provider/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <ul className="mt-4 divide-y">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <div>
                <p className="font-medium">{order.customer?.businessName ?? order.name ?? order.title}</p>
                <p className="text-muted-foreground">{order.service?.name}</p>
              </div>
              <p className="text-muted-foreground">{order.status}</p>
            </li>
          ))}
        </ul>
      </section>
      <Link href="/provider/services/new" className={cn(buttonVariants({ size: "xl" }))}>
        Create a service
      </Link>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}
