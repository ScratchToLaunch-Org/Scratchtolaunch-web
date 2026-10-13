import type {
  ActivityItem,
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
  DemoAccount,
  PaymentStatus,
  Priority,
  ProjectHealth,
  TimelineStage,
} from "@/lib/admin/types"

export const demoAccounts: DemoAccount[] = [
  {
    id: "owner",
    label: "Owner",
    name: "Founder",
    title: "Owner / CEO",
    role: "owner",
    locationId: null,
    email: "founder@scratchtolaunch.in",
    phone: "+91 98765 00001",
    joined: "2025-11-02",
    lastLogin: "Today, 8:04 AM",
    initials: "FO",
  },
  {
    id: "admin",
    label: "Admin",
    name: "Kavita Rao",
    title: "Super Admin",
    role: "admin",
    locationId: null,
    email: "kavita@scratchtolaunch.in",
    phone: "+91 98765 00002",
    joined: "2026-01-14",
    lastLogin: "Today, 7:51 AM",
    initials: "KR",
  },
  {
    id: "manager-pune",
    label: "Pune Manager",
    name: "Amit Sharma",
    title: "Pune Location Manager",
    role: "manager",
    locationId: "pune",
    email: "amit.sharma@scratchtolaunch.in",
    phone: "+91 98765 11011",
    joined: "2026-02-03",
    lastLogin: "Today, 8:12 AM",
    initials: "AS",
  },
  {
    id: "manager-mumbai",
    label: "Mumbai Manager",
    name: "Priya Shah",
    title: "Mumbai Location Manager",
    role: "manager",
    locationId: "mumbai",
    email: "priya.shah@scratchtolaunch.in",
    phone: "+91 98765 22022",
    joined: "2026-02-11",
    lastLogin: "Yesterday, 6:40 PM",
    initials: "PS",
  },
]

export const adminLocations: AdminLocation[] = [
  {
    id: "pune",
    name: "Pune",
    city: "Pune",
    state: "Maharashtra",
    managerId: "amit-sharma",
    status: "active",
    phone: "+91 20 4000 1100",
    email: "pune@scratchtolaunch.in",
    description: "West India hub for D2C, professional services and first-time founders.",
    totalProjects: 84,
    activeProjects: 28,
    completedProjects: 48,
    delayedProjects: 3,
    customers: 71,
    providers: 32,
    revenue: 640000,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    managerId: "priya-shah",
    status: "active",
    phone: "+91 22 4000 2200",
    email: "mumbai@scratchtolaunch.in",
    description: "Highest ticket services — agencies, clinics and established local brands.",
    totalProjects: 71,
    activeProjects: 21,
    completedProjects: 44,
    delayedProjects: 2,
    customers: 63,
    providers: 28,
    revenue: 510000,
  },
  {
    id: "nashik",
    name: "Nashik",
    city: "Nashik",
    state: "Maharashtra",
    managerId: "rahul-patil",
    status: "active",
    phone: "+91 253 400 3300",
    email: "nashik@scratchtolaunch.in",
    description: "Wine, manufacturing and professional practices across north Maharashtra.",
    totalProjects: 43,
    activeProjects: 14,
    completedProjects: 26,
    delayedProjects: 4,
    customers: 39,
    providers: 16,
    revenue: 320000,
  },
  {
    id: "nagpur",
    name: "Nagpur",
    city: "Nagpur",
    state: "Maharashtra",
    managerId: "sneha-joshi",
    status: "active",
    phone: "+91 712 400 4400",
    email: "nagpur@scratchtolaunch.in",
    description: "Logistics, clinics and trading businesses in Vidarbha.",
    totalProjects: 31,
    activeProjects: 8,
    completedProjects: 20,
    delayedProjects: 1,
    customers: 27,
    providers: 12,
    revenue: 240000,
  },
  {
    id: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    city: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    managerId: "vikram-deshmukh",
    status: "active",
    phone: "+91 240 400 5500",
    email: "csm@scratchtolaunch.in",
    description: "Tourism, crafts and local retail around Aurangabad.",
    totalProjects: 11,
    activeProjects: 2,
    completedProjects: 8,
    delayedProjects: 1,
    customers: 14,
    providers: 7,
    revenue: 80000,
  },
  {
    id: "kolhapur",
    name: "Kolhapur",
    city: "Kolhapur",
    state: "Maharashtra",
    managerId: "anjali-kulkarni",
    status: "active",
    phone: "+91 231 400 6600",
    email: "kolhapur@scratchtolaunch.in",
    description: "Leather, food and regional retail with a growing professional services book.",
    totalProjects: 8,
    activeProjects: 1,
    completedProjects: 7,
    delayedProjects: 0,
    customers: 11,
    providers: 6,
    revenue: 50000,
  },
]

export const adminManagers: AdminManager[] = [
  {
    id: "amit-sharma",
    name: "Amit Sharma",
    email: "amit.sharma@scratchtolaunch.in",
    phone: "+91 98765 11011",
    role: "manager",
    locationIds: ["pune"],
    status: "active",
    joined: "2026-02-03",
    initials: "AS",
    accent: "#2454F5",
    performance: 94,
    satisfaction: 4.8,
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    email: "priya.shah@scratchtolaunch.in",
    phone: "+91 98765 22022",
    role: "manager",
    locationIds: ["mumbai"],
    status: "active",
    joined: "2026-02-11",
    initials: "PS",
    accent: "#0F766E",
    performance: 91,
    satisfaction: 4.7,
  },
  {
    id: "rahul-patil",
    name: "Rahul Patil",
    email: "rahul.patil@scratchtolaunch.in",
    phone: "+91 98765 33033",
    role: "manager",
    locationIds: ["nashik"],
    status: "active",
    joined: "2026-03-02",
    initials: "RP",
    accent: "#B45309",
    performance: 82,
    satisfaction: 4.5,
  },
  {
    id: "sneha-joshi",
    name: "Sneha Joshi",
    email: "sneha.joshi@scratchtolaunch.in",
    phone: "+91 98765 44044",
    role: "manager",
    locationIds: ["nagpur"],
    status: "active",
    joined: "2026-03-18",
    initials: "SJ",
    accent: "#7C3AED",
    performance: 89,
    satisfaction: 4.6,
  },
  {
    id: "vikram-deshmukh",
    name: "Vikram Deshmukh",
    email: "vikram.deshmukh@scratchtolaunch.in",
    phone: "+91 98765 55055",
    role: "manager",
    locationIds: ["chhatrapati-sambhajinagar"],
    status: "active",
    joined: "2026-04-09",
    initials: "VD",
    accent: "#0E7490",
    performance: 86,
    satisfaction: 4.4,
  },
  {
    id: "anjali-kulkarni",
    name: "Anjali Kulkarni",
    email: "anjali.kulkarni@scratchtolaunch.in",
    phone: "+91 98765 66066",
    role: "manager",
    locationIds: ["kolhapur"],
    status: "active",
    joined: "2026-05-01",
    initials: "AK",
    accent: "#BE185D",
    performance: 93,
    satisfaction: 4.7,
  },
]

