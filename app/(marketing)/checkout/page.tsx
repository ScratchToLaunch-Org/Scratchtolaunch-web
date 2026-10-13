"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { Container } from "@/components/container"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getProvider, getService } from "@/lib/data/catalog"
import { ApiError, api } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import { formatINR } from "@/lib/format"
import { PRICE_DISCLAIMER } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  )
}

function CheckoutInner() {
  const params = useSearchParams()
  const slug = params.get("service") ?? "business-website"
  const fallback = getService(slug) ?? getService("business-website")
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [paying, setPaying] = useState(false)
  const [live, setLive] = useState<{ title: string; price: number; provider: string; delivery: string } | null>(null)

  useEffect(() => {
    api<{ name: string; startingPrice: number; estimatedDuration?: string; providerServices?: { provider?: { businessName?: string; name?: string } }[] }>(
      `/services/${slug}`,
      { auth: false }
    )
      .then((row) => {
        const providerName = row.providerServices?.[0]?.provider?.name || row.providerServices?.[0]?.provider?.businessName
        setLive({
          title: row.name,
          price: row.startingPrice,
          provider: providerName || "Assigned after payment",
          delivery: row.estimatedDuration || "As agreed",
        })
      })
      .catch(() => setLive(null))
  }, [slug])

  const service = live
    ? { title: live.title, slug, startingPrice: live.price, delivery: live.delivery }
    : fallback
  const providerName = live?.provider ?? (fallback ? getProvider(fallback.providerSlug)?.name : undefined)

  const breakdown = useMemo(() => {
    const serviceFee = service?.startingPrice ?? 0
    return { serviceFee, total: serviceFee }
  }, [service])

  if (!service || !providerName) {
    return (
      <Container className="py-16">
        <p>Service not found.</p>
        <Link href="/services" className={cn(buttonVariants(), "mt-4")}>
          Browse services
        </Link>
      </Container>
    )
  }

  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        You pay the service starting price. The platform fee is recorded on the order.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">{service.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Provider: {providerName}</p>
          <p className="mt-1 text-sm text-muted-foreground">Timeline: {service.delivery}</p>
          <dl className="mt-6 space-y-2 text-sm">
            <Row label="Service" value={formatINR(breakdown.serviceFee)} />
            <Row label="Total due now" value={formatINR(breakdown.total)} strong />
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">{PRICE_DISCLAIMER}</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-semibold">Payment method</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Card and UPI checkout uses the configured payment gateway. In this environment that gateway confirms the order immediately.
          </p>
          <div className="mt-4 space-y-2 rounded-xl bg-muted p-4 text-sm">
            <p className="font-medium">ScratchToLaunch sandbox</p>
            <p className="text-muted-foreground">Ending in 4242 · Test mode</p>
          </div>
          <Button className="mt-6 h-11 w-full" onClick={() => setOpen(true)}>
            Continue to Payment
          </Button>
          <Link href={`/services/${service.slug}`} className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
            Back to service
          </Link>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This creates the order and marks it paid through the payment gateway configured on the API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              disabled={paying}
              onClick={async (event) => {
                event.preventDefault()
                if (!user) {
                  window.location.href = `/login?next=${encodeURIComponent(`/checkout?service=${slug}`)}`
                  return
                }
                if (user.role !== "CUSTOMER") {
                  toast.error("Sign in with a customer account to pay.")
                  return
                }
                setPaying(true)
                try {
                  const listing = await api<{ id: string; providerServices?: { providerId?: string; provider?: { id: string } }[] }>(
                    `/services/${slug}`,
                    { auth: false }
                  )
                  const order = await api<{ id: string }>("/orders", {
                    method: "POST",
                    body: JSON.stringify({
                      serviceId: listing.id,
                      providerId: listing.providerServices?.[0]?.provider?.id,
                    }),
                  })
                  const payment = await api<{ id: string }>("/payments", {
                    method: "POST",
                    body: JSON.stringify({ orderId: order.id, paymentMethod: "mock" }),
                  })
                  await api(`/payments/${payment.id}/verify`, { method: "POST", body: JSON.stringify({}) })
                  setOpen(false)
                  toast.success("Payment recorded", { description: "The project is now on your dashboard." })
                  window.location.href = "/dashboard"
                } catch (reason) {
                  toast.error(reason instanceof ApiError ? reason.message : "Payment failed")
                  setPaying(false)
                }
              }}
            >
              {paying ? "Processing…" : "Confirm payment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Check className="size-4 text-primary" />
        A successful payment opens the project on your dashboard.
      </div>
    </Container>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={strong ? "text-base font-semibold" : "font-medium"}>{value}</dd>
    </div>
  )
}
