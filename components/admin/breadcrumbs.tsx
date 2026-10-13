import Link from "next/link"
import { cn } from "@/lib/utils"

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[]
}) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
          {index > 0 ? <span>/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className={cn(index === items.length - 1 && "text-foreground")}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
