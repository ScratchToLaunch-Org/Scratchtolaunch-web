import { Container } from "@/components/container"

export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-6 text-[15px] leading-7 text-muted-foreground">{body}</p>
    </Container>
  )
}
