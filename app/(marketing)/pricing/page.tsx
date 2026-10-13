import { PackagesSection } from "@/components/home/packages-section"
import { FaqSection } from "@/components/home/faq-section"
import { Container } from "@/components/container"
import { PRICE_DISCLAIMER } from "@/lib/constants"

export const metadata = { title: "Pricing" }

export default function PricingPage() {
  return (
    <>
      <Container className="py-16">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Pricing</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          Clear starting prices. Room to customise.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
          Packages are placeholders you can edit later. Individual services list their own starting rates. {PRICE_DISCLAIMER}
        </p>
      </Container>
      <PackagesSection />
      <FaqSection />
    </>
  )
}
