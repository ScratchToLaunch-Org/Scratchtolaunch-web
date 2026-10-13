"use client"

import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { useAdmin } from "@/components/admin/admin-context"
import { formatINR } from "@/lib/format"

export default function PaymentsPage() {
  const { payments } = useAdmin()
  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { href: "/admin", label: "ScratchToLaunch" },
          { href: "/admin/finance", label: "Finance" },
          { label: "Payments" },
        ]}
      />
      <h1 className="text-2xl font-semibold">Payments</h1>
      <AdminTable columns={["Date", "Customer", "Amount", "Status"]}>
        {payments.map((item) => (
          <tr key={item.id}>
            <Td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "—"}</Td>
            <Td>{item.type}</Td>
            <Td>{formatINR(item.amount)}</Td>
            <Td className="capitalize">{item.status}</Td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
