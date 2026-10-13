"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  homeForRole,
  login as loginRequest,
  logout as logoutRequest,
  readStoredUser,
  register as registerRequest,
  type SessionUser,
} from "@/lib/api/client"

type AuthContextValue = {
  user: SessionUser | null
  ready: boolean
  login: (email: string, password: string) => Promise<SessionUser>
  register: (input: Parameters<typeof registerRequest>[0]) => Promise<SessionUser>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUser(readStoredUser())
    setReady(true)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      async login(email, password) {
        const next = await loginRequest(email, password)
        setUser(next)
        return next
      },
      async register(input) {
        const next = await registerRequest(input)
        setUser(next)
        return next
      },
      async logout() {
        await logoutRequest()
        setUser(null)
      },
    }),
    [ready, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export function RequireAuth({
  roles,
  children,
}: {
  roles?: string[]
  children: React.ReactNode
}) {
  const { user, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`)
      return
    }
    if (roles && !roles.includes(user.role)) {
      router.replace(homeForRole(user.role))
    }
  }, [ready, roles, router, user])

  if (!ready || !user || (roles && !roles.includes(user.role))) {
    return <p className="p-8 text-sm text-muted-foreground">Checking your session…</p>
  }
  return children
}
