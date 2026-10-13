import Link from "next/link"
import { Inbox } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
      <div className="mb-4 grid size-12 place-items-center rounded-xl bg-muted">
        <Inbox className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      {action ? (
        <Link
          href={action.href}
          className={cn(buttonVariants({ size: "lg" }), "mt-6 h-10 px-4")}
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}
