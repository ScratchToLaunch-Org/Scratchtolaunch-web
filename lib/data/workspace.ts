import type { LaunchStatus, ProjectStatus } from "@/lib/types"

export const launchChecklist: {
  id: string
  title: string
  status: LaunchStatus
  provider: string
  deadline: string
  action: { label: string; href: string }
}[] = [
  {
    id: "registration",
    title: "Business registration",
    status: "done",
    provider: "Lexora Legal",
    deadline: "Completed 12 Sep",
    action: { label: "View", href: "/dashboard/documents" },
  },
  {
    id: "brand",
    title: "Brand identity",
    status: "done",
    provider: "Studio Arka",
    deadline: "Completed 16 Sep",
    action: { label: "View files", href: "/dashboard/documents" },
  },
  {
    id: "website",
    title: "Website",
    status: "in-progress",
    provider: "Rahul Web Studio",
    deadline: "Due 24 Sep",
    action: { label: "Open project", href: "/dashboard/projects/website-development" },
  },
  {
    id: "payments",
    title: "Payment gateway",
    status: "upcoming",
    provider: "Unassigned",
    deadline: "Starts after website",
    action: { label: "Book", href: "/services/payment-gateway-setup" },
  },
  {
    id: "gbp",
    title: "Google Business",
    status: "upcoming",
    provider: "Unassigned",
    deadline: "Not scheduled",
    action: { label: "Book", href: "/services/google-business-profile" },
  },
  {
    id: "marketing",
    title: "Marketing",
    status: "upcoming",
    provider: "Unassigned",
    deadline: "Not scheduled",
    action: { label: "Book", href: "/services?category=marketing" },
  },
]

export const customerProjects = [
  {
    id: "website-development",
    title: "Website Development",
    provider: "Rahul Web Studio",
    providerSlug: "rahul-web-studio",
    status: "development" as ProjectStatus,
    statusLabel: "In progress",
    due: "24 Sep 2026",
    payment: "50% received · 50% on launch",
    timeline: ["Brief", "Design", "Development", "Review", "Launch"] as const,
    currentIndex: 2,
    milestones: [
      { name: "Brief signed", done: true, date: "10 Sep" },
      { name: "Design approved", done: true, date: "16 Sep" },
      { name: "Development", done: false, date: "24 Sep" },
      { name: "Review", done: false, date: "26 Sep" },
      { name: "Launch", done: false, date: "28 Sep" },
    ],
    files: [
      { name: "Homepage-v2.png", size: "1.4 MB", type: "Image" },
      { name: "Sitemap.pdf", size: "220 KB", type: "PDF" },
    ],
  },
  {
    id: "brand-identity",
    title: "Brand identity",
    provider: "Studio Arka",
    providerSlug: "studio-arka",
    status: "completed" as ProjectStatus,
    statusLabel: "Completed",
    due: "16 Sep 2026",
    payment: "Paid in full",
    timeline: ["Brief", "Design", "Development", "Review", "Launch"] as const,
    currentIndex: 4,
    milestones: [
      { name: "Brief signed", done: true, date: "4 Sep" },
      { name: "Directions", done: true, date: "9 Sep" },
      { name: "Final files", done: true, date: "16 Sep" },
    ],
    files: [{ name: "Northstar-Brand.zip", size: "18 MB", type: "Archive" }],
  },
]

export const documents = [
  {
    id: "gst",
    title: "GST certificate",
    type: "Certificate",
    updated: "12 Sep 2026",
    status: "Available",
  },
  {
    id: "registration",
    title: "Business registration",
    type: "Certificate",
    updated: "8 Sep 2026",
    status: "Available",
  },
  {
    id: "invoice-website",
    title: "Invoice — Business website",
    type: "Invoice",
    updated: "10 Sep 2026",
    status: "Available",
  },
  {
    id: "agreement",
    title: "Service agreement",
    type: "Agreement",
    updated: "9 Sep 2026",
    status: "Available",
  },
  {
    id: "brand-files",
    title: "Brand files",
    type: "Brand files",
    updated: "16 Sep 2026",
    status: "Available",
  },
  {
    id: "credentials",
    title: "Website credentials",
    type: "Access note",
    updated: "—",
    status: "Placeholder",
  },
]

