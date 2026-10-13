import Link from "next/link"
import { Clock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ProviderAvatar } from "@/components/provider-avatar"
import { StarRating } from "@/components/star-rating"
import { VerifiedBadge } from "@/components/verified-badge"
import { getProvider } from "@/lib/data/catalog"
import { formatINRFrom } from "@/lib/format"
import type { Service } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ServiceCard({ service }: { service: Service }) {
  const provider = service.provider ?? getProvider(service.providerSlug)
  if (!provider) return null

  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start gap-3">
        <ProviderAvatar initials={provider.initials} accent={provider.accent} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/providers/${provider.slug}`}
              className="truncate text-sm font-medium hover:underline"
            >
              {provider.name}
            </Link>
            {provider.verified ? <VerifiedBadge /> : null}
          </div>
          <p className="text-xs text-muted-foreground">{provider.location}</p>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug">
        <Link href={`/services/${service.slug}`} className="hover:underline">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
        {service.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <StarRating value={service.rating} reviewCount={service.reviewCount} />
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock className="size-3.5" />
          {service.delivery}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between gap-3 border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="text-lg font-semibold">{formatINRFrom(service.startingPrice)}</p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          className={cn(buttonVariants({ size: "lg" }), "h-9 px-3")}
        >
          View Service
        </Link>
      </div>
    </article>
  )
}
