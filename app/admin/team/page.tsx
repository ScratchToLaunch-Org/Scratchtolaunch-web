"use client"

import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { AdminTable, Td } from "@/components/admin/admin-table"
import { permissionMatrix } from "@/lib/admin/data"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"

const roleLabel: Record<string, string> = {
  owner: "Owner",
  admin: "Super Admin",
  operations: "Operations Manager",
  manager: "Location Manager",
  finance: "Finance",
  support: "Support",
}

export default function TeamPage() {
  const { team: adminTeam } = useAdmin()
  const { getLocation } = useScopedAdminData()
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Team" }]} />
      <h1 className="text-2xl font-semibold">Team</h1>
      <AdminTable columns={["Name", "Role", "Location", "Status", "Last active", "Permissions"]}>
        {adminTeam.map((member) => (
          <tr key={member.id}>
            <Td className="font-medium">{member.name}</Td>
            <Td>{roleLabel[member.role]}</Td>
            <Td>{member.locationId ? getLocation(member.locationId)?.name : "All"}</Td>
            <Td className="capitalize">{member.status}</Td>
            <Td>{member.lastActive}</Td>
            <Td className="text-xs text-muted-foreground">{member.permissions.join(", ")}</Td>
          </tr>
        ))}
      </AdminTable>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Permission matrix</h2>
        <p className="mb-3 text-sm text-muted-foreground">Roles are enforced by the API. This matrix is the product map.</p>
        <AdminTable columns={["Permission", "Owner", "Admin", "Manager"]}>
          {permissionMatrix.map((row) => (
            <tr key={row.permission}>
              <Td>{row.permission}</Td>
              <Td>{row.owner}</Td>
              <Td>{row.admin}</Td>
              <Td>{row.manager}</Td>
            </tr>
          ))}
        </AdminTable>
      </section>
    </div>
  )
}