export const adminTeam: AdminTeamMember[] = [
  {
    id: "founder",
    name: "Founder",
    email: "founder@scratchtolaunch.in",
    role: "owner",
    locationId: null,
    status: "active",
    lastActive: "Online",
    initials: "FO",
    permissions: ["all"],
  },
  {
    id: "kavita-rao",
    name: "Kavita Rao",
    email: "kavita@scratchtolaunch.in",
    role: "admin",
    locationId: null,
    status: "active",
    lastActive: "12 min ago",
    initials: "KR",
    permissions: ["locations", "users", "projects", "finance"],
  },
  {
    id: "dev-iyer",
    name: "Dev Iyer",
    email: "dev.iyer@scratchtolaunch.in",
    role: "operations",
    locationId: null,
    status: "active",
    lastActive: "1 hr ago",
    initials: "DI",
    permissions: ["projects", "providers", "alerts"],
  },
  {
    id: "meera-finance",
    name: "Meera Nair",
    email: "meera.nair@scratchtolaunch.in",
    role: "finance",
    locationId: null,
    status: "active",
    lastActive: "Today, 9:20 AM",
    initials: "MN",
    permissions: ["finance", "payouts", "reports"],
  },
  {
    id: "sara-support",
    name: "Sara D'Souza",
    email: "sara@scratchtolaunch.in",
    role: "support",
    locationId: null,
    status: "active",
    lastActive: "20 min ago",
    initials: "SD",
    permissions: ["customers", "messages", "tickets"],
  },
  ...adminManagers.map((manager) => ({
    id: manager.id,
    name: manager.name,
    email: manager.email,
    role: "manager" as const,
    locationId: manager.locationIds[0] ?? null,
    status: "active" as const,
    lastActive: "Today",
    initials: manager.initials,
    permissions: ["projects", "customers", "providers", "messages", "reports"],
  })),
]

