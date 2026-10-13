import { Container } from "@/components/container"
import { SITE } from "@/lib/constants"

export const metadata = { title: "About" }

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">About</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{SITE.name}</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{SITE.tagline}</p>
      <div className="mt-8 space-y-5 text-[15px] leading-7 text-muted-foreground">
        <p>
          Most people who want to start a business in India are sent to ten different places: a CA WhatsApp, a freelancer group, a domain registrar, a logo contest, and a cousin who “knows websites”.
        </p>
        <p>
          {SITE.name} is built so that path is one product. You describe the business. You get a launch plan. You book verified professionals. You track the work until you are ready to open.
        </p>
        <p>
          We are not a generic freelance marketplace. The experience is closer to a business concierge with a marketplace underneath — designed for founders who will spend real money and expect clarity.
        </p>
      </div>
    </Container>
  )
}
