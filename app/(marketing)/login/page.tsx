import { Suspense } from "react"
import { LoginForm, type SignInProviders } from "./login-form"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"

async function loadProviders(): Promise<SignInProviders> {
  try {
    const response = await fetch(`${API_URL}/auth/providers`, { cache: "no-store" })
    const json = (await response.json()) as { data?: SignInProviders }
    return {
      google: json.data?.google === true,
      azure: json.data?.azure === true,
    }
  } catch {
    return { google: false, azure: false }
  }
}

export default async function LoginPage() {
  const providers = await loadProviders()
  return (
    <Suspense>
      <LoginForm providers={providers} />
    </Suspense>
  )
}
