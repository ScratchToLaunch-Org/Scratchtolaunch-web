"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { api, apiList } from "@/lib/api/client"
import { useAuth } from "@/components/auth-provider"
import type {
  AdminCustomer,
  AdminLocation,
  AdminManager,
  AdminNotification,
  AdminProject,
  AdminProjectStatus,
  AdminProvider,
  AdminService,
  AdminTeamMember,
  AttentionItem,
  StaffRole,
} from "@/lib/admin/types"

type Account = {
  id: string
  name: string
  title: string
  role: StaffRole
  locationId: string | null
  email: string
  initials: string
}

type Stats = {
  activeProjects: number
  needAttention: number
  revenueToday: number
  completed: number
  onTime: number
  totalProjects: number
  revenue: number
  customers: number
  providers: number
  providersActive: number
  delayed: number
  payouts: number
  platform: number
  refunds: number
  pending: number
}

type SeriesPoint = { month: string; revenue: number; projects: number; customers: number; completed: number }

type AdminContextValue = {
  account: Account
  isManager: boolean
  canSeeFinance: boolean
  canManageOrg: boolean
  locationFilter: string
  setLocationFilter: (id: string) => void
  scopedLocationId: string | null
  loading: boolean
  error: string
  stats: Stats
  series: SeriesPoint[]
  services: AdminService[]
  team: AdminTeamMember[]
  payments: { id: string; amount: number; status: string; createdAt: string; type?: string }[]
  payouts: { id: string; amount: number; status: string; providerId?: string; createdAt: string }[]
}

const EMPTY_STATS: Stats = {
  activeProjects: 0,
  needAttention: 0,
  revenueToday: 0,
  completed: 0,
  onTime: 0,
  totalProjects: 0,
  revenue: 0,
  customers: 0,
  providers: 0,
  providersActive: 0,
  delayed: 0,
  payouts: 0,
  platform: 0,
  refunds: 0,
  pending: 0,
}

const AdminContext = createContext<AdminContextValue | null>(null)
const DataContext = createContext<{
  projects: AdminProject[]
  customers: AdminCustomer[]
  providers: AdminProvider[]
  locations: AdminLocation[]
  managers: AdminManager[]
  attention: AttentionItem[]
  notifications: AdminNotification[]
} | null>(null)

const STAFF = ["OWNER", "SUPER_ADMIN", "LOCATION_MANAGER", "OPERATIONS", "FINANCE", "SUPPORT"]

function roleLabel(role: string): StaffRole {
  if (role === "OWNER") return "owner"
  if (role === "SUPER_ADMIN") return "admin"
  if (role === "FINANCE") return "finance"
  if (role === "SUPPORT") return "support"
  if (role === "OPERATIONS") return "operations"
  return "manager"
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
}

