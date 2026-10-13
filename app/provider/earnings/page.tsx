"use client"

import { useEffect, useState } from "react"
import { api, apiList } from "@/lib/api/client"
import { formatINR } from "@/lib/format"

type Payout = { id: string; amount: number; status: string; createdAt: string }

export default function EarningsPage() {
  const [paid, setPaid] = useState(0)
  const [pending, setPending] = useState(0)
  const [payouts, setPayouts] = useState<Payout[]>([])

  useEffect(() => {
    api<{ earnings: { paid: number; pending: number } }>("/provider/dashboard").then((data) => {
      setPaid(data.earnings.paid)
      setPending(data.earnings.pending)
    })
    apiList<Payout>("/payouts?limit=50").then(setPayouts).catch(() => setPayouts([]))
  }, [])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold">Earnings</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Released</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums">{formatINR(paid)}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums">{formatINR(pending)}</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Payout</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-t">
                <td className="px-4 py-3">{new Date(payout.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">{formatINR(payout.amount)}</td>
                <td className="px-4 py-3 text-muted-foreground">{payout.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
