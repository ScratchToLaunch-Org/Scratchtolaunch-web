import { Hero } from "@/components/home/hero"
import { BuildingSection } from "@/components/home/building-section"
import { ServicesSection } from "@/components/home/services-section"
import { PackagesSection } from "@/components/home/packages-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TrustSection } from "@/components/home/trust-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FaqSection } from "@/components/home/faq-section"
import { FinalCta } from "@/components/home/final-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BuildingSection />
      <ServicesSection />
      <PackagesSection />
      <HowItWorksSection />
      <TrustSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
