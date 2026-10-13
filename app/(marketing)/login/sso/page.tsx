"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { ApiError, completeSso, homeForRole } from "@/lib/api/client"

export default function SsoCallbackPage() {
  return (
    <Suspense>
      <SsoCallback />
    </Suspense>
  )
}

function SsoCallback() {
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState("")

  useEffect(() => {
    const ticket = params.get("ticket")
    if (!ticket) {
      setError("Sign-in did not return a session. Try again from the login page.")
      return
    }
    let cancelled = false
    completeSso(ticket)
      .then((user) => {
        if (!cancelled) router.replace(homeForRole(user.role))
      })
      .catch((reason) => {
        if (cancelled) return
        setError(reason instanceof ApiError ? reason.message : "Could not finish sign-in")
      })
    return () => {
      cancelled = true
    }
  }, [params, router])

  return (
    <Container className="flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 shadow-card sm:p-8">
        <Logo />
        <h1 className="mt-6 text-2xl font-semibold">{error ? "Sign-in stopped" : "Signing you in"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error || "Checking the sign-in from your identity provider."}
        </p>
        {error ? (
          <Link href="/login" className="mt-6 inline-block text-sm underline-offset-4 hover:underline">
            Back to login
          </Link>
        ) : null}
      </div>
    </Container>
  )
}
