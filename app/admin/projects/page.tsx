import { Suspense } from "react"
import { ProjectsBoard } from "./projects-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ProjectsBoard />
    </Suspense>
  )
}
