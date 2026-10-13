import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  markClassName?: string
  wordmark?: boolean
}

export function Logo({ className, markClassName, wordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <span
        className={cn(
          "relative grid size-8 place-items-center rounded-[10px] bg-primary text-primary-foreground shadow-[0_8px_16px_-10px_oklch(0.5_0.21_264/0.9)]",
          markClassName
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path
            d="M6 16.5L12.2 7.5L13.8 12.2L18 8.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2 8.5H18V11.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {wordmark ? (
        <span className="text-[15px] font-semibold tracking-[-0.03em]">
          ScratchToLaunch
        </span>
      ) : null}
    </span>
  )
}
