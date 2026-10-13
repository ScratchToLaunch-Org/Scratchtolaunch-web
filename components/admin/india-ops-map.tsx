import Link from "next/link"
import type { AdminLocation } from "@/lib/admin/types"

export function IndiaOpsMap({ locations }: { locations: AdminLocation[] }) {
  const positions: Record<string, string> = {
    mumbai: "left-[18%] top-[48%]",
    pune: "left-[28%] top-[54%]",
    nashik: "left-[26%] top-[42%]",
    nagpur: "left-[48%] top-[46%]",
    "chhatrapati-sambhajinagar": "left-[34%] top-[50%]",
    kolhapur: "left-[24%] top-[66%]",
  }

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.5_0.21_264/0.06),transparent_55%)]" />
      <div className="relative hidden min-h-[280px] md:block">
        <svg viewBox="0 0 200 240" className="mx-auto h-[280px] w-auto text-muted-foreground/25">
          <path
            fill="currentColor"
            d="M92 18c18 2 38 10 52 28 10 14 22 20 28 38 4 14-2 30-8 42-8 16-6 28 4 40 6 8 2 22-10 28-16 8-30 6-40 18-8 10-24 16-38 12-18-4-22-20-34-28-14-10-24-8-32-22-8-14 0-28 6-40C28 86 22 70 28 54c8-20 28-28 48-32l16-4z"
          />
        </svg>
        {locations.map((location) => (
          <Link
            key={location.id}
            href={`/admin/locations/${location.id}`}
            className={`absolute min-w-28 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background/95 px-2.5 py-1.5 shadow-sm ${positions[location.id] ?? "left-1/2 top-1/2"}`}
          >
            <p className="text-xs font-medium">{location.name.replace("Chhatrapati ", "C. ")}</p>
            <p className="text-[11px] text-muted-foreground">{location.totalProjects} projects</p>
          </Link>
        ))}
      </div>
      <div className="grid gap-2 p-4 md:hidden">
        {locations.map((location) => (
          <Link
            key={location.id}
            href={`/admin/locations/${location.id}`}
            className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
          >
            <span>{location.name}</span>
            <span className="text-muted-foreground">{location.totalProjects} projects</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
