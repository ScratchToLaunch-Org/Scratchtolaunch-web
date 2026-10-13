"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { StarRating } from "@/components/star-rating"

type Review = { id: string; rating: number; comment?: string | null; createdAt: string }

export default function ProviderReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    if (!user?.providerId) return
    api<Review[]>(`/providers/${user.providerId}/reviews`).then(setReviews).catch(() => setReviews([]))
  }, [user?.providerId])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? <p className="text-sm text-muted-foreground">No published reviews yet.</p> : null}
      <div className="space-y-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Customer</p>
              <StarRating value={review.rating} />
            </div>
            <p className="mt-3 text-sm leading-6">{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
