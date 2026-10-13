"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/container"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useAuth } from "@/components/auth-provider"
import { API_URL, ApiError, api, homeForRole } from "@/lib/api/client"
import { cn } from "@/lib/utils"

export type SignInProviders = {
  google: boolean
  azure: boolean
}

export function LoginForm({ providers }: { providers: SignInProviders }) {
  const router = useRouter()
  const params = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState(params.get("error") ?? "")
  const [pending, setPending] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const ssoEnabled = providers.google || providers.azure

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "")
    const password = String(data.get("password") ?? "")
    setError("")
    setPending(true)
    try {
      const user = await login(email, password)
      const next = params.get("next")
      router.push(next && next.startsWith("/") ? next : homeForRole(user.role))
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "Could not sign in")
      setPending(false)
    }
  }

  async function forgot() {
    const email = String(new FormData(document.querySelector("form") as HTMLFormElement).get("email") ?? "")
    if (!email.includes("@")) {
      setError("Enter your email, then choose forgot password.")
      return
    }
    await api("/auth/forgot-password", { method: "POST", auth: false, body: JSON.stringify({ email }) })
    setResetSent(true)
  }

  return (
    <Container className="flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 shadow-card sm:p-8">
        <Logo />
        <h1 className="mt-6 text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {providers.google
            ? "Sign in with Google, or with the email and password on your account."
            : "Sign in with the email and password on your ScratchToLaunch account."}
        </p>
        {ssoEnabled ? (
          <div className="mt-6 space-y-3">
            {providers.google ? (
              <a href={`${API_URL}/auth/google`} className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full")}>
                Continue with Google
              </a>
            ) : null}
            {providers.azure ? (
              <a href={`${API_URL}/auth/azure`} className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full")}>
                Continue with Microsoft
              </a>
            ) : null}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or use email
              <span className="h-px flex-1 bg-border" />
            </div>
          </div>
        ) : null}
        <form onSubmit={onSubmit} className={cn("space-y-4", ssoEnabled ? "mt-4" : "mt-6")}>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="h-11" placeholder="you@studio.in" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" className="h-11" required minLength={8} />
          </div>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
          {resetSent ? <p className="text-xs text-muted-foreground">If that email exists, a reset link was sent.</p> : null}
          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending ? "Signing in…" : "Continue"}
          </Button>
        </form>
        <button type="button" onClick={forgot} className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          Forgot password
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/start" className="text-foreground underline-offset-4 hover:underline">
            Start a business
          </Link>
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "mt-2 w-full")}>
          Back to home
        </Link>
      </div>
    </Container>
  )
}
