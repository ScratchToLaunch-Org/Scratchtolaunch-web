"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  Bell,
  Building2,
  ChartColumn,
  CreditCard,
  FolderKanban,
  Landmark,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  Settings,
  Shield,
  Users,
  Wallet,
  Wrench,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommandPalette } from "@/components/admin/command-palette"
import { useAdmin, useScopedAdminData } from "@/components/admin/admin-context"
import { RequireAuth, useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

const nav = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/providers", label: "Providers", icon: Shield },
      { href: "/admin/services", label: "Services", icon: Wrench },
    ],
  },
  {
    label: "Organization",
    items: [
      { href: "/admin/locations", label: "Locations", icon: MapPin, org: true },
      { href: "/admin/managers", label: "Managers", icon: Building2, org: true },
      { href: "/admin/team", label: "Team", icon: Users, org: true },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin/finance", label: "Revenue", icon: Landmark },
      { href: "/admin/finance/payments", label: "Payments", icon: CreditCard },
      { href: "/admin/finance/payouts", label: "Payouts", icon: Wallet },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: ChartColumn },
      { href: "/admin/reports", label: "Reports", icon: ChartColumn },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
]

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { account, isManager, canManageOrg, locationFilter, setLocationFilter } = useAdmin()
  const { locations, notifications } = useScopedAdminData()
  const { logout } = useAuth()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [search, setSearch] = useState("")

  const sections = useMemo(
    () =>
      nav
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            if ("org" in item && item.org && !canManageOrg) {
              if (item.href === "/admin/locations" && isManager) return true
              return false
            }
            return true
          }),
        }))
        .filter((section) => section.items.length > 0),
    [canManageOrg, isManager]
  )

  function submitSearch(event: React.FormEvent) {
    event.preventDefault()
    const q = search.trim()
    if (!q) {
      setPaletteOpen(true)
      return
    }
    router.push(`/admin/projects?q=${encodeURIComponent(q)}`)
    setSearch("")
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[232px_1fr]">
      <aside className="hidden border-r bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-14 items-center px-4">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {sections.map((section) => (
            <div key={section.label} className="mb-4">
              <p className="px-2 pb-1 text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                {section.label}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium",
                    isActive(pathname, item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <Link href="/admin/profile" className="m-3 flex items-center gap-2 rounded-xl border bg-background p-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {account.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{account.name}</span>
            <span className="block text-xs text-muted-foreground">{account.title}</span>
          </span>
        </Link>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur sm:px-5">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation" />}>
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3">
                {sections.flatMap((section) =>
                  section.items.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm">
                      {item.label}
                    </Link>
                  ))
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <form onSubmit={submitSearch} className="relative hidden min-w-0 flex-1 md:block md:max-w-md">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => setPaletteOpen(true)}
              placeholder="Search customers, projects, providers..."
              className="h-9 pl-8"
            />
            <span className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline">
              ⌘K
            </span>
          </form>

          <div className="ml-auto flex items-center gap-1.5">
            {!isManager ? (
              <select
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                className="h-9 max-w-[10rem] rounded-lg border bg-background px-2 text-xs sm:max-w-none sm:text-sm"
                aria-label="Location filter"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="hidden rounded-lg border px-2 py-1.5 text-xs sm:inline">
                {locations[0]?.name ?? "Your location"}
              </span>
            )}

            <Link href="/admin/notifications" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}>
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-red-500" />
              <span className="sr-only">{notifications.length} notifications</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="h-9 gap-2 px-2" />
                }
              >
                <span className="grid size-6 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {account.initials}
                </span>
                <span className="hidden text-xs sm:inline">{account.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-52">
                <DropdownMenuLabel>{account.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout().then(() => router.push("/login"))}>
                  <LogOut className="size-3.5" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6">
          <RequireAuth roles={["OWNER", "SUPER_ADMIN", "LOCATION_MANAGER", "OPERATIONS", "FINANCE", "SUPPORT"]}>
            {children}
          </RequireAuth>
        </div>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  )
}
