import { api, apiList } from "@/lib/api/client"
import type { Provider, Review, Service, ServiceCategoryId } from "@/lib/types"

type ApiCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  _count?: { services: number }
}

type ApiProvider = {
  id: string
  name?: string
  businessName?: string
  slug: string
  profession?: string | null
  about?: string | null
  bio?: string | null
  rating?: number
  reviewCount?: number
  completedProjects?: number
  responseTime?: string | null
  verified?: boolean
  verificationStatus?: string
  startingPrice?: number | null
  specialties?: string[]
  initials?: string | null
  accent?: string | null
  location?: string | null
}

type ApiService = {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string | null
  startingPrice: number
  estimatedDuration?: string | null
  includes?: string[]
  tags?: string[]
  category?: { slug: string; name: string } | null
  categoryId?: string
  providerServices?: { provider: ApiProvider; price?: number }[]
}

export type CatalogCategory = {
  id: string
  name: string
  description: string
  count: number
}

const CATEGORY_IDS = new Set<string>([
  "business-setup",
  "finance",
  "brand",
  "website",
  "marketing",
  "legal",
  "automation",
])

export function toProvider(row: ApiProvider, location?: string | null): Provider {
  const name = row.name || row.businessName || "Provider"
  return {
    slug: row.slug,
    name,
    profession: row.profession || "Specialist",
    location: location || row.location || "India",
    rating: row.rating ?? 0,
    reviewCount: row.reviewCount ?? 0,
    completedProjects: row.completedProjects ?? 0,
    responseTime: row.responseTime || "—",
    verified: row.verified ?? row.verificationStatus === "VERIFIED",
    about: row.about || row.bio || "",
    startingPrice: row.startingPrice ?? 0,
    specialties: row.specialties ?? [],
    initials: row.initials || name.slice(0, 2).toUpperCase(),
    accent: row.accent || "#2454F5",
  }
}

export function toService(row: ApiService): Service {
  const providerRow = row.providerServices?.[0]?.provider
  const categorySlug = row.category?.slug ?? row.categoryId ?? "website"
  const category = (CATEGORY_IDS.has(categorySlug) ? categorySlug : "website") as ServiceCategoryId
  const provider = providerRow ? toProvider(providerRow) : undefined
  return {
    slug: row.slug,
    title: row.name,
    category,
    providerSlug: provider?.slug ?? "",
    startingPrice: row.providerServices?.[0]?.price ?? row.startingPrice,
    delivery: row.estimatedDuration || "As agreed",
    rating: provider?.rating ?? 0,
    reviewCount: provider?.reviewCount ?? 0,
    tags: row.tags ?? [],
    excerpt: row.shortDescription || row.description,
    description: row.description,
    includes: row.includes ?? [],
    faq: [],
    portfolio: [],
    provider,
  }
}

export async function fetchCategories(): Promise<CatalogCategory[]> {
  const rows = await api<ApiCategory[]>("/categories", { auth: false, cache: "no-store" })
  return rows.map((row) => ({
    id: row.slug,
    name: row.name,
    description: row.description || "",
    count: row._count?.services ?? 0,
  }))
}

export async function fetchServices() {
  const rows = await apiList<ApiService>("/services?limit=100&status=ACTIVE")
  return rows.map(toService)
}

export async function fetchService(slug: string) {
  const row = await api<ApiService>(`/services/${slug}`, { auth: false, cache: "no-store" })
  return toService(row)
}

export async function fetchProviderProfile(slug: string) {
  return api<ApiProvider & { services?: { title: string; price: number; service?: { slug: string } }[]; reviews?: { id: string; rating: number; comment?: string | null; createdAt: string; customer?: { user?: { firstName: string; lastName: string } } }[]; portfolio?: { title: string; description?: string | null }[] }>(
    `/providers/profile/${slug}`,
    { auth: false, cache: "no-store" }
  )
}

export function reviewsFromProfile(
  reviews: { id: string; rating: number; comment?: string | null; createdAt: string; customer?: { user?: { firstName: string; lastName: string } } }[] | undefined,
  providerSlug: string
): Review[] {
  return (reviews ?? []).map((review) => ({
    id: review.id,
    author: review.customer?.user ? `${review.customer.user.firstName} ${review.customer.user.lastName}` : "Customer",
    role: "Customer",
    rating: review.rating,
    body: review.comment || "",
    date: new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    providerSlug,
  }))
}
