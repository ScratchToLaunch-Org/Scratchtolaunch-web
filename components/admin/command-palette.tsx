"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useScopedAdminData } from "@/components/admin/admin-context"

type Hit = { href: string; title: string; group: string }

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const { projects, customers, providers, managers, locations } = useScopedAdminData()

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  const commands: Hit[] = useMemo(
    () => [
      { href: "/admin/projects", title: "Search projects", group: "Go" },
      { href: "/admin/customers", title: "Find customer", group: "Go" },
      { href: "/admin/providers", title: "Find provider", group: "Go" },
      { href: "/admin/projects", title: "Create project", group: "Go" },
      { href: "/admin/managers", title: "Add manager", group: "Go" },
      { href: "/admin/locations/pune", title: "View Pune", group: "Go" },
      { href: "/admin/locations/mumbai", title: "View Mumbai", group: "Go" },
      { href: "/admin/reports", title: "Generate report", group: "Go" },
      { href: "/admin/settings", title: "Open settings", group: "Go" },
      ...projects.map((item) => ({
        href: `/admin/projects/${item.id}`,
        title: `${item.name} · ${item.code}`,
        group: "Projects",
      })),
      ...customers.map((item) => ({
        href: `/admin/customers/${item.id}`,
        title: item.business,
        group: "Customers",
      })),
      ...providers.map((item) => ({
        href: `/admin/providers/${item.id}`,
        title: item.name,
        group: "Providers",
      })),
      ...managers.map((item) => ({
        href: `/admin/managers/${item.id}`,
        title: item.name,
        group: "Managers",
      })),
      ...locations.map((item) => ({
        href: `/admin/locations/${item.id}`,
        title: item.name,
        group: "Locations",
      })),
    ],
    [customers, locations, managers, projects, providers]
  )

  const filtered = commands.filter((item) =>
    `${item.title} ${item.group}`.toLowerCase().includes(query.toLowerCase())
  )
  const grouped = filtered.slice(0, 24).reduce<Record<string, Hit[]>>((acc, item) => {
    acc[item.group] = acc[item.group] ? [...acc[item.group], item] : [item]
    return acc
  }, {})

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-lg translate-y-0 p-0 sm:max-w-lg" showCloseButton={false}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search customers, projects, providers..."
          className="h-12 rounded-none border-0 border-b focus-visible:ring-0"
        />
        <div className="max-h-80 overflow-y-auto p-2">
          {Object.keys(grouped).length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No matches.</p>
          ) : (
            Object.entries(grouped).map(([group, hits]) => (
              <div key={group} className="mb-2">
                <p className="px-2 py-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  {group}
                </p>
                {hits.map((hit) => (
                  <button
                    key={hit.href + hit.title}
                    type="button"
                    className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      onOpenChange(false)
                      setQuery("")
                      router.push(hit.href)
                    }}
                  >
                    {hit.title}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
