"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const hidden = [
  "/dashboard",
  "/provider",
  "/login",
  "/start",
  "/checkout",
]

export function MobileStickyCta() {
  const pathname = usePathname()
  if (hidden.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null
  }

  const isService = pathname.startsWith("/services/") && pathname !== "/services"
  const href = isService ? `/checkout?service=${pathname.split("/").pop()}` : "/start"
  const label = isService ? "Book this service" : "Start My Business"

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <Link href={href} className={cn(buttonVariants({ size: "xl" }), "h-11 w-full")}>
        {label}
      </Link>
    </div>
  )
}
