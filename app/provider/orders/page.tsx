"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { formatINR } from "@/lib/format"
import { StatusPill } from "@/components/status-pill"

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Project[]>([])

  useEffect(() => {
    api<{ activeProjects: Project[]; completedProjects: Project[] }>("/provider/dashboard").then((data) => {
      setOrders([...(data.activeProjects ?? []), ...(data.completedProjects ?? [])])
    })
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3">{order.customer?.businessName ?? "Customer"}</td>
                <td className="px-4 py-3">{order.service?.name ?? order.title ?? order.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{order.deadline ? new Date(order.deadline).toLocaleDateString("en-IN") : "—"}</td>
                <td className="px-4 py-3">{order.value ? formatINR(order.value) : "—"}</td>
                <td className="px-4 py-3">
                  <StatusPill status={order.status === "COMPLETED" ? "done" : "in-progress"} label={order.status.replaceAll("_", " ")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