export const adminCustomers: AdminCustomer[] = [
  { id: "nova-studio", name: "Karan Bhosale", business: "Nova Studio", contact: "Karan Bhosale", email: "karan@novastudio.in", phone: "+91 98220 11101", locationId: "pune", type: "existing", status: "active", joined: "2026-06-12", spend: 42000, activeProjects: 2, initials: "NS" },
  { id: "rahul-foods", name: "Rahul Kulkarni", business: "Rahul Foods", contact: "Rahul Kulkarni", email: "rahul@rahulfoods.in", phone: "+91 98220 11102", locationId: "pune", type: "new", status: "active", joined: "2026-08-02", spend: 18000, activeProjects: 1, initials: "RF" },
  { id: "priya-boutique", name: "Priya More", business: "Priya Boutique", contact: "Priya More", email: "priya@boutique.in", phone: "+91 98220 11103", locationId: "pune", type: "existing", status: "active", joined: "2026-05-19", spend: 14500, activeProjects: 0, initials: "PB" },
  { id: "northstar-apparel", name: "Aditi Deshpande", business: "Northstar Apparel", contact: "Aditi Deshpande", email: "aditi@northstar.in", phone: "+91 98220 11104", locationId: "pune", type: "existing", status: "active", joined: "2026-04-08", spend: 74500, activeProjects: 1, initials: "NA" },
  { id: "ply-studio", name: "Rohan Joshi", business: "Ply Studio", contact: "Rohan Joshi", email: "rohan@ply.studio", phone: "+91 98220 11105", locationId: "pune", type: "new", status: "active", joined: "2026-09-01", spend: 8999, activeProjects: 1, initials: "PL" },
  { id: "abc-interiors", name: "Farhan Qureshi", business: "ABC Interiors", contact: "Farhan Qureshi", email: "farhan@abcinteriors.in", phone: "+91 98220 22201", locationId: "mumbai", type: "existing", status: "active", joined: "2026-03-22", spend: 56000, activeProjects: 1, initials: "AI" },
  { id: "harbour-dental", name: "Dr. Lina Mehta", business: "Harbour Dental", contact: "Lina Mehta", email: "lina@harbourdental.in", phone: "+91 98220 22202", locationId: "mumbai", type: "existing", status: "active", joined: "2026-01-30", spend: 32000, activeProjects: 1, initials: "HD" },
  { id: "coast-cafe", name: "Sana Kapoor", business: "Coast Cafe", contact: "Sana Kapoor", email: "sana@coastcafe.in", phone: "+91 98220 22203", locationId: "mumbai", type: "new", status: "active", joined: "2026-07-14", spend: 21000, activeProjects: 1, initials: "CC" },
  { id: "meera-clinic", name: "Dr. Meera Iyer", business: "Meera Clinic", contact: "Meera Iyer", email: "clinic@meera.in", phone: "+91 98220 22204", locationId: "mumbai", type: "existing", status: "active", joined: "2026-02-18", spend: 27500, activeProjects: 0, initials: "MC" },
  { id: "urban-kitchen", name: "Omar Sheikh", business: "Urban Kitchen", contact: "Omar Sheikh", email: "omar@urbankitchen.in", phone: "+91 98220 22205", locationId: "mumbai", type: "new", status: "active", joined: "2026-09-04", spend: 0, activeProjects: 1, initials: "UK" },
  { id: "grapevine-wines", name: "Nikhil Pawar", business: "Grapevine Wines", contact: "Nikhil Pawar", email: "nikhil@grapevine.in", phone: "+91 98220 33301", locationId: "nashik", type: "existing", status: "active", joined: "2026-04-21", spend: 38000, activeProjects: 1, initials: "GW" },
  { id: "godavari-textiles", name: "Savita Gite", business: "Godavari Textiles", contact: "Savita Gite", email: "savita@godavari.in", phone: "+91 98220 33302", locationId: "nashik", type: "existing", status: "active", joined: "2026-06-03", spend: 19000, activeProjects: 1, initials: "GT" },
  { id: "kavya-coaching", name: "Kavya Nair", business: "Kavya Coaching", contact: "Kavya Nair", email: "kavya@coaching.in", phone: "+91 98220 33303", locationId: "nashik", type: "new", status: "active", joined: "2026-08-19", spend: 12000, activeProjects: 1, initials: "KC" },
  { id: "orange-clinic", name: "Dr. Anuj Tiwari", business: "Orange City Clinic", contact: "Anuj Tiwari", email: "anuj@orangecity.in", phone: "+91 98220 44401", locationId: "nagpur", type: "existing", status: "active", joined: "2026-05-07", spend: 24000, activeProjects: 1, initials: "OC" },
  { id: "vidarbha-logistics", name: "Harshad Raut", business: "Vidarbha Logistics", contact: "Harshad Raut", email: "harshad@vidarbha.in", phone: "+91 98220 44402", locationId: "nagpur", type: "existing", status: "active", joined: "2026-03-11", spend: 41000, activeProjects: 1, initials: "VL" },
  { id: "steel-nagpur", name: "Pallavi Banerjee", business: "Steel Nagpur Works", contact: "Pallavi Banerjee", email: "pallavi@snw.in", phone: "+91 98220 44403", locationId: "nagpur", type: "new", status: "active", joined: "2026-09-06", spend: 6999, activeProjects: 1, initials: "SN" },
  { id: "ellora-tours", name: "Imran Shaikh", business: "Ellora Tours", contact: "Imran Shaikh", email: "imran@elloratours.in", phone: "+91 98220 55501", locationId: "chhatrapati-sambhajinagar", type: "existing", status: "active", joined: "2026-06-28", spend: 16000, activeProjects: 1, initials: "ET" },
  { id: "ajanta-crafts", name: "Leena Jadhav", business: "Ajanta Crafts", contact: "Leena Jadhav", email: "leena@ajanta.in", phone: "+91 98220 55502", locationId: "chhatrapati-sambhajinagar", type: "new", status: "active", joined: "2026-08-30", spend: 4500, activeProjects: 0, initials: "AC" },
  { id: "sambhaji-mart", name: "Yogesh Kale", business: "Sambhaji Mart", contact: "Yogesh Kale", email: "yogesh@sambhajimart.in", phone: "+91 98220 55503", locationId: "chhatrapati-sambhajinagar", type: "new", status: "inactive", joined: "2026-07-02", spend: 2499, activeProjects: 0, initials: "SM" },
  { id: "kolhapuri-atelier", name: "Rutuja Patil", business: "Kolhapuri Atelier", contact: "Rutuja Patil", email: "rutuja@atelier.in", phone: "+91 98220 66601", locationId: "kolhapur", type: "existing", status: "active", joined: "2026-05-25", spend: 22000, activeProjects: 1, initials: "KA" },
  { id: "heritage-leather", name: "Sandeep Chavan", business: "Heritage Leather", contact: "Sandeep Chavan", email: "sandeep@heritage.in", phone: "+91 98220 66602", locationId: "kolhapur", type: "existing", status: "active", joined: "2026-04-16", spend: 17500, activeProjects: 0, initials: "HL" },
  { id: "wm-agri", name: "Gauri Bhosale", business: "Western Maharashtra Agri", contact: "Gauri Bhosale", email: "gauri@wmagri.in", phone: "+91 98220 66603", locationId: "kolhapur", type: "new", status: "active", joined: "2026-09-10", spend: 0, activeProjects: 1, initials: "WA" },
]

