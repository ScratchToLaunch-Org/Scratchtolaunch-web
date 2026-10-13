"use client"

import Link from "next/link"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { useScopedAdminData } from "@/components/admin/admin-context"
import { cn } from "@/lib/utils"

const tones = {
  critical: "bg-red-50 text-red-800",
  warning: "bg-amber-50 text-amber-800",
  info: "bg-sky-50 text-sky-800",
  success: "bg-emerald-50 text-emerald-800",
}

export default function NotificationsPage() {
  const { notifications, attention } = useScopedAdminData()

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Notifications" }]} />
      <h1 className="text-2xl font-semibold">Alert center</h1>
      <ul className="space-y-2">
        {notifications.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn("flex items-center justify-between rounded-xl border px-4 py-3 text-sm", tones[item.level])}
            >
              <span>{item.title}</span>
              <span className="text-xs opacity-70">{item.time}</span>
            </Link>
          </li>
        ))}
      </ul>
      <section>
        <h2 className="mb-3 font-semibold">Needs attention</h2>
        <ul className="divide-y rounded-xl border bg-card">
          {attention.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{item.title}</span>
              <Link href={item.href} className="text-primary hover:underline">
                {item.cta}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
