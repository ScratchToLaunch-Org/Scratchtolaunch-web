"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { useScopedAdminData } from "@/components/admin/admin-context"
import { formatINR } from "@/lib/format"
import { Input } from "@/components/ui/input"

export default function CustomersPage() {
  const { customers, locations: adminLocations } = useScopedAdminData()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const filtered = useMemo(
    () =>
      customers.filter((item) => {
        const hay = `${item.business} ${item.name}`.toLowerCase()
        return hay.includes(query.toLowerCase()) && (status === "all" || item.status === status)
      }),
    [customers, query, status]
  )

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Customers" }]} />
      <h1 className="text-2xl font-semibold">Customers</h1>
      <div className="flex flex-wrap gap-2">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers..." className="h-9 w-64" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 rounded-lg border bg-background px-2 text-sm">
          <option value="all">Active / Inactive</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <AdminTable columns={["Name", "Business", "Location", "Projects", "Total spend", "Joined", "Status"]}>
        {filtered.map((customer) => (
          <tr key={customer.id}>
            <Td>
              <Link href={`/admin/customers/${customer.id}`} className="font-medium hover:underline">
                {customer.name}
              </Link>
            </Td>
            <Td>{customer.business}</Td>
            <Td>{adminLocations.find((item) => item.id === customer.locationId)?.name}</Td>
            <Td>{customer.activeProjects}</Td>
            <Td>{formatINR(customer.spend)}</Td>
            <Td>{customer.joined}</Td>
            <Td className="capitalize">{customer.status}</Td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
