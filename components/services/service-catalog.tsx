"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/empty-state"
import { ServiceCard } from "@/components/services/service-card"
import { fetchCategories, fetchServices, type CatalogCategory } from "@/lib/api/catalog"
import { getCategoryLabel } from "@/lib/data/catalog"
import type { Service } from "@/lib/types"

const budgets = [
  { id: "all", label: "Any budget" },
  { id: "under-5", label: "Under ₹5,000" },
  { id: "5-10", label: "₹5,000–₹10,000" },
  { id: "10-20", label: "₹10,000–₹20,000" },
  { id: "20-plus", label: "₹20,000+" },
]

export function ServiceCatalog() {
  const params = useSearchParams()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(params.get("category") ?? "all")
  const [budget, setBudget] = useState("all")
  const [sort, setSort] = useState("recommended")
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<CatalogCategory[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    Promise.all([fetchServices(), fetchCategories()])
      .then(([nextServices, nextCategories]) => {
        if (!active) return
        setServices(nextServices)
        setCategories(nextCategories)
      })
      .catch((reason: Error) => {
        if (active) setError(reason.message)
      })
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    let list = services.filter((service) => {
      const haystack = `${service.title} ${service.excerpt} ${service.tags.join(" ")}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())
      const matchesCategory = category === "all" || service.category === category
      const matchesBudget =
        budget === "all" ||
        (budget === "under-5" && service.startingPrice < 5000) ||
        (budget === "5-10" && service.startingPrice >= 5000 && service.startingPrice < 10000) ||
        (budget === "10-20" && service.startingPrice >= 10000 && service.startingPrice < 20000) ||
        (budget === "20-plus" && service.startingPrice >= 20000)
      return matchesQuery && matchesCategory && matchesBudget
    })
    if (sort === "price") list = [...list].sort((a, b) => a.startingPrice - b.startingPrice)
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [services, query, category, budget, sort])

  return (
    <div>
      <div className="rounded-xl border bg-card p-4 shadow-card">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a service..."
            className="h-11 pl-9"
            aria-label="Search services"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Select value={category} onValueChange={(value) => setCategory(String(value ?? "all"))}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={budget} onValueChange={(value) => setBudget(String(value ?? "all"))}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(value) => setSort(String(value ?? "recommended"))}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="price">Price: low to high</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {filtered.length} service{filtered.length === 1 ? "" : "s"}
          {category !== "all" ? ` in ${getCategoryLabel(category)}` : ""}
        </p>
        <Link href="/become-provider" className="hover:text-foreground">
          Offer a service
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No services match"
            description="Try another search or clear the filters. You can also start a launch plan and we’ll recommend work."
            action={{ href: "/start", label: "Build a launch plan" }}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}