function projectStatus(status: string): AdminProjectStatus {
  const map: Record<string, AdminProjectStatus> = {
    NEW: "new",
    ASSIGNED: "assigned",
    REQUIREMENTS: "assigned",
    IN_PROGRESS: "in-progress",
    REVIEW: "review",
    CUSTOMER_REVIEW: "review",
    REVISION: "in-progress",
    ON_HOLD: "delayed",
    COMPLETED: "completed",
    CANCELLED: "delayed",
  }
  return map[status] ?? "in-progress"
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [locationFilter, setLocationFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [series, setSeries] = useState<SeriesPoint[]>([])
  const [services, setServices] = useState<AdminService[]>([])
  const [team, setTeam] = useState<AdminTeamMember[]>([])
  const [payments, setPayments] = useState<AdminContextValue["payments"]>([])
  const [payouts, setPayouts] = useState<AdminContextValue["payouts"]>([])
  const [bundle, setBundle] = useState({
    projects: [] as AdminProject[],
    customers: [] as AdminCustomer[],
    providers: [] as AdminProvider[],
    locations: [] as AdminLocation[],
    managers: [] as AdminManager[],
    attention: [] as AttentionItem[],
    notifications: [] as AdminNotification[],
  })

  useEffect(() => {
    if (!user || !STAFF.includes(user.role)) return
    let active = true
    setLoading(true)
    Promise.allSettled([
      api<Record<string, unknown>>("/admin/dashboard"),
      apiList<Record<string, unknown>>("/projects?limit=100"),
      apiList<Record<string, unknown>>("/customers?limit=100"),
      apiList<Record<string, unknown>>("/providers?limit=100"),
      apiList<Record<string, unknown>>("/locations?limit=100"),
      apiList<Record<string, unknown>>("/managers?limit=100"),
      apiList<Record<string, unknown>>("/services?limit=100"),
      api<{ items?: Record<string, unknown>[] }>("/admin/alerts"),
      apiList<Record<string, unknown>>("/notifications"),
      api<{ series?: { month: string; revenue: number }[] }>("/admin/analytics/revenue"),
      api<{ items?: Record<string, unknown>[] }>("/admin/finance/transactions?limit=50"),
      api<Record<string, unknown>[]>("/users"),
      api<{ items?: Record<string, unknown>[] }>("/admin/analytics/services"),
    ]).then((results) => {
      if (!active) return
      const value = <T,>(index: number) => (results[index].status === "fulfilled" ? (results[index] as PromiseFulfilledResult<T>).value : null)
      const dashboard = value<Record<string, any>>(0)
      const overview = dashboard?.overview ?? {}
      const kpis = dashboard?.kpis ?? {}
      const revenue = dashboard?.revenue ?? {}
      setStats({
        activeProjects: overview.activeProjects ?? kpis.activeProjects ?? 0,
        needAttention: overview.needAttention ?? 0,
        revenueToday: overview.revenueToday ?? 0,
        completed: overview.completed ?? 0,
        onTime: overview.onTime ?? 0,
        totalProjects: kpis.totalProjects ?? 0,
        revenue: revenue.total ?? kpis.revenue ?? 0,
        customers: kpis.customers ?? 0,
        providers: kpis.providers ?? 0,
        providersActive: kpis.providersActive ?? 0,
        delayed: kpis.delayed ?? 0,
        payouts: revenue.payouts ?? 0,
        platform: revenue.platform ?? 0,
        refunds: revenue.refunds ?? 0,
        pending: revenue.pendingPayouts ?? 0,
      })
      const revenueSeries = value<{ series?: { month: string; revenue: number }[] }>(9)?.series ?? []
      setSeries(revenueSeries.map((point) => ({ month: point.month, revenue: point.revenue, projects: 0, customers: 0, completed: 0 })))

      const locationRows = ((dashboard?.locations as Record<string, unknown>[]) ?? value<Record<string, unknown>[]>(4) ?? []).map(mapLocation)
      const projects = (value<Record<string, unknown>[]>(1) ?? []).map(mapProject)
      const customers = (value<Record<string, unknown>[]>(2) ?? []).map(mapCustomer)
      const providers = (value<Record<string, unknown>[]>(3) ?? []).map(mapProvider)
      const managers = (value<Record<string, unknown>[]>(5) ?? []).map(mapManager)
      const serviceRows = value<Record<string, unknown>[]>(6) ?? []
      const analyticsServices = value<{ items?: Record<string, unknown>[] }>(12)?.items ?? []
      setServices(serviceRows.map((row) => {
        const match = analyticsServices.find((item) => item.serviceId === row.id)
        return {
          id: String(row.id),
          name: String(row.name),
          category: String((row.category as { name?: string } | undefined)?.name ?? row.categoryId ?? ""),
          revenue: Number(match?.revenue ?? 0),
          projects: Number(match?.projects ?? 0),
          avgValue: Number(match?.averageOrderValue ?? row.startingPrice ?? 0),
          avgDays: 0,
          rating: 0,
        }
      }))
      const alerts = value<{ items?: Record<string, unknown>[] }>(7)
      const alertItems = Array.isArray(alerts) ? alerts : alerts?.items ?? []
      const attention: AttentionItem[] = alertItems.map((alert) => ({
        id: String(alert.id),
        level: String(alert.severity ?? "info").toLowerCase() === "critical" ? "critical" : String(alert.severity ?? "").toLowerCase() === "warning" ? "warning" : "info",
        title: String(alert.title ?? "Alert"),
        detail: String(alert.description ?? ""),
        href: alert.projectId ? `/admin/projects/${alert.projectId}` : "/admin/notifications",
        cta: "Open",
        locationId: String(alert.locationId ?? ""),
      }))
      const notes = value<Record<string, unknown>[]>(8) ?? []
      const notifications: AdminNotification[] = notes.map((note) => ({
        id: String(note.id),
        level: "info",
        title: String(note.title ?? note.message ?? "Notification"),
        href: "/admin/notifications",
        time: note.createdAt ? new Date(String(note.createdAt)).toLocaleString("en-IN") : "",
      }))
      const tx = value<{ items?: Record<string, unknown>[] }>(10)
      const txItems = Array.isArray(tx) ? tx : tx?.items ?? []
      setPayments(txItems.filter((item) => item.type === "CUSTOMER_PAYMENT" || item.type === "REFUND").map((item) => ({
        id: String(item.id),
        amount: Number(item.amount ?? 0),
        status: String(item.status ?? ""),
        createdAt: String(item.createdAt ?? ""),
        type: String(item.type ?? ""),
      })))
      setPayouts(txItems.filter((item) => item.type === "PROVIDER_PAYOUT").map((item) => ({
        id: String(item.id),
        amount: Number(item.amount ?? 0),
        status: String(item.status ?? ""),
        providerId: item.providerId ? String(item.providerId) : undefined,
        createdAt: String(item.createdAt ?? ""),
      })))
      const users = value<Record<string, unknown>[]>(11) ?? []
      setTeam(users.map((member) => ({
        id: String(member.id),
        name: `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim(),
        email: String(member.email ?? ""),
        role: roleLabel(String(member.role ?? "")),
        locationId: null,
        status: String(member.status) === "ACTIVE" ? "active" : "invited",
        lastActive: member.lastLoginAt ? new Date(String(member.lastLoginAt)).toLocaleString("en-IN") : "—",
        initials: initials(`${member.firstName ?? ""} ${member.lastName ?? ""}`),
        permissions: [],
      })))
      setBundle({ projects, customers, providers, locations: locationRows, managers, attention, notifications })
      setLoading(false)
    }).catch((reason: Error) => {
      if (!active) return
      setError(reason.message)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [user])

  const account = useMemo<Account>(() => {
    const name = user ? `${user.firstName} ${user.lastName}` : "Staff"
    return {
      id: user?.id ?? "",
      name,
      title: user?.role.replaceAll("_", " ") ?? "Staff",
      role: roleLabel(user?.role ?? "OPERATIONS"),
      locationId: user?.locationIds[0] ?? null,
      email: user?.email ?? "",
      initials: initials(name),
    }
  }, [user])

  const isManager = user?.role === "LOCATION_MANAGER"
  const scopedLocationId = isManager ? account.locationId : locationFilter === "all" ? null : locationFilter
  const value = useMemo<AdminContextValue>(
    () => ({
      account,
      isManager,
      canSeeFinance: ["OWNER", "SUPER_ADMIN", "FINANCE", "LOCATION_MANAGER"].includes(user?.role ?? ""),
      canManageOrg: user?.role === "OWNER" || user?.role === "SUPER_ADMIN",
      locationFilter: isManager ? account.locationId ?? "all" : locationFilter,
      setLocationFilter,
      scopedLocationId,
      loading,
      error,
      stats,
      series,
      services,
      team,
      payments,
      payouts,
    }),
    [account, error, isManager, loading, locationFilter, payments, payouts, scopedLocationId, series, services, stats, team, user?.role]
  )

  return (
    <AdminContext.Provider value={value}>
      <DataContext.Provider value={bundle}>{children}</DataContext.Provider>
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider")
  return ctx
}

export function useScopedAdminData() {
  const { scopedLocationId, services } = useAdmin()
  const data = useContext(DataContext)
  if (!data) throw new Error("useScopedAdminData must be used within AdminProvider")
  const loc = scopedLocationId
  return {
    projects: loc ? data.projects.filter((item) => item.locationId === loc) : data.projects,
    customers: loc ? data.customers.filter((item) => item.locationId === loc) : data.customers,
    providers: loc ? data.providers.filter((item) => item.locationIds.includes(loc)) : data.providers,
    locations: loc ? data.locations.filter((item) => item.id === loc) : data.locations,
    managers: loc ? data.managers.filter((item) => item.locationIds.includes(loc)) : data.managers,
    attention: loc ? data.attention.filter((item) => item.locationId === loc) : data.attention,
    notifications: data.notifications,
    services,
    getCustomer: (id: string) => data.customers.find((item) => item.id === id),
    getProvider: (id: string) => data.providers.find((item) => item.id === id),
    getLocation: (id: string) => data.locations.find((item) => item.id === id),
    getManager: (id: string) => data.managers.find((item) => item.id === id),
    getService: (id: string) => services.find((item) => item.id === id),
    getProject: (id: string) => data.projects.find((item) => item.id === id),
  }
}

function mapLocation(row: Record<string, unknown>): AdminLocation {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    city: String(row.city ?? ""),
    state: String(row.state ?? ""),
    managerId: String(row.managerId ?? ""),
    status: String(row.status).toLowerCase() === "inactive" ? "inactive" : "active",
    phone: String(row.phone ?? ""),
    email: String(row.email ?? ""),
    description: String(row.description ?? ""),
    totalProjects: Number(row.totalProjects ?? 0),
    activeProjects: Number(row.activeProjects ?? 0),
    completedProjects: Number(row.completedProjects ?? 0),
    delayedProjects: Number(row.delayedProjects ?? 0),
    customers: Number(row.customers ?? 0),
    providers: Number(row.providers ?? 0),
    revenue: Number(row.revenue ?? 0),
  }
}

function mapCustomer(row: Record<string, unknown>): AdminCustomer {
  const name = String(row.name ?? row.businessName ?? "Customer")
  return {
    id: String(row.id),
    name,
    business: String(row.business ?? row.businessName ?? ""),
    contact: String(row.contact ?? name),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    locationId: String(row.locationId ?? ""),
    type: (String(row.type ?? "new").toLowerCase() as AdminCustomer["type"]) || "new",
    status: String(row.status).toLowerCase() === "inactive" ? "inactive" : "active",
    joined: row.joined ? new Date(String(row.joined)).toLocaleDateString("en-IN") : "",
    spend: Number(row.spend ?? 0),
    activeProjects: Number(row.activeProjects ?? 0),
    initials: String(row.initials ?? initials(name)),
  }
}

function mapProvider(row: Record<string, unknown>): AdminProvider {
  const name = String(row.name ?? row.businessName ?? "Provider")
  const status = String(row.status ?? "active").toLowerCase()
  return {
    id: String(row.id),
    name,
    contactName: String(row.contactName ?? ""),
    category: String(row.category ?? row.profession ?? ""),
    locationIds: Array.isArray(row.locationIds) ? row.locationIds.map(String) : [],
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.reviewCount ?? 0),
    completedProjects: Number(row.completedProjects ?? 0),
    activeProjects: Number(row.activeProjects ?? 0),
    earnings: Number(row.earnings ?? 0),
    status: (status === "pending" || status === "suspended" || status === "inactive" ? status : "active") as AdminProvider["status"],
    responseTime: String(row.responseTime ?? "—"),
    onTime: Number(row.onTime ?? 0),
    responseRate: Number(row.responseRate ?? 0),
    initials: String(row.initials ?? initials(name)),
    accent: String(row.accent ?? "#2454F5"),
    about: String(row.about ?? row.bio ?? ""),
  }
}

function mapManager(row: Record<string, unknown>): AdminManager {
  const name = String(row.name ?? "Manager")
  return {
    id: String(row.id),
    name,
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    role: "manager",
    locationIds: Array.isArray(row.locationIds) ? row.locationIds.map(String) : [],
    status: String(row.status).toLowerCase() === "inactive" ? "inactive" : "active",
    joined: row.joined ? new Date(String(row.joined)).toLocaleDateString("en-IN") : "",
    initials: initials(name),
    accent: "#2454F5",
    performance: 0,
    satisfaction: 0,
  }
}

function mapProject(row: Record<string, unknown>): AdminProject {
  const deadline = row.deadline ? String(row.deadline).slice(0, 10) : ""
  return {
    id: String(row.id),
    code: String(row.code ?? row.projectNumber ?? ""),
    name: String(row.name ?? row.title ?? "Project"),
    customerId: String(row.customerId ?? ""),
    providerId: row.providerId ? String(row.providerId) : null,
    managerId: String(row.managerId ?? ""),
    locationId: String(row.locationId ?? ""),
    serviceId: String(row.serviceId ?? ""),
    status: projectStatus(String(row.status ?? "")),
    priority: (["low", "medium", "high", "urgent"].includes(String(row.priority)) ? row.priority : "medium") as AdminProject["priority"],
    value: Number(row.value ?? 0),
    createdAt: row.createdAt ? String(row.createdAt).slice(0, 10) : "",
    deadline,
    progress: Number(row.progress ?? 0),
    paymentStatus: (["unpaid", "partial", "paid", "refunded"].includes(String(row.paymentStatus)) ? row.paymentStatus : "unpaid") as AdminProject["paymentStatus"],
    health: (["on-track", "at-risk", "delayed", "not-started"].includes(String(row.health)) ? row.health : "on-track") as AdminProject["health"],
    daysRemaining: deadline ? Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000) : 0,
    timeline: [],
    files: [],
    internalNotes: [],
    activity: [],
  }
}
