import { AdminProvider } from "@/components/admin/admin-context"
import { AdminShell } from "@/components/admin/admin-shell"

export const metadata = {
  title: "Admin",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  )
}
