import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  value,
  reviewCount,
  className,
}: {
  value: number
  reviewCount?: number
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <Star className="size-3.5 fill-amber-500 text-amber-500" />
      <span className="font-medium tabular-nums">{value.toFixed(1)}</span>
      {typeof reviewCount === "number" ? (
        <span className="text-muted-foreground">({reviewCount})</span>
      ) : null}
    </span>
  )
}
