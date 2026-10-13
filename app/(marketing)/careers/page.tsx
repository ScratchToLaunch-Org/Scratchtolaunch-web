import { Container } from "@/components/container"
import { EmptyState } from "@/components/empty-state"

export const metadata = { title: "Careers" }

export default function CareersPage() {
  return (
    <Container className="py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Careers</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Work on the launch platform.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        We hire slowly. If nothing is listed, you can still write in.
      </p>
      <div className="mt-10">
        <EmptyState
          title="No open roles right now"
          description="There are no public openings in this preview. Send a note via contact if you want to be considered later."
          action={{ href: "/contact", label: "Contact us" }}
        />
      </div>
    </Container>
  )
}
