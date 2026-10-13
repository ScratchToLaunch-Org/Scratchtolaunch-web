"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BadgeCheck,
  Briefcase,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Star,
  UserRound,
  Users,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { RequireAuth, useAuth } from "@/components/auth-provider"

const items = [
  { href: "/provider", label: "Dashboard", icon: LayoutDashboard },
  { href: "/provider/leads", label: "Leads", icon: Users },
  { href: "/provider/orders", label: "Orders", icon: Briefcase },
  { href: "/provider/services", label: "Services", icon: Plus },
  { href: "/provider/messages", label: "Messages", icon: MessageSquare },
  { href: "/provider/earnings", label: "Earnings", icon: IndianRupee },
  { href: "/provider/reviews", label: "Reviews", icon: Star },
  { href: "/provider/profile", label: "Profile", icon: UserRound },
]

const titles: Record<string, string> = {
  "/provider": "Dashboard",
  "/provider/leads": "Leads",
  "/provider/orders": "Orders",
  "/provider/services": "Services",
  "/provider/services/new": "New service",
  "/provider/messages": "Messages",
  "/provider/earnings": "Earnings",
  "/provider/reviews": "Reviews",
  "/provider/profile": "Profile",
}

export function ProviderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const title = titles[pathname] ?? "Provider"

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-5">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <p className="px-5 pb-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Provider
        </p>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                isActive(pathname, item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => logout().then(() => { window.location.href = "/login" })}
          className={cn(buttonVariants({ variant: "ghost" }), "m-3 justify-start")}
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4">
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
                    <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="text-sm font-semibold">{title}</h1>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <BadgeCheck className="size-3.5" />
            Verified
          </span>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <RequireAuth roles={["PROVIDER"]}>{children}</RequireAuth>
        </div>
      </div>
    </div>
  )
}

function isActive(pathname: string, href: string) {
  if (href === "/provider") return pathname === href
  if (href === "/provider/services") {
    return pathname === href || pathname.startsWith("/provider/services/")
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
