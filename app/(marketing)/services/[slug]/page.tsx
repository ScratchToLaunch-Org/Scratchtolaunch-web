import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, Clock, MapPin } from "lucide-react"
import { Container } from "@/components/container"
import { ProviderAvatar } from "@/components/provider-avatar"
import { StarRating } from "@/components/star-rating"
import { VerifiedBadge } from "@/components/verified-badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { fetchProviderProfile, fetchService, reviewsFromProfile, toProvider } from "@/lib/api/catalog"
import { PRICE_DISCLAIMER } from "@/lib/constants"
import { formatINRFrom } from "@/lib/format"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const service = await fetchService(slug)
    return { title: service.title }
  } catch {
    return { title: "Service" }
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await fetchService(slug).catch(() => null)
  if (!service) notFound()
  const profile = service.providerSlug
    ? await fetchProviderProfile(service.providerSlug).catch(() => null)
    : null
  const provider = profile ? toProvider(profile, profile.location) : service.provider
  if (!provider) notFound()
  const serviceReviews = reviewsFromProfile(profile?.reviews, provider.slug)
  if (profile?.portfolio?.length) {
    service.portfolio = profile.portfolio.map((item) => ({
      title: item.title,
      caption: item.description || "",
    }))
  }

  return (
    <Container className="py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
            <ServiceMock title={service.title} accent={provider.accent} />
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">About the provider</h2>
            <div className="mt-4 flex gap-3 rounded-xl border bg-card p-4">
              <ProviderAvatar initials={provider.initials} accent={provider.accent} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/providers/${provider.slug}`} className="font-medium hover:underline">
                    {provider.name}
                  </Link>
                  {provider.verified ? <VerifiedBadge /> : null}
                </div>
                <p className="text-sm text-muted-foreground">{provider.profession}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{provider.about}</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.portfolio.map((item) => (
                <article key={item.title} className="rounded-xl border bg-card p-4">
                  <div className="mb-3 h-24 rounded-lg bg-muted" />
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="mt-4 space-y-3">
              {serviceReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">Reviews for this service will appear here.</p>
              ) : (
                serviceReviews.map((review) => (
                  <article key={review.id} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{review.author}</p>
                      <StarRating value={review.rating} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.role} · {review.date}
                    </p>
                    <p className="mt-3 text-sm leading-6">{review.body}</p>
                  </article>
                ))
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <Accordion className="mt-2">
              {service.faq.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border bg-card p-6 shadow-card">
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Service
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{service.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <StarRating value={service.rating} reviewCount={service.reviewCount} />
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3.5" /> {service.delivery}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3.5" /> {provider.location}
            </span>
          </div>
          <p className="mt-5 text-3xl font-semibold">{formatINRFrom(service.startingPrice)}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{service.description}</p>
          <h2 className="mt-6 text-sm font-semibold">What’s included</h2>
          <ul className="mt-3 space-y-2">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={`/checkout?service=${service.slug}`}
              className={cn(buttonVariants({ size: "xl" }), "w-full")}
            >
              Book Service
            </Link>
            <Link
              href={`/providers/${provider.slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "xl" }), "w-full")}
            >
              View provider
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">{PRICE_DISCLAIMER}</p>
        </aside>
      </div>
    </Container>
  )
}

function ServiceMock({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="relative h-64 bg-muted sm:h-80">
      <div className="absolute inset-6 rounded-xl border bg-background p-5 shadow-card">
        <div className="h-2 w-24 rounded-full" style={{ background: accent }} />
        <p className="mt-4 text-lg font-semibold">{title}</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-muted" />
          <div className="h-16 rounded-lg bg-muted" />
          <div className="h-16 rounded-lg bg-muted" />
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-muted" />
        <div className="mt-2 h-2 w-2/3 rounded-full bg-muted" />
      </div>
    </div>
  )
}
