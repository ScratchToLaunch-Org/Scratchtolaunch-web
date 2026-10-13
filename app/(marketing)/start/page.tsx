import { Suspense } from "react"
import { StartWizard } from "@/components/start/start-wizard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Start a business",
}

export default function StartPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-6 h-96 w-full" />
        </div>
      }
    >
      <StartWizard />
    </Suspense>
  )
}
