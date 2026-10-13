import { Suspense } from "react"
import { Container } from "@/components/container"
import { ContactForm } from "@/components/forms/contact-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = { title: "Contact" }

export default function ContactPage() {
  return (
    <Container className="max-w-xl py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Talk to an expert.</h1>
      <p className="mt-4 text-muted-foreground leading-7">
        Use this for a human conversation about a launch, a custom website, or a provider match. This form stores nothing yet.
      </p>
      <Suspense fallback={<Skeleton className="mt-8 h-80 w-full" />}>
        <ContactForm />
      </Suspense>
    </Container>
  )
}
