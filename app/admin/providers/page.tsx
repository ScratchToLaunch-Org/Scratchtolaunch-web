import { Suspense } from "react"
import { ProvidersBoard } from "./providers-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProvidersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-80 w-full" />}>
      <ProvidersBoard />
    </Suspense>
  )
}
