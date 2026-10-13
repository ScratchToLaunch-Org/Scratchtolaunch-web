import { cn } from "@/lib/utils"

export function KpiCard({
  label,
  value,
  hint,
  delta,
  tone = "neutral",
}: {
  label: string
  value: string
  hint?: string
  delta?: string
  tone?: "neutral" | "good" | "warn" | "bad"
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-[0_1px_2px_oklch(0.22_0.02_264/0.04)]">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p
        className={cn(
          "mt-1 text-xs",
          tone === "good" && "text-emerald-700",
          tone === "warn" && "text-amber-700",
          tone === "bad" && "text-red-700",
          tone === "neutral" && "text-muted-foreground"
        )}
      >
        {delta ? `${delta} ` : ""}
        {hint}
      </p>
    </div>
  )
}