export const conversations = [
  {
    id: "rahul",
    name: "Rahul Web Studio",
    preview: "Homepage v2 is in the files tab.",
    time: "2:14 PM",
    unread: 1,
    messages: [
      {
        id: "m1",
        from: "provider" as const,
        type: "text" as const,
        text: "Brief received. We’ll share two homepage directions by Friday.",
        time: "10 Sep, 11:04 AM",
      },
      {
        id: "m2",
        from: "customer" as const,
        type: "text" as const,
        text: "Please keep WhatsApp on every page, not only contact.",
        time: "10 Sep, 11:22 AM",
      },
      {
        id: "m3",
        from: "system" as const,
        type: "milestone" as const,
        text: "Milestone complete — Design approved",
        time: "16 Sep, 4:10 PM",
      },
      {
        id: "m4",
        from: "provider" as const,
        type: "file" as const,
        text: "Homepage-v2.png",
        time: "19 Sep, 2:14 PM",
      },
      {
        id: "m5",
        from: "provider" as const,
        type: "text" as const,
        text: "Homepage v2 is in the files tab. Development starts tomorrow if this is the direction.",
        time: "19 Sep, 2:14 PM",
      },
    ],
  },
  {
    id: "arka",
    name: "Studio Arka",
    preview: "Final files uploaded to Documents.",
    time: "16 Sep",
    unread: 0,
    messages: [
      {
        id: "a1",
        from: "provider" as const,
        type: "text" as const,
        text: "Two logo directions are ready. The wordmark is the stronger one for labels.",
        time: "9 Sep, 6:02 PM",
      },
      {
        id: "a2",
        from: "system" as const,
        type: "payment" as const,
        text: "Payment received — Brand identity",
        time: "16 Sep, 1:40 PM",
      },
    ],
  },
]

export const payments = [
  {
    id: "p1",
    title: "Brand identity",
    provider: "Studio Arka",
    amount: 8999,
    status: "Paid",
    date: "16 Sep 2026",
  },
  {
    id: "p2",
    title: "Business website — 50% start",
    provider: "Rahul Web Studio",
    amount: 4000,
    status: "Paid",
    date: "10 Sep 2026",
  },
  {
    id: "p3",
    title: "Business website — 50% launch",
    provider: "Rahul Web Studio",
    amount: 3999,
    status: "Due on launch",
    date: "24 Sep 2026",
  },
]

export const providerStats = {
  name: "Rahul",
  activeProjects: 6,
  newLeads: 4,
  completedProjects: 140,
  earnings: 84500,
}

export const providerLeads = [
  {
    id: "l1",
    name: "Meera Iyer",
    need: "Clinic website + WhatsApp",
    budget: "₹10K–₹25K",
    city: "Bengaluru",
    time: "Today",
  },
  {
    id: "l2",
    name: "Omar Sheikh",
    need: "Agency marketing site",
    budget: "₹25K–₹50K",
    city: "Hyderabad",
    time: "Yesterday",
  },
  {
    id: "l3",
    name: "Kavya Nair",
    need: "One-page launch site",
    budget: "Under ₹10K",
    city: "Kochi",
    time: "2 days ago",
  },
]

export const providerOrders = [
  {
    id: "o1",
    client: "Northstar Apparel",
    service: "Business website",
    status: "In progress",
    due: "24 Sep",
    amount: 7999,
  },
  {
    id: "o2",
    client: "Harbour Dental",
    service: "Business website",
    status: "Review",
    due: "21 Sep",
    amount: 9999,
  },
  {
    id: "o3",
    client: "Ply Studio",
    service: "WhatsApp setup",
    status: "Completed",
    due: "12 Sep",
    amount: 1499,
  },
]

export function getProject(id: string) {
  return customerProjects.find((item) => item.id === id)
}
