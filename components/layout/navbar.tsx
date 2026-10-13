"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"
import { Container } from "@/components/container"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-200",
        scrolled
          ? "border-border/80 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/40 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3")}
          >
            Login
          </Link>
          <Link
            href="/become-provider"
            className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}
          >
            Become a Provider
          </Link>
          <Link href="/start" className={cn(buttonVariants(), "h-9 px-3.5")}>
            Start Your Business
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/start" className={cn(buttonVariants(), "h-9 px-3")}>
            Start
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-2 py-2.5 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/login" className="rounded-lg px-2 py-2.5 text-sm font-medium">
                  Login
                </Link>
                <Link
                  href="/become-provider"
                  className="rounded-lg px-2 py-2.5 text-sm font-medium"
                >
                  Become a Provider
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
