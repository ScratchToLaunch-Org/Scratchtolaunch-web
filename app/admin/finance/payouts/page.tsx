"use client"

import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR } from "@/lib/format"

export default function PayoutsPage() {
  const { payouts } = useAdmin()
  const { getProvider } = useScopedAdminData()
  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/finance", label: "Finance" },
          { label: "Payouts" },
        ]}
      />
      <h1 className="text-2xl font-semibold">Payouts</h1>
      <AdminTable columns={["Date", "Provider", "Amount", "Status"]}>
        {payouts.map((item) => (
          <tr key={item.id}>
            <Td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "—"}</Td>
            <Td>{item.providerId ? getProvider(item.providerId)?.name : "—"}</Td>
            <Td>{formatINR(item.amount)}</Td>
            <Td className="capitalize">{item.status}</Td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
