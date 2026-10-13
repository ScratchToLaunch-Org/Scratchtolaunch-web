export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"

const ACCESS_KEY = "stl_access"
const REFRESH_KEY = "stl_refresh"
const USER_KEY = "stl_user"

export type SessionUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  status: string
  locationIds: string[]
  isGlobal: boolean
  providerId?: string
  customerId?: string
  permissions: string[]
  phone?: string | null
  customer?: {
    id: string
    businessName: string
    phone: string
    email: string
    city?: string | null
  } | null
  provider?: {
    id: string
    businessName: string
    slug: string
    profession?: string | null
    bio?: string | null
  } | null
}

export type AuthSession = {
  accessToken: string
  refreshToken: string
  user: SessionUser
}

export class ApiError extends Error {
  status: number
  code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export function readStoredUser(): SessionUser | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

export function readAccessToken() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ACCESS_KEY)
}

export function persistSession(session: AuthSession, user?: SessionUser) {
  window.localStorage.setItem(ACCESS_KEY, session.accessToken)
  window.localStorage.setItem(REFRESH_KEY, session.refreshToken)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user ?? session.user))
}

export function clearSession() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(ACCESS_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
  window.localStorage.removeItem(USER_KEY)
}

export function homeForRole(role: string) {
  if (role === "PROVIDER") return "/provider"
  if (role === "CUSTOMER") return "/dashboard"
  return "/admin"
}

let refreshInflight: Promise<boolean> | null = null

async function refreshAccess() {
  if (typeof window === "undefined") return false
  const refreshToken = window.localStorage.getItem(REFRESH_KEY)
  if (!refreshToken) return false
  if (!refreshInflight) {
    refreshInflight = (async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
        const json = await response.json().catch(() => null)
        if (!response.ok || !json?.data?.accessToken) {
          clearSession()
          return false
        }
        persistSession(json.data as AuthSession)
        return true
      } catch {
        return false
      } finally {
        refreshInflight = null
      }
    })()
  }
  return refreshInflight
}

type RequestOptions = RequestInit & { auth?: boolean; retry?: boolean }

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)
  const body = options.body
  if (body && !(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }
  if (options.auth !== false) {
    const token = readAccessToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (response.status === 401 && options.auth !== false && options.retry !== false && !path.startsWith("/auth/")) {
    const refreshed = await refreshAccess()
    if (refreshed) return api<T>(path, { ...options, retry: false })
  }

  const json = await response.json().catch(() => null)
  if (!response.ok || json?.success === false) {
    const message = Array.isArray(json?.error?.message)
      ? json.error.message.join(", ")
      : String(json?.error?.message ?? response.statusText ?? "Request failed")
    throw new ApiError(response.status, String(json?.error?.code ?? "HTTP_ERROR"), message)
  }
  return (json?.data ?? json) as T
}

export async function apiList<T>(path: string): Promise<T[]> {
  const data = await api<{ items?: T[] } | T[]>(path)
  if (Array.isArray(data)) return data
  return data.items ?? []
}

export async function login(email: string, password: string) {
  const session = await api<AuthSession>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password }),
  })
  persistSession(session)
  const me = await api<SessionUser>("/auth/me")
  persistSession(session, me)
  return me
}

export async function register(input: {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: "CUSTOMER" | "PROVIDER"
  businessName?: string
  city?: string
  phone?: string
}) {
  const session = await api<AuthSession>("/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify(input),
  })
  persistSession(session)
  const me = await api<SessionUser>("/auth/me")
  persistSession(session, me)
  return me
}

export async function completeSso(ticket: string) {
  const session = await api<AuthSession>("/auth/sso/complete", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ ticket }),
  })
  persistSession(session)
  const me = await api<SessionUser>("/auth/me")
  persistSession(session, me)
  return me
}

export async function logout() {
  const refreshToken = typeof window === "undefined" ? null : window.localStorage.getItem(REFRESH_KEY)
  try {
    if (refreshToken) {
      await api("/auth/logout", { method: "POST", auth: false, body: JSON.stringify({ refreshToken }) })
    }
  } catch {
    // Local session is cleared either way.
  }
  clearSession()
}
