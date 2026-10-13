import Link from "next/link"
import { Container } from "@/components/container"
import { resources } from "@/lib/data/marketing"

export const metadata = {
  title: "Resources",
  description: "Guides for starting and launching a business in India.",
}

export default function ResourcesPage() {
  return (
    <Container className="py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Resources</p>
      <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
        Guides for people about to start.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
        Practical orientation — not legal advice. Written so they can grow into a full resource centre.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {resources.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="rounded-xl border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <p className="text-xs font-medium text-primary">{article.category}</p>
            <h2 className="mt-2 text-lg font-semibold">{article.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              {article.readTime} · Updated {article.updated}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  )
}
