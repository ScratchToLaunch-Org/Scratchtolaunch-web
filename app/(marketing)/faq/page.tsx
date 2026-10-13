import { Container } from "@/components/container"
import { FaqSection } from "@/components/home/faq-section"

export const metadata = { title: "FAQ" }

export default function FaqPage() {
  return (
    <>
      <Container className="pt-16">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">FAQ</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          Common questions about launching here.
        </h1>
      </Container>
      <FaqSection />
    </>
  )
}
