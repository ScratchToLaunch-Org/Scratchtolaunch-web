"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  FileText,
  FolderKanban,
  Headset,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Rocket,
  Settings,
  Wallet,
  Wrench,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { RequireAuth, useAuth } from "@/components/auth-provider"

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/launch", label: "My Launch", icon: Rocket },
  { href: "/dashboard/services", label: "Services", icon: Wrench },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/payments", label: "Payments", icon: Wallet },
  { href: "/dashboard/support", label: "Support", icon: Headset },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/launch": "My Launch",
  "/dashboard/services": "Services",
  "/dashboard/projects": "Projects",
  "/dashboard/messages": "Messages",
  "/dashboard/documents": "Documents",
  "/dashboard/payments": "Payments",
  "/dashboard/support": "Support",
  "/dashboard/settings": "Settings",
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const title =
    titles[pathname] ??
    (pathname.startsWith("/dashboard/projects/") ? "Project" : "Dashboard")

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {items.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </nav>
        <div className="p-3">
          <button
            type="button"
            onClick={() => logout().then(() => { window.location.href = "/login" })}
            className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b bg-background px-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" aria-label="Open navigation" />}>
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-3">
                  {items.map((item) => (
                    <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Logo wordmark={false} />
          </div>
          <h1 className="text-sm font-semibold">{title}</h1>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <RequireAuth roles={["CUSTOMER"]}>{children}</RequireAuth>
        </div>
      </div>
    </div>
  )
}

function NavLink({
  item,
  active,
}: {
  item: (typeof items)[number]
  active: boolean
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="size-4" />
      {item.label}
    </Link>
  )
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