export const adminProviders: AdminProvider[] = [
  { id: "webcraft", name: "WebCraft Studio", contactName: "Rahul Mehta", category: "Web Dev", locationIds: ["pune"], rating: 4.9, reviewCount: 86, completedProjects: 124, activeProjects: 6, earnings: 280000, status: "active", responseTime: "2.1 hours", onTime: 94, responseRate: 98, initials: "WM", accent: "#2454F5", about: "Marketing sites and WhatsApp-ready builds for first-time founders in Pune." },
  { id: "ca-partners", name: "CA Partners", contactName: "Neha Kulkarni", category: "CA", locationIds: ["pune", "nashik"], rating: 4.8, reviewCount: 64, completedProjects: 210, activeProjects: 9, earnings: 195000, status: "active", responseTime: "Same day", onTime: 91, responseRate: 97, initials: "CP", accent: "#0F766E", about: "GST, books and founder tax for proprietors and Pvt Ltd companies." },
  { id: "designlab", name: "DesignLab", contactName: "Arjun Rao", category: "Branding", locationIds: ["pune"], rating: 4.9, reviewCount: 51, completedProjects: 98, activeProjects: 4, earnings: 142000, status: "active", responseTime: "3.4 hours", onTime: 96, responseRate: 95, initials: "DL", accent: "#B45309", about: "Identity systems that hold up on packaging and Instagram." },
  { id: "growthlane-west", name: "Growthlane West", contactName: "Isha Verma", category: "SEO", locationIds: ["pune", "mumbai"], rating: 4.8, reviewCount: 73, completedProjects: 156, activeProjects: 8, earnings: 168000, status: "active", responseTime: "2.8 hours", onTime: 88, responseRate: 94, initials: "GW", accent: "#C2410C", about: "Local SEO and Google Business foundations. No ranking promises." },
  { id: "meera-ca", name: "Meera Shah & Co.", contactName: "Meera Shah", category: "CA", locationIds: ["mumbai"], rating: 4.8, reviewCount: 90, completedProjects: 188, activeProjects: 11, earnings: 420000, status: "active", responseTime: "Under 3 hours", onTime: 93, responseRate: 99, initials: "MS", accent: "#0E7490", about: "GST and incorporation assistance for Mumbai service businesses." },
  { id: "harbour-web", name: "Harbour Web", contactName: "Nikhil D'Souza", category: "Web Dev", locationIds: ["mumbai"], rating: 4.7, reviewCount: 41, completedProjects: 67, activeProjects: 5, earnings: 210000, status: "active", responseTime: "4.0 hours", onTime: 84, responseRate: 90, initials: "HW", accent: "#1D4ED8", about: "Clinic and hospitality websites with appointment WhatsApp." },
  { id: "voicebox-west", name: "Voicebox West", contactName: "Tara Menon", category: "Marketing", locationIds: ["mumbai", "pune"], rating: 4.7, reviewCount: 39, completedProjects: 72, activeProjects: 3, earnings: 98000, status: "active", responseTime: "5 hours", onTime: 90, responseRate: 92, initials: "VW", accent: "#7C3AED", about: "Launch-week social kits and profile setup." },
  { id: "nashik-ledger", name: "Nashik Ledger", contactName: "Sagar Pawar", category: "CA", locationIds: ["nashik"], rating: 4.6, reviewCount: 28, completedProjects: 54, activeProjects: 7, earnings: 76000, status: "active", responseTime: "6 hours", onTime: 79, responseRate: 88, initials: "NL", accent: "#365314", about: "Books and GST for manufacturing and wine-adjacent businesses." },
  { id: "godavari-digital", name: "Godavari Digital", contactName: "Pooja Shinde", category: "Web Dev", locationIds: ["nashik"], rating: 4.5, reviewCount: 19, completedProjects: 31, activeProjects: 4, earnings: 54000, status: "active", responseTime: "8 hours", onTime: 74, responseRate: 81, initials: "GD", accent: "#9A3412", about: "Catalogue sites for textiles and local retail." },
  { id: "orange-web", name: "Orange Web Co.", contactName: "Aditya Khot", category: "Web Dev", locationIds: ["nagpur"], rating: 4.8, reviewCount: 22, completedProjects: 40, activeProjects: 3, earnings: 72000, status: "active", responseTime: "3 hours", onTime: 92, responseRate: 96, initials: "OW", accent: "#EA580C", about: "Clinic and logistics sites for Vidarbha operators." },
  { id: "vidarbha-ca", name: "Vidarbha CA Desk", contactName: "Ritika Jaiswal", category: "CA", locationIds: ["nagpur"], rating: 4.7, reviewCount: 33, completedProjects: 70, activeProjects: 4, earnings: 88000, status: "active", responseTime: "Same day", onTime: 90, responseRate: 95, initials: "VC", accent: "#166534", about: "GST and MSME filings for traders." },
  { id: "ellora-brand", name: "Ellora Brand", contactName: "Ayesha Khan", category: "Branding", locationIds: ["chhatrapati-sambhajinagar"], rating: 4.6, reviewCount: 14, completedProjects: 22, activeProjects: 2, earnings: 31000, status: "active", responseTime: "1 day", onTime: 85, responseRate: 87, initials: "EB", accent: "#7C2D12", about: "Craft and tourism identities." },
  { id: "kolhapur-pixel", name: "Kolhapur Pixel", contactName: "Omkar Powar", category: "Web Dev", locationIds: ["kolhapur"], rating: 4.7, reviewCount: 16, completedProjects: 27, activeProjects: 2, earnings: 36000, status: "active", responseTime: "5 hours", onTime: 89, responseRate: 93, initials: "KP", accent: "#1E3A8A", about: "Retail and leather-brand websites." },
  { id: "pending-seo-pune", name: "Summit SEO", contactName: "Varun Iyer", category: "SEO", locationIds: ["pune"], rating: 0, reviewCount: 0, completedProjects: 0, activeProjects: 0, earnings: 0, status: "pending", responseTime: "—", onTime: 0, responseRate: 0, initials: "SS", accent: "#57534E", about: "Awaiting sample work and identity check." },
  { id: "pending-legal-mumbai", name: "Dockside Legal", contactName: "Rhea Pinto", category: "Legal", locationIds: ["mumbai"], rating: 0, reviewCount: 0, completedProjects: 0, activeProjects: 0, earnings: 0, status: "pending", responseTime: "—", onTime: 0, responseRate: 0, initials: "DK", accent: "#44403C", about: "Pending bar council document review." },
  { id: "pending-ads-nashik", name: "Harvest Ads", contactName: "Manoj Hire", category: "Marketing", locationIds: ["nashik"], rating: 0, reviewCount: 0, completedProjects: 0, activeProjects: 0, earnings: 0, status: "pending", responseTime: "—", onTime: 0, responseRate: 0, initials: "HA", accent: "#3F3F46", about: "Portfolio submitted. Awaiting ops interview." },
  { id: "pending-auto-pune", name: "Flowstack", contactName: "Nidhi Shah", category: "Automation", locationIds: ["pune"], rating: 0, reviewCount: 0, completedProjects: 0, activeProjects: 0, earnings: 0, status: "pending", responseTime: "—", onTime: 0, responseRate: 0, initials: "FS", accent: "#52525B", about: "Identity verified. Sample automation pending." },
  { id: "suspended-mumbai", name: "QuickSites", contactName: "Alok Jain", category: "Web Dev", locationIds: ["mumbai"], rating: 3.9, reviewCount: 11, completedProjects: 18, activeProjects: 0, earnings: 24000, status: "suspended", responseTime: "2 days", onTime: 61, responseRate: 54, initials: "QS", accent: "#7F1D1D", about: "Suspended after two missed deadlines. Review in October." },
]

export const adminServices: AdminService[] = [
  { id: "website", name: "Website Development", category: "Website", revenue: 480000, projects: 64, avgValue: 15000, avgDays: 8, rating: 4.8 },
  { id: "ca", name: "CA Services", category: "Finance", revenue: 320000, projects: 81, avgValue: 4500, avgDays: 5, rating: 4.7 },
  { id: "branding", name: "Branding", category: "Brand", revenue: 180000, projects: 42, avgValue: 11000, avgDays: 9, rating: 4.9 },
  { id: "seo", name: "SEO", category: "Marketing", revenue: 140000, projects: 28, avgValue: 7000, avgDays: 10, rating: 4.6 },
  { id: "gst", name: "GST Registration", category: "Business setup", revenue: 90000, projects: 54, avgValue: 2500, avgDays: 4, rating: 4.8 },
  { id: "ecommerce", name: "E-commerce", category: "Website", revenue: 210000, projects: 16, avgValue: 26000, avgDays: 16, rating: 4.7 },
  { id: "legal", name: "Legal documentation", category: "Legal", revenue: 70000, projects: 19, avgValue: 7000, avgDays: 6, rating: 4.5 },
  { id: "gbp", name: "Google Business", category: "Marketing", revenue: 45000, projects: 22, avgValue: 2500, avgDays: 3, rating: 4.9 },
]

