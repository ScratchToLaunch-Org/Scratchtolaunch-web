export type ServiceCategoryId =
  | "business-setup"
  | "finance"
  | "brand"
  | "website"
  | "marketing"
  | "legal"
  | "automation"

export type LaunchStatus = "done" | "in-progress" | "upcoming"

export type ProjectStatus =
  | "brief"
  | "design"
  | "development"
  | "review"
  | "launch"
  | "completed"

export type Service = {
  slug: string
  title: string
  category: ServiceCategoryId
  providerSlug: string
  startingPrice: number
  delivery: string
  rating: number
  reviewCount: number
  tags: string[]
  excerpt: string
  description: string
  includes: string[]
  faq: { question: string; answer: string }[]
  portfolio: { title: string; caption: string }[]
  provider?: Provider
}

export type Provider = {
  slug: string
  name: string
  profession: string
  location: string
  rating: number
  reviewCount: number
  completedProjects: number
  responseTime: string
  verified: boolean
  about: string
  startingPrice: number
  specialties: string[]
  initials: string
  accent: string
}

export type Review = {
  id: string
  author: string
  role: string
  rating: number
  body: string
  date: string
  serviceSlug?: string
  providerSlug?: string
}

export type LaunchPackage = {
  id: "starter" | "business" | "growth"
  name: string
  audience: string
  priceFrom: number
  popular?: boolean
  includes: string[]
  cta: { label: string; href: string }
}

export type ResourceArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  updated: string
  sections: { heading: string; body: string }[]
}
