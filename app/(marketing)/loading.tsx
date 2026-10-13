import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/container"

export default function Loading() {
  return (
    <Container className="py-16">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-5 w-96" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </Container>
  )
}
