"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ApiError, api } from "@/lib/api/client"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { Button } from "@/components/ui/button"

const reports = [
  { label: "Revenue Report", path: "/admin/reports/revenue" },
  { label: "Location Performance", path: "/admin/reports/locations" },
  { label: "Provider Performance", path: "/admin/reports/providers" },
  { label: "Project Delivery", path: "/admin/reports/projects" },
]

export default function ReportsPage() {
  const [range, setRange] = useState("30")
  const [selected, setSelected] = useState(reports[0].path)

  async function generate(download: boolean) {
    const report = reports.find((item) => item.path === selected) ?? reports[0]
    try {
      const data = await api<unknown>(`${report.path}?dateFrom=${new Date(Date.now() - Number(range) * 86400000).toISOString()}`)
      if (download) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${report.label.replaceAll(" ", "-").toLowerCase()}.json`
        link.click()
        URL.revokeObjectURL(url)
      }
      toast.success(`${report.label} ready`)
    } catch (reason) {
      toast.error(reason instanceof ApiError ? reason.message : "Could not generate the report")
    }
  }

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/admin", label: "ScratchToLaunch" }, { label: "Reports" }]} />
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="flex flex-wrap gap-2">
        <select value={range} onChange={(event) => setRange(event.target.value)} className="h-9 rounded-lg border bg-background px-2 text-sm">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
        <Button className="h-9" onClick={() => generate(false)}>
          Generate Report
        </Button>
        <Button variant="outline" className="h-9" onClick={() => generate(true)}>
          Export
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {reports.map((report) => (
          <button
            key={report.path}
            type="button"
            onClick={() => setSelected(report.path)}
            className={`rounded-xl border bg-card p-5 text-left ${selected === report.path ? "ring-2 ring-primary/30" : ""}`}
          >
            <p className="font-semibold">{report.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">Last {range} days · live data</p>
          </button>
        ))}
      </div>
    </div>
  )
}
