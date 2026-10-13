import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { resources } from "@/lib/data/marketing"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return resources.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = resources.find((item) => item.slug === slug)
  return { title: article?.title ?? "Guide" }
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = resources.find((item) => item.slug === slug)
  if (!article) notFound()

  return (
    <Container className="max-w-3xl py-16">
      <p className="text-xs font-medium text-primary">{article.category}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">{article.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {article.readTime} · Updated {article.updated}
      </p>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
      <div className="mt-10 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-12 rounded-xl border bg-card p-6">
        <p className="font-semibold">Ready to turn this into a plan?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the business builder — two minutes, then a launch checklist.
        </p>
        <Link href="/start" className={cn(buttonVariants({ size: "xl" }), "mt-4")}>
          Start My Business
        </Link>
      </div>
    </Container>
  )
}
