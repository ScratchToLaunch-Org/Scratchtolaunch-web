import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TrustSection } from "@/components/home/trust-section"
import { FinalCta } from "@/components/home/final-cta"
import { Container } from "@/components/container"

export const metadata = { title: "How it works" }

export default function HowItWorksPage() {
  return (
    <>
      <Container className="py-16">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">How it works</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          A concierge for the work between an idea and opening day.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
          You brief us once. We turn that into a launch plan, match verified professionals, and keep the files, messages and payments in one dashboard.
        </p>
      </Container>
      <HowItWorksSection />
      <TrustSection />
      <FinalCta />
    </>
  )
}
