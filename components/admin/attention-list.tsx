"use client"

import Link from "next/link"
import type { AttentionItem } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

const tones: Record<AttentionItem["level"], string> = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-primary",
  success: "bg-emerald-500",
}

export function AttentionList({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        Nothing flagged in this location right now.
      </p>
    )
  }

  return (
    <ul className="divide-y rounded-xl border bg-card">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", tones[item.level])} />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </div>
          <Link href={item.href} className="text-sm font-medium text-primary hover:underline sm:shrink-0">
            {item.cta}
          </Link>
        </li>
      ))}
    </ul>
  )
}
