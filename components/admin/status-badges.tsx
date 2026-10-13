import type { AdminProjectStatus, ProjectHealth, ProviderStatus } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

const projectStyles: Record<AdminProjectStatus, string> = {
  new: "bg-muted text-muted-foreground",
  assigned: "bg-sky-50 text-sky-800",
  "in-progress": "bg-primary/10 text-primary",
  review: "bg-violet-50 text-violet-800",
  completed: "bg-emerald-50 text-emerald-800",
  delayed: "bg-red-50 text-red-800",
}

const healthStyles: Record<ProjectHealth, string> = {
  "on-track": "text-emerald-700",
  "at-risk": "text-amber-700",
  delayed: "text-red-700",
  "not-started": "text-muted-foreground",
}

const healthDot: Record<ProjectHealth, string> = {
  "on-track": "bg-emerald-500",
  "at-risk": "bg-amber-500",
  delayed: "bg-red-500",
  "not-started": "bg-zinc-400",
}

const healthLabel: Record<ProjectHealth, string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  delayed: "Delayed",
  "not-started": "Not Started",
}

export function ProjectStatusBadge({ status }: { status: AdminProjectStatus }) {
  const labels: Record<AdminProjectStatus, string> = {
    new: "New",
    assigned: "Assigned",
    "in-progress": "In Progress",
    review: "Review",
    completed: "Completed",
    delayed: "Delayed",
  }
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium", projectStyles[status])}>
      {labels[status]}
    </span>
  )
}

export function HealthBadge({ health }: { health: ProjectHealth }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", healthStyles[health])}>
      <span className={cn("size-1.5 rounded-full", healthDot[health])} />
      {healthLabel[health]}
    </span>
  )
}

export function ProviderStatusBadge({ status }: { status: ProviderStatus }) {
  const map: Record<ProviderStatus, string> = {
    active: "bg-emerald-50 text-emerald-800",
    pending: "bg-amber-50 text-amber-800",
    suspended: "bg-red-50 text-red-800",
    inactive: "bg-muted text-muted-foreground",
  }
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", map[status])}>
      {status}
    </span>
  )
}

export function DotStatus({
  active,
  label,
}: {
  active: boolean
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className={cn("size-2 rounded-full", active ? "bg-emerald-500" : "bg-zinc-400")} />
      {label}
    </span>
  )
}
