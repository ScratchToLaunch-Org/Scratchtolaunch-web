import { cn } from "@/lib/utils"

export function ProviderAvatar({
  initials,
  accent,
  size = "md",
}: {
  initials: string
  accent: string
  size?: "sm" | "md" | "lg"
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold text-white",
        size === "sm" && "size-8 text-[11px]",
        size === "md" && "size-11 text-sm",
        size === "lg" && "size-16 text-lg"
      )}
      style={{ background: accent }}
    >
      {initials}
    </span>
  )
}