type ProjectSeed = {
  id: string
  code: string
  name: string
  customerId: string
  providerId: string | null
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
}

const seeds: ProjectSeed[] = [
  { id: "nova-website", code: "STL-2026-00482", name: "Website Development", customerId: "nova-studio", providerId: "webcraft", serviceId: "website", status: "in-progress", priority: "high", value: 18000, createdAt: "2026-09-12", deadline: "2026-09-28", progress: 64, paymentStatus: "partial", health: "on-track", daysRemaining: 9 },
  { id: "nova-branding", code: "STL-2026-00441", name: "Branding", customerId: "nova-studio", providerId: "designlab", serviceId: "branding", status: "review", priority: "medium", value: 12000, createdAt: "2026-09-04", deadline: "2026-09-25", progress: 82, paymentStatus: "paid", health: "on-track", daysRemaining: 6 },
  { id: "rahul-website", code: "STL-2026-00501", name: "Website Development", customerId: "rahul-foods", providerId: "webcraft", serviceId: "website", status: "delayed", priority: "urgent", value: 18000, createdAt: "2026-09-01", deadline: "2026-09-16", progress: 48, paymentStatus: "partial", health: "delayed", daysRemaining: -3 },
  { id: "rahul-quote", code: "STL-2026-00522", name: "GST + website quotation", customerId: "rahul-foods", providerId: null, serviceId: "gst", status: "new", priority: "high", value: 0, createdAt: "2026-09-18", deadline: "2026-09-22", progress: 8, paymentStatus: "unpaid", health: "at-risk", daysRemaining: 3 },
  { id: "priya-gst", code: "STL-2026-00410", name: "GST Registration", customerId: "priya-boutique", providerId: "ca-partners", serviceId: "gst", status: "completed", priority: "medium", value: 4500, createdAt: "2026-09-08", deadline: "2026-09-21", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: 2 },
  { id: "northstar-ecom", code: "STL-2026-00388", name: "E-commerce website", customerId: "northstar-apparel", providerId: "webcraft", serviceId: "ecommerce", status: "in-progress", priority: "high", value: 24999, createdAt: "2026-08-28", deadline: "2026-10-04", progress: 55, paymentStatus: "partial", health: "on-track", daysRemaining: 15 },
  { id: "ply-brand", code: "STL-2026-00510", name: "Logo + brand kit", customerId: "ply-studio", providerId: "designlab", serviceId: "branding", status: "assigned", priority: "medium", value: 8999, createdAt: "2026-09-14", deadline: "2026-09-27", progress: 20, paymentStatus: "paid", health: "on-track", daysRemaining: 8 },
  { id: "abc-seo", code: "STL-2026-00490", name: "SEO foundation", customerId: "abc-interiors", providerId: "growthlane-west", serviceId: "seo", status: "in-progress", priority: "medium", value: 12000, createdAt: "2026-09-09", deadline: "2026-09-26", progress: 40, paymentStatus: "partial", health: "at-risk", daysRemaining: 7 },
  { id: "abc-web-delay", code: "STL-2026-00455", name: "Studio website", customerId: "abc-interiors", providerId: "harbour-web", serviceId: "website", status: "delayed", priority: "high", value: 22000, createdAt: "2026-08-20", deadline: "2026-09-12", progress: 61, paymentStatus: "partial", health: "delayed", daysRemaining: -7 },
  { id: "harbour-site", code: "STL-2026-00470", name: "Clinic website", customerId: "harbour-dental", providerId: "harbour-web", serviceId: "website", status: "review", priority: "medium", value: 16000, createdAt: "2026-09-02", deadline: "2026-09-21", progress: 88, paymentStatus: "paid", health: "on-track", daysRemaining: 2 },
  { id: "coast-gbp", code: "STL-2026-00499", name: "Google Business setup", customerId: "coast-cafe", providerId: "growthlane-west", serviceId: "gbp", status: "assigned", priority: "low", value: 2499, createdAt: "2026-09-15", deadline: "2026-09-23", progress: 18, paymentStatus: "unpaid", health: "on-track", daysRemaining: 4 },
  { id: "meera-ca", code: "STL-2026-00390", name: "Monthly bookkeeping", customerId: "meera-clinic", providerId: "meera-ca", serviceId: "ca", status: "completed", priority: "low", value: 4999, createdAt: "2026-08-01", deadline: "2026-09-10", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -9 },
  { id: "urban-quote", code: "STL-2026-00530", name: "Launch website", customerId: "urban-kitchen", providerId: null, serviceId: "website", status: "new", priority: "high", value: 0, createdAt: "2026-09-19", deadline: "2026-09-24", progress: 5, paymentStatus: "unpaid", health: "not-started", daysRemaining: 5 },
  { id: "grapevine-web", code: "STL-2026-00420", name: "Estate website", customerId: "grapevine-wines", providerId: "godavari-digital", serviceId: "website", status: "in-progress", priority: "medium", value: 19000, createdAt: "2026-09-05", deadline: "2026-09-30", progress: 36, paymentStatus: "partial", health: "at-risk", daysRemaining: 11 },
  { id: "grapevine-gst", code: "STL-2026-00421", name: "GST assistance", customerId: "grapevine-wines", providerId: "nashik-ledger", serviceId: "gst", status: "delayed", priority: "high", value: 3500, createdAt: "2026-08-22", deadline: "2026-09-10", progress: 70, paymentStatus: "paid", health: "delayed", daysRemaining: -9 },
  { id: "godavari-ecom", code: "STL-2026-00460", name: "Catalogue store", customerId: "godavari-textiles", providerId: "godavari-digital", serviceId: "ecommerce", status: "in-progress", priority: "high", value: 28000, createdAt: "2026-09-01", deadline: "2026-10-08", progress: 44, paymentStatus: "partial", health: "on-track", daysRemaining: 19 },
  { id: "kavya-site", code: "STL-2026-00505", name: "Coaching landing page", customerId: "kavya-coaching", providerId: "godavari-digital", serviceId: "website", status: "assigned", priority: "medium", value: 7999, createdAt: "2026-09-16", deadline: "2026-09-29", progress: 12, paymentStatus: "unpaid", health: "on-track", daysRemaining: 10 },
  { id: "kavya-delay", code: "STL-2026-00480", name: "Brand kit", customerId: "kavya-coaching", providerId: "ellora-brand", serviceId: "branding", status: "delayed", priority: "medium", value: 8000, createdAt: "2026-08-25", deadline: "2026-09-14", progress: 58, paymentStatus: "partial", health: "delayed", daysRemaining: -5 },
  { id: "orange-web", code: "STL-2026-00475", name: "Clinic website", customerId: "orange-clinic", providerId: "orange-web", serviceId: "website", status: "review", priority: "medium", value: 14000, createdAt: "2026-09-03", deadline: "2026-09-24", progress: 90, paymentStatus: "paid", health: "on-track", daysRemaining: 5 },
  { id: "vidarbha-ca", code: "STL-2026-00430", name: "GST + invoicing", customerId: "vidarbha-logistics", providerId: "vidarbha-ca", serviceId: "ca", status: "in-progress", priority: "medium", value: 6500, createdAt: "2026-09-07", deadline: "2026-09-26", progress: 50, paymentStatus: "partial", health: "on-track", daysRemaining: 7 },
  { id: "vidarbha-web", code: "STL-2026-00370", name: "Fleet landing page", customerId: "vidarbha-logistics", providerId: "orange-web", serviceId: "website", status: "completed", priority: "low", value: 11000, createdAt: "2026-07-20", deadline: "2026-08-18", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -32 },
  { id: "steel-legal", code: "STL-2026-00518", name: "Founder agreements", customerId: "steel-nagpur", providerId: "vidarbha-ca", serviceId: "legal", status: "assigned", priority: "high", value: 6999, createdAt: "2026-09-17", deadline: "2026-10-01", progress: 15, paymentStatus: "unpaid", health: "not-started", daysRemaining: 12 },
  { id: "ellora-web", code: "STL-2026-00485", name: "Tours website", customerId: "ellora-tours", providerId: "ellora-brand", serviceId: "website", status: "in-progress", priority: "medium", value: 12500, createdAt: "2026-09-08", deadline: "2026-09-30", progress: 42, paymentStatus: "partial", health: "on-track", daysRemaining: 11 },
  { id: "ajanta-gst", code: "STL-2026-00500", name: "GST registration", customerId: "ajanta-crafts", providerId: "ca-partners", serviceId: "gst", status: "completed", priority: "low", value: 2499, createdAt: "2026-09-11", deadline: "2026-09-18", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -1 },
  { id: "sambhaji-delay", code: "STL-2026-00440", name: "Retail website", customerId: "sambhaji-mart", providerId: "ellora-brand", serviceId: "website", status: "delayed", priority: "medium", value: 9000, createdAt: "2026-08-12", deadline: "2026-09-05", progress: 33, paymentStatus: "refunded", health: "delayed", daysRemaining: -14 },
  { id: "atelier-web", code: "STL-2026-00495", name: "Lookbook website", customerId: "kolhapuri-atelier", providerId: "kolhapur-pixel", serviceId: "website", status: "in-progress", priority: "medium", value: 15000, createdAt: "2026-09-10", deadline: "2026-10-02", progress: 38, paymentStatus: "partial", health: "on-track", daysRemaining: 13 },
  { id: "heritage-brand", code: "STL-2026-00355", name: "Brand identity", customerId: "heritage-leather", providerId: "designlab", serviceId: "branding", status: "completed", priority: "low", value: 12000, createdAt: "2026-07-02", deadline: "2026-07-28", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -53 },
  { id: "agri-gbp", code: "STL-2026-00528", name: "Google Business + site", customerId: "wm-agri", providerId: "kolhapur-pixel", serviceId: "gbp", status: "new", priority: "medium", value: 0, createdAt: "2026-09-18", deadline: "2026-09-27", progress: 6, paymentStatus: "unpaid", health: "not-started", daysRemaining: 8 },
  { id: "northstar-seo", code: "STL-2026-00412", name: "SEO starter", customerId: "northstar-apparel", providerId: "growthlane-west", serviceId: "seo", status: "completed", priority: "medium", value: 5999, createdAt: "2026-08-10", deadline: "2026-08-28", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -22 },
  { id: "ply-web", code: "STL-2026-00512", name: "Portfolio website", customerId: "ply-studio", providerId: "webcraft", serviceId: "website", status: "in-progress", priority: "medium", value: 14000, createdAt: "2026-09-15", deadline: "2026-10-05", progress: 28, paymentStatus: "unpaid", health: "on-track", daysRemaining: 16 },
  { id: "coast-brand", code: "STL-2026-00466", name: "Cafe identity", customerId: "coast-cafe", providerId: "voicebox-west", serviceId: "branding", status: "review", priority: "low", value: 10000, createdAt: "2026-09-01", deadline: "2026-09-22", progress: 78, paymentStatus: "paid", health: "on-track", daysRemaining: 3 },
  { id: "harbour-seo", code: "STL-2026-00471", name: "Local SEO", customerId: "harbour-dental", providerId: "growthlane-west", serviceId: "seo", status: "assigned", priority: "low", value: 7999, createdAt: "2026-09-13", deadline: "2026-10-03", progress: 10, paymentStatus: "unpaid", health: "on-track", daysRemaining: 14 },
  { id: "rahul-gbp", code: "STL-2026-00502", name: "Google Business", customerId: "rahul-foods", providerId: "growthlane-west", serviceId: "gbp", status: "completed", priority: "low", value: 2499, createdAt: "2026-09-06", deadline: "2026-09-12", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -7 },
  { id: "nova-legal", code: "STL-2026-00483", name: "Client agreement pack", customerId: "nova-studio", providerId: "ca-partners", serviceId: "legal", status: "assigned", priority: "medium", value: 6999, createdAt: "2026-09-16", deadline: "2026-09-30", progress: 22, paymentStatus: "unpaid", health: "on-track", daysRemaining: 11 },
  { id: "abc-ca", code: "STL-2026-00491", name: "Books cleanup", customerId: "abc-interiors", providerId: "meera-ca", serviceId: "ca", status: "in-progress", priority: "medium", value: 8000, createdAt: "2026-09-11", deadline: "2026-09-29", progress: 35, paymentStatus: "partial", health: "on-track", daysRemaining: 10 },
  { id: "godavari-delay", code: "STL-2026-00415", name: "GST filing catch-up", customerId: "godavari-textiles", providerId: "nashik-ledger", serviceId: "ca", status: "delayed", priority: "urgent", value: 5500, createdAt: "2026-08-18", deadline: "2026-09-08", progress: 62, paymentStatus: "partial", health: "delayed", daysRemaining: -11 },
  { id: "orange-gbp", code: "STL-2026-00476", name: "Maps listing", customerId: "orange-clinic", providerId: "growthlane-west", serviceId: "gbp", status: "completed", priority: "low", value: 2499, createdAt: "2026-08-30", deadline: "2026-09-06", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -13 },
  { id: "steel-web", code: "STL-2026-00519", name: "Company website", customerId: "steel-nagpur", providerId: "orange-web", serviceId: "website", status: "new", priority: "medium", value: 0, createdAt: "2026-09-19", deadline: "2026-10-10", progress: 4, paymentStatus: "unpaid", health: "not-started", daysRemaining: 21 },
  { id: "ellora-seo", code: "STL-2026-00486", name: "Tourism SEO", customerId: "ellora-tours", providerId: "growthlane-west", serviceId: "seo", status: "assigned", priority: "low", value: 6500, createdAt: "2026-09-14", deadline: "2026-10-06", progress: 16, paymentStatus: "unpaid", health: "on-track", daysRemaining: 17 },
  { id: "atelier-ca", code: "STL-2026-00496", name: "GST registration", customerId: "kolhapuri-atelier", providerId: "ca-partners", serviceId: "gst", status: "review", priority: "medium", value: 2499, createdAt: "2026-09-12", deadline: "2026-09-23", progress: 80, paymentStatus: "paid", health: "on-track", daysRemaining: 4 },
  { id: "heritage-web", code: "STL-2026-00356", name: "Retail website", customerId: "heritage-leather", providerId: "kolhapur-pixel", serviceId: "website", status: "completed", priority: "medium", value: 13500, createdAt: "2026-07-10", deadline: "2026-08-05", progress: 100, paymentStatus: "paid", health: "on-track", daysRemaining: -45 },
  { id: "urban-brand", code: "STL-2026-00531", name: "Kitchen brand kit", customerId: "urban-kitchen", providerId: "voicebox-west", serviceId: "branding", status: "assigned", priority: "medium", value: 9000, createdAt: "2026-09-19", deadline: "2026-10-02", progress: 9, paymentStatus: "unpaid", health: "not-started", daysRemaining: 13 },
]

