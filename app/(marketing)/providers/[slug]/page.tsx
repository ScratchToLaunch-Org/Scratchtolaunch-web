import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, MapPin } from "lucide-react"
import { Container } from "@/components/container"
import { ProviderAvatar } from "@/components/provider-avatar"
import { StarRating } from "@/components/star-rating"
import { VerifiedBadge } from "@/components/verified-badge"
import { ServiceCard } from "@/components/services/service-card"
import { buttonVariants } from "@/components/ui/button"
import { fetchProviderProfile, reviewsFromProfile, toProvider, toService } from "@/lib/api/catalog"
import { formatINRFrom } from "@/lib/format"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const profile = await fetchProviderProfile(slug)
    return { title: profile.name || profile.businessName || "Provider" }
  } catch {
    return { title: "Provider" }
  }
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const profile = await fetchProviderProfile(slug).catch(() => null)
  if (!profile) notFound()
  const provider = toProvider(profile, profile.location)
  const listed = (profile.services ?? [])
    .filter((item) => item.service?.slug)
    .map((item) =>
      toService({
        id: item.service!.slug,
        name: item.title,
        slug: item.service!.slug,
        description: item.title,
        startingPrice: item.price,
        providerServices: [{ provider: profile, price: item.price }],
      })
    )
  const listedReviews = reviewsFromProfile(profile.reviews, provider.slug)
  const portfolio = (profile.portfolio ?? []).map((item) => ({
    title: item.title,
    caption: item.description || "",
  }))

  return (
    <Container className="py-12 lg:py-16">
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-card sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <ProviderAvatar initials={provider.initials} accent={provider.accent} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold">{provider.name}</h1>
              {provider.verified ? <VerifiedBadge /> : null}
            </div>
            <p className="mt-1 text-muted-foreground">{provider.profession}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <StarRating value={provider.rating} reviewCount={provider.reviewCount} />
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-3.5" /> {provider.location}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3.5" /> {provider.responseTime}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-52">
          <Link
            href={`/contact?provider=${provider.slug}`}
            className={cn(buttonVariants({ size: "xl" }))}
          >
            Contact Provider
          </Link>
          <Link
            href={listed[0] ? `/services/${listed[0].slug}` : "/services"}
            className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          >
            Book a Service
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Completed projects" value={String(provider.completedProjects)} />
        <Stat label="Starting from" value={formatINRFrom(provider.startingPrice)} />
        <Stat label="Specialties" value={provider.specialties.slice(0, 2).join(" · ")} />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{provider.about}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Services</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {listed.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {portfolio.map((item) => (
            <article key={item.title} className="rounded-xl border bg-card p-4">
              <div className="mb-3 h-24 rounded-lg bg-muted" />
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.caption}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {listedReviews.map((review) => (
            <article key={review.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.author}</p>
                <StarRating value={review.rating} />
              </div>
              <p className="text-xs text-muted-foreground">{review.role}</p>
              <p className="mt-3 text-sm leading-6">{review.body}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}
