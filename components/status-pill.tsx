import { cn } from "@/lib/utils"

export function StatusPill({
  status,
  label,
}: {
  status: "done" | "in-progress" | "upcoming" | "paid" | "due"
  label: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        status === "done" && "bg-emerald-50 text-emerald-800",
        status === "in-progress" && "bg-primary/10 text-primary",
        status === "upcoming" && "bg-muted text-muted-foreground",
        status === "paid" && "bg-emerald-50 text-emerald-800",
        status === "due" && "bg-amber-50 text-amber-800"
      )}
    >
      {label}
    </span>
  )
}
