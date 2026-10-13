import { Suspense } from "react"
import { Container } from "@/components/container"
import { ServiceCatalog } from "@/components/services/service-catalog"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Services",
  description: "Find verified professionals for registration, brand, website, finance and marketing.",
}

export default function ServicesPage() {
  return (
    <Container className="py-12 lg:py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Marketplace</p>
      <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
        Find the experts you need.
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Search by work, not by job title. Every listing shows who delivers it, what is included, and a starting price.
      </p>
      <div className="mt-10">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <ServiceCatalog />
        </Suspense>
      </div>
    </Container>
  )
}
