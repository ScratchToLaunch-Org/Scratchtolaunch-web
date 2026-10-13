"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { apiList } from "@/lib/api/client"
import { formatINR } from "@/lib/format"
import { StatusPill } from "@/components/status-pill"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Payment = {
  id: string
  amount: number
  status: string
  createdAt: string
  order?: { orderNumber?: string; service?: { name?: string } }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    apiList<Payment>("/payments?limit=50").then(setPayments).catch(() => setPayments([]))
  }, [])

  const paid = payments.filter((item) => item.status === "SUCCEEDED" || item.status === "PAID").reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Payments</h2>
          <p className="mt-1 text-sm text-muted-foreground">Paid so far {formatINR(paid)}</p>
        </div>
        <Link href="/services" className={cn(buttonVariants(), "h-10")}>
          Book a service
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">{item.order?.service?.name ?? item.order?.orderNumber ?? "Payment"}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(item.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3 font-medium">{formatINR(item.amount)}</td>
                <td className="px-4 py-3">
                  <StatusPill status={item.status === "SUCCEEDED" || item.status === "PAID" ? "paid" : "due"} label={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