function timelineFor(seed: ProjectSeed, managerName: string, providerName: string): TimelineStage[] {
  const created = seed.createdAt
  const map: Record<AdminProjectStatus, number> = {
    new: 0,
    assigned: 1,
    "in-progress": 4,
    review: 5,
    completed: 7,
    delayed: 4,
  }
  const doneThrough = map[seed.status]
  const rows = [
    { id: "created", title: "Project Created", date: created, owner: managerName, notes: "Brief logged in the ops desk." },
    { id: "assigned", title: "Provider Assigned", date: offset(created, 1), owner: managerName, notes: providerName === "Unassigned" ? "Waiting on a match." : `Assigned to ${providerName}.` },
    { id: "requirements", title: "Requirements Received", date: offset(created, 2), owner: "Customer", notes: "Intake form and references in files." },
    { id: "design", title: "Design Started", date: offset(created, 3), owner: providerName, notes: "First direction in progress." },
    { id: "design-review", title: "Design Review", date: seed.deadline, owner: managerName, notes: "Internal review before customer." },
    { id: "development", title: "Development", date: null, owner: providerName, notes: "Build starts after design sign-off." },
    { id: "customer-review", title: "Customer Review", date: null, owner: "Customer", notes: "Walkthrough call." },
    { id: "launch", title: "Launch", date: seed.deadline, owner: managerName, notes: "Go-live checklist." },
  ]
  return rows.map((row, index) => ({
    ...row,
    status: index < doneThrough ? "done" : index === doneThrough ? "current" : "upcoming",
  }))
}

