export type DemoRoleId = "owner" | "admin" | "manager-pune" | "manager-mumbai"

export type StaffRole =
  | "owner"
  | "admin"
  | "operations"
  | "manager"
  | "finance"
  | "support"

export type LocationStatus = "active" | "inactive"

export type ProviderStatus = "active" | "pending" | "suspended" | "inactive"

export type CustomerStatus = "active" | "inactive"

export type AdminProjectStatus =
  | "new"
  | "assigned"
  | "in-progress"
  | "review"
  | "completed"
  | "delayed"

export type ProjectHealth = "on-track" | "at-risk" | "delayed" | "not-started"

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded"

export type Priority = "low" | "medium" | "high" | "urgent"

export type AttentionLevel = "critical" | "warning" | "info" | "success"

export type AdminLocation = {
  id: string
  name: string
  city: string
  state: string
  managerId: string
  status: LocationStatus
  phone: string
  email: string
  description: string
  totalProjects: number
  activeProjects: number
  completedProjects: number
  delayedProjects: number
  customers: number
  providers: number
  revenue: number
}

export type AdminManager = {
  id: string
  name: string
  email: string
  phone: string
  role: "manager"
  locationIds: string[]
  status: "active" | "inactive"
  joined: string
  initials: string
  accent: string
  performance: number
  satisfaction: number
}

export type AdminTeamMember = {
  id: string
  name: string
  email: string
  role: StaffRole
  locationId: string | null
  status: "active" | "invited"
  lastActive: string
  initials: string
  permissions: string[]
}

export type AdminCustomer = {
  id: string
  name: string
  business: string
  contact: string
  email: string
  phone: string
  locationId: string
  type: "new" | "existing" | "enterprise"
  status: CustomerStatus
  joined: string
  spend: number
  activeProjects: number
  initials: string
}

export type AdminProvider = {
  id: string
  name: string
  contactName: string
  category: string
  locationIds: string[]
  rating: number
  reviewCount: number
  completedProjects: number
  activeProjects: number
  earnings: number
  status: ProviderStatus
  responseTime: string
  onTime: number
  responseRate: number
  initials: string
  accent: string
  about: string
}

export type AdminService = {
  id: string
  name: string
  category: string
  revenue: number
  projects: number
  avgValue: number
  avgDays: number
  rating: number
}

export type TimelineStage = {
  id: string
  title: string
  date: string | null
  owner: string
  status: "done" | "current" | "upcoming"
  notes: string
}

export type ActivityItem = {
  id: string
  at: string
  actor: string
  actorInitials: string
  text: string
  projectId?: string
}

export type ProjectFile = {
  name: string
  type: string
  size: string
}

export type AdminProject = {
  id: string
  code: string
  name: string
  customerId: string
  providerId: string | null
  managerId: string
  locationId: string
  serviceId: string
  status: AdminProjectStatus
  priority: Priority
  value: number
  createdAt: string
  deadline: string
  progress: number
  paymentStatus: PaymentStatus
  health: ProjectHealth
  daysRemaining: number
  timeline: TimelineStage[]
  files: ProjectFile[]
  internalNotes: { at: string; author: string; body: string }[]
  activity: ActivityItem[]
}

export type AttentionItem = {
  id: string
  level: AttentionLevel
  title: string
  detail: string
  href: string
  cta: string
  locationId: string
}

export type AdminNotification = {
  id: string
  level: AttentionLevel
  title: string
  href: string
  time: string
}

export type DemoAccount = {
  id: DemoRoleId
  label: string
  name: string
  title: string
  role: StaffRole
  locationId: string | null
  email: string
  phone: string
  joined: string
  lastLogin: string
  initials: string
}