function offset(iso: string, days: number) {
  const date = new Date(iso)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function activityFor(seed: ProjectSeed, manager: string, provider: string): ActivityItem[] {
  return [
    { id: `${seed.id}-a1`, at: "Today 11:42 AM", actor: provider, actorInitials: provider.slice(0, 2).toUpperCase(), text: `${provider} uploaded a delivery file.`, projectId: seed.id },
    { id: `${seed.id}-a2`, at: "Today 10:18 AM", actor: manager, actorInitials: manager.slice(0, 2).toUpperCase(), text: `${manager} updated status to ${seed.status.replace("-", " ")}.`, projectId: seed.id },
    { id: `${seed.id}-a3`, at: "Yesterday 4:32 PM", actor: "Customer", actorInitials: "CU", text: "Customer left a note on the latest milestone.", projectId: seed.id },
  ]
}

function filesFor(seed: ProjectSeed): AdminProject["files"] {
  return [
    { name: "Requirements.pdf", type: "PDF", size: "220 KB" },
    { name: "Brand Brief.pdf", type: "PDF", size: "1.1 MB" },
    { name: seed.serviceId === "website" ? "Homepage Design.fig" : "Working-files.zip", type: "File", size: "8.4 MB" },
    { name: "Logo.zip", type: "Archive", size: "4.2 MB" },
  ]
}

export const adminProjects: AdminProject[] = seeds.map((seed) => {
  const customer = adminCustomers.find((item) => item.id === seed.customerId)!
  const location = adminLocations.find((item) => item.id === customer.locationId)!
  const manager = adminManagers.find((item) => item.id === location.managerId)!
  const provider = seed.providerId
    ? adminProviders.find((item) => item.id === seed.providerId)
    : null
  const managerName = manager.name.split(" ")[0]
  const providerName = provider?.name ?? "Unassigned"
  return {
    ...seed,
    managerId: manager.id,
    locationId: location.id,
    timeline: timelineFor(seed, managerName, providerName),
    files: filesFor(seed),
    internalNotes: [
      {
        at: "Yesterday 6:10 PM",
        author: manager.name,
        body: seed.health === "delayed"
          ? "Customer is blocked on a file. Flagged for daily stand-up."
          : "Customer requested launch before the published deadline if possible.",
      },
    ],
    activity: activityFor(seed, managerName, providerName),
  }
})

export const attentionItems: AttentionItem[] = [
  { id: "att-1", level: "critical", title: "Website project delayed by 3 days", detail: "Pune · Rahul Foods · Provider: WebCraft", href: "/admin/projects/rahul-website", cta: "Review Project", locationId: "pune" },
  { id: "att-2", level: "warning", title: "Provider hasn't responded for 18 hours", detail: "Mumbai · ABC Interiors · Harbour Web", href: "/admin/providers/harbour-web", cta: "Contact Provider", locationId: "mumbai" },
  { id: "att-3", level: "warning", title: "Customer waiting for quotation", detail: "Pune · Rahul Foods", href: "/admin/customers/rahul-foods", cta: "View Customer", locationId: "pune" },
  { id: "att-4", level: "critical", title: "GST filing overdue", detail: "Nashik · Godavari Textiles · Nashik Ledger", href: "/admin/projects/godavari-delay", cta: "Review Project", locationId: "nashik" },
  { id: "att-5", level: "warning", title: "Four providers waiting for approval", detail: "Pune, Mumbai, Nashik", href: "/admin/providers?status=pending", cta: "Review queue", locationId: "pune" },
  { id: "att-6", level: "info", title: "Nova Studio design review due Sep 25", detail: "Pune · DesignLab", href: "/admin/projects/nova-branding", cta: "Open project", locationId: "pune" },
  { id: "att-7", level: "warning", title: "Urban Kitchen has no provider yet", detail: "Mumbai · New website brief", href: "/admin/projects/urban-quote", cta: "Assign provider", locationId: "mumbai" },
]

export const adminNotifications: AdminNotification[] = [
  { id: "n1", level: "critical", title: "3 delayed projects need a decision", href: "/admin/projects?status=delayed", time: "8m" },
  { id: "n2", level: "warning", title: "7 projects due this week", href: "/admin/projects", time: "22m" },
  { id: "n3", level: "warning", title: "4 providers waiting for approval", href: "/admin/providers?status=pending", time: "1h" },
  { id: "n4", level: "info", title: "12 new customer enquiries", href: "/admin/customers", time: "3h" },
  { id: "n5", level: "success", title: "18 projects completed this month", href: "/admin/projects?status=completed", time: "5h" },
]

export const revenueSeries = [
  { month: "Apr", revenue: 980000, payouts: 540000, projects: 28, completed: 22, customers: 40 },
  { month: "May", revenue: 1120000, payouts: 610000, projects: 31, completed: 24, customers: 48 },
  { month: "Jun", revenue: 1280000, payouts: 700000, projects: 36, completed: 29, customers: 55 },
  { month: "Jul", revenue: 1410000, payouts: 780000, projects: 39, completed: 33, customers: 61 },
  { month: "Aug", revenue: 1620000, payouts: 900000, projects: 44, completed: 36, customers: 70 },
  { month: "Sep", revenue: 1840000, payouts: 1020000, projects: 48, completed: 18, customers: 76 },
]

export const locationRevenueSeries = adminLocations.map((location) => ({
  name: location.name.replace("Chhatrapati ", "C. "),
  revenue: location.revenue,
}))

export const financeSummary = {
  revenue: 1840000,
  payouts: 1020000,
  platform: 820000,
  pending: 240000,
  refunds: 42000,
  today: 62000,
}

export const todayDigest = {
  activeProjects: 74,
  needAttention: 11,
  revenueToday: 62000,
  completed: 18,
  onTime: 96,
  changes: [
    "8 new projects",
    "12 payments received",
    "5 projects completed",
    "2 projects delayed",
    "4 new providers approved",
  ],
}

export const permissionMatrix = [
  { permission: "View all locations", owner: "✓", admin: "✓", manager: "—" },
  { permission: "View projects", owner: "✓", admin: "✓", manager: "Own location" },
  { permission: "Manage providers", owner: "✓", admin: "✓", manager: "Own location" },
  { permission: "View revenue", owner: "✓", admin: "✓", manager: "Limited" },
  { permission: "Manage managers", owner: "✓", admin: "✓", manager: "—" },
  { permission: "Manage users", owner: "✓", admin: "✓", manager: "—" },
  { permission: "Company settings", owner: "✓", admin: "✓", manager: "—" },
]

export const paymentsLedger = adminProjects
  .filter((project) => project.value > 0)
  .slice(0, 18)
  .map((project, index) => ({
    id: `pay-${project.id}`,
    projectId: project.id,
    customerId: project.customerId,
    locationId: project.locationId,
    amount: project.paymentStatus === "partial" ? Math.round(project.value / 2) : project.value,
    status: project.paymentStatus,
    date: offset(project.createdAt, 2 + (index % 5)),
    type: "customer" as const,
  }))

export const payoutsLedger = adminProviders
  .filter((provider) => provider.status === "active")
  .map((provider) => ({
    id: `out-${provider.id}`,
    providerId: provider.id,
    amount: Math.round(provider.earnings * 0.08),
    status: "released" as const,
    date: "2026-09-15",
  }))

export function getLocation(id: string) {
  return adminLocations.find((item) => item.id === id)
}
export function getManager(id: string) {
  return adminManagers.find((item) => item.id === id)
}
export function getCustomer(id: string) {
  return adminCustomers.find((item) => item.id === id)
}
export function getProvider(id: string) {
  return adminProviders.find((item) => item.id === id)
}
export function getService(id: string) {
  return adminServices.find((item) => item.id === id)
}
export function getProject(id: string) {
  return adminProjects.find((item) => item.id === id)
}

export const companyKpis = {
  totalProjects: 248,
  totalProjectsDelta: 18,
  activeProjects: 74,
  revenue: 1840000,
  customers: 1284,
  customersDelta: 12.5,
  providers: 186,
  providersActive: 42,
  delayed: 11,
}
