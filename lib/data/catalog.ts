import type {
  Provider,
  Review,
  Service,
  ServiceCategoryId,
} from "@/lib/types"

export const serviceCategories: {
  id: ServiceCategoryId
  name: string
  description: string
  services: string[]
  count: number
}[] = [
  {
    id: "business-setup",
    name: "Business Setup",
    description: "Registration, GST, MSME and the paperwork that makes a business real.",
    services: [
      "Company registration",
      "Proprietorship",
      "LLP",
      "Private Limited",
      "GST",
      "MSME/Udyam",
      "Business compliance",
    ],
    count: 7,
  },
  {
    id: "finance",
    name: "Finance",
    description: "CAs, books, tax and invoicing so money stays organised from day one.",
    services: [
      "CA services",
      "Accounting",
      "Bookkeeping",
      "Tax filing",
      "Invoicing",
    ],
    count: 5,
  },
  {
    id: "brand",
    name: "Brand",
    description: "A name people remember — logo, identity, domain and everyday assets.",
    services: [
      "Logo",
      "Brand identity",
      "Business cards",
      "Social media kit",
      "Domain",
    ],
    count: 5,
  },
  {
    id: "website",
    name: "Website & Technology",
    description: "Sites, stores, payments and the tools customers actually use.",
    services: [
      "Business website",
      "Landing page",
      "E-commerce",
      "Web applications",
      "Payment gateway",
      "WhatsApp integration",
      "Automation",
    ],
    count: 7,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Show up where customers look: search, maps, social and email.",
    services: ["SEO", "Google Business", "Social media", "Ads", "Content", "Email marketing"],
    count: 6,
  },
  {
    id: "legal",
    name: "Legal",
    description: "Agreements, policies and documentation that keep the business protected.",
    services: ["Contracts", "Policies", "IP support", "Compliance docs"],
    count: 4,
  },
]

export const providers: Provider[] = [
  {
    slug: "rahul-web-studio",
    name: "Rahul Web Studio",
    profession: "Web development studio",
    location: "Bengaluru",
    rating: 4.9,
    reviewCount: 86,
    completedProjects: 140,
    responseTime: "Under 2 hours",
    verified: true,
    about:
      "We build clear, fast websites for Indian businesses that need to look credible and convert enquiries. Most of our work is for first-time founders who want a professional site without a six-month agency process.",
    startingPrice: 7999,
    specialties: ["Business websites", "WhatsApp integration", "Basic SEO"],
    initials: "RW",
    accent: "#2454F5",
  },
  {
    slug: "nair-associates",
    name: "Nair & Associates",
    profession: "Chartered accountants",
    location: "Kochi",
    rating: 4.8,
    reviewCount: 64,
    completedProjects: 210,
    responseTime: "Same day",
    verified: true,
    about:
      "A compact CA practice focused on new businesses: books, GST returns, and tax filing with explanations in plain language. We work with proprietors, LLPs and private limited companies.",
    startingPrice: 4999,
    specialties: ["Accounting", "GST returns", "Tax filing"],
    initials: "NA",
    accent: "#0F766E",
  },
  {
    slug: "studio-arka",
    name: "Studio Arka",
    profession: "Brand identity studio",
    location: "Mumbai",
    rating: 4.9,
    reviewCount: 51,
    completedProjects: 98,
    responseTime: "Under 4 hours",
    verified: true,
    about:
      "We design brand systems that hold up on packaging, Instagram and a storefront board. The work is restrained, not trendy — built for businesses that want to look established.",
    startingPrice: 8999,
    specialties: ["Logo", "Brand kits", "Social templates"],
    initials: "SA",
    accent: "#B45309",
  },
  {
    slug: "lexora-legal",
    name: "Lexora Legal",
    profession: "Company secretaries & legal",
    location: "Delhi NCR",
    rating: 4.7,
    reviewCount: 42,
    completedProjects: 120,
    responseTime: "Under 6 hours",
    verified: true,
    about:
      "Registration, MoA/AoA support, founder agreements and the documents banks and marketplaces usually ask for. We coordinate filings; government fees are always shown separately.",
    startingPrice: 6999,
    specialties: ["Company registration", "Founder docs", "Policies"],
    initials: "LL",
    accent: "#4338CA",
  },
  {
    slug: "growthlane",
    name: "Growthlane",
    profession: "SEO & digital marketing",
    location: "Pune",
    rating: 4.8,
    reviewCount: 73,
    completedProjects: 156,
    responseTime: "Under 3 hours",
    verified: true,
    about:
      "Local SEO, Google Business Profile setup and a first-month content plan. We do not promise rankings. We set up the foundations and report what was done.",
    startingPrice: 5999,
    specialties: ["SEO setup", "Google Business", "Content"],
    initials: "GL",
    accent: "#C2410C",
  },
  {
    slug: "mehta-compliance",
    name: "Mehta Compliance",
    profession: "GST & registrations",
    location: "Ahmedabad",
    rating: 4.8,
    reviewCount: 90,
    completedProjects: 260,
    responseTime: "Under 3 hours",
    verified: true,
    about:
      "GST, Udyam and proprietorship paperwork for small businesses. We prepare applications, explain document checklists, and stay available until the filing is submitted.",
    startingPrice: 2499,
    specialties: ["GST", "Udyam", "Proprietorship"],
    initials: "MC",
    accent: "#0E7490",
  },
  {
    slug: "northpixel",
    name: "Northpixel",
    profession: "E-commerce & payments",
    location: "Hyderabad",
    rating: 4.9,
    reviewCount: 58,
    completedProjects: 87,
    responseTime: "Under 2 hours",
    verified: true,
    about:
      "Online stores, payment gateway setup and the operational glue between WhatsApp, inventory and checkout. Built for founders who need to start selling, not collect features.",
    startingPrice: 14999,
    specialties: ["E-commerce", "Payment gateway", "Automation"],
    initials: "NP",
    accent: "#1D4ED8",
  },
  {
    slug: "voicebox-studio",
    name: "Voicebox Studio",
    profession: "Social & content studio",
    location: "Chennai",
    rating: 4.7,
    reviewCount: 39,
    completedProjects: 72,
    responseTime: "Under 5 hours",
    verified: true,
    about:
      "Launch-week social kits, profile setup and a two-week posting calendar. We write in the founder’s voice, not in generic marketing copy.",
    startingPrice: 4499,
    specialties: ["Social kits", "Content calendar", "Profile setup"],
    initials: "VS",
    accent: "#7C3AED",
  },
]

export const services: Service[] = [
  {
    slug: "private-limited-registration",
    title: "Private Limited company registration assistance",
    category: "business-setup",
    providerSlug: "lexora-legal",
    startingPrice: 8999,
    delivery: "7–14 days",
    rating: 4.8,
    reviewCount: 34,
    tags: ["Pvt Ltd", "MCA", "Founders"],
    excerpt: "Assistance with name, DSC/DIN coordination and incorporation paperwork.",
    description:
      "A guided incorporation workflow for founders who want a Private Limited company. Lexora prepares checklists, coordinates DSC/DIN, drafts standard documents and files through the MCA process. Government fees and stamp duty are billed separately.",
    includes: [
      "Name availability discussion",
      "Document checklist and review",
      "DSC/DIN coordination",
      "Standard MoA/AoA drafting support",
      "Filing assistance until submission",
    ],
    faq: [
      {
        question: "Are MCA fees included?",
        answer:
          "No. Government fees, stamp duty and DSC charges are quoted separately before filing.",
      },
      {
        question: "Can this cover a one-person company?",
        answer: "Yes. Mention OPC during briefing and the checklist is adjusted.",
      },
    ],
    portfolio: [
      { title: "D2C foods brand", caption: "Two-founder Pvt Ltd, Delhi" },
      { title: "SaaS studio", caption: "Three-founder Pvt Ltd, Bengaluru" },
    ],
  },
  {
    slug: "gst-registration",
    title: "GST registration assistance",
    category: "business-setup",
    providerSlug: "mehta-compliance",
    startingPrice: 2499,
    delivery: "3–7 days",
    rating: 4.8,
    reviewCount: 71,
    tags: ["GST", "Compliance", "Tax"],
    excerpt: "Document checklist, application prep and filing support for GST.",
    description:
      "We review eligibility, assemble the document set, and assist with the GST application. Processing time depends on the portal and officer queries. Portal fees, if any, are not included in the service fee.",
    includes: [
      "Eligibility discussion",
      "Document checklist",
      "Application preparation",
      "Query support after filing",
    ],
    faq: [
      {
        question: "Do I need GST?",
        answer:
          "It depends on turnover, product type and whether you sell across states. The consultation covers this before filing.",
      },
    ],
    portfolio: [
      { title: "Retail store", caption: "Ahmedabad, goods + local sales" },
      { title: "Online coaching", caption: "Service GST for a solo founder" },
    ],
  },
  {
    slug: "udyam-registration",
    title: "MSME / Udyam registration assistance",
    category: "business-setup",
    providerSlug: "mehta-compliance",
    startingPrice: 1499,
    delivery: "1–3 days",
    rating: 4.9,
    reviewCount: 44,
    tags: ["MSME", "Udyam", "Small business"],
    excerpt: "Help filing Udyam with the right activity codes and documents.",
    description:
      "A short, practical Udyam filing session. You receive a filled application, activity-code guidance and a copy of the acknowledgement for your records.",
    includes: [
      "Activity code guidance",
      "Form filling assistance",
      "Acknowledgement copy",
    ],
    faq: [
      {
        question: "Is Udyam mandatory?",
        answer:
          "Not always. It is often useful for tenders, some lending products and government schemes. We explain whether it is relevant for your case.",
      },
    ],
    portfolio: [{ title: "Workshop + retail", caption: "Manufacturing + trading codes" }],
  },
  {
    slug: "proprietorship-setup",
    title: "Proprietorship setup consultation",
    category: "business-setup",
    providerSlug: "lexora-legal",
    startingPrice: 3999,
    delivery: "3–5 days",
    rating: 4.7,
    reviewCount: 28,
    tags: ["Proprietorship", "Solo founder"],
    excerpt: "A structured path for a sole business: registrations to consider and in what order.",
    description:
      "For founders starting in their own name. We map shop/establishment (where relevant), GST, current account paperwork and basic contracts — then help you book only what you need.",
    includes: [
      "Entity comparison call",
      "Registration sequence",
      "Bank document list",
      "Basic terms template notes",
    ],
    faq: [
      {
        question: "Is this a government registration by itself?",
        answer:
          "A proprietorship is not a company. This service is a guided setup plan plus optional filings you choose to add.",
      },
    ],
    portfolio: [{ title: "Photography practice", caption: "Solo professional, Chennai" }],
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & bookkeeping (monthly)",
    category: "finance",
    providerSlug: "nair-associates",
    startingPrice: 4999,
    delivery: "Monthly",
    rating: 4.8,
    reviewCount: 52,
    tags: ["CA", "Books", "GST"],
    excerpt: "Monthly books, GST-ready records and a short founder review.",
    description:
      "Books maintained on a monthly cadence with a written summary. Suitable for early-stage businesses that need discipline without a full-time accountant.",
    includes: [
      "Monthly bookkeeping",
      "Bank/sales matching",
      "GST-ready records",
      "30-minute review call",
    ],
    faq: [
      {
        question: "Which software do you use?",
        answer:
          "We can work with Tally, Zoho Books or a simple spreadsheet export, depending on volume.",
      },
    ],
    portfolio: [{ title: "Agency retainers", caption: "Service business, 8 clients" }],
  },
  {
    slug: "tax-filing",
    title: "Income tax filing for founders",
    category: "finance",
    providerSlug: "nair-associates",
    startingPrice: 3499,
    delivery: "5–10 days",
    rating: 4.8,
    reviewCount: 47,
    tags: ["ITR", "CA", "Founders"],
    excerpt: "ITR preparation for proprietors and salaried-plus-business income.",
    description:
      "Document collection, computation review and filing. We explain the return in a short call so you know what was reported.",
    includes: [
      "Document checklist",
      "Computation review",
      "Filing",
      "Acknowledgement",
    ],
    faq: [
      {
        question: "Does this include company tax audit?",
        answer: "No. Tax audit and company returns are scoped separately.",
      },
    ],
    portfolio: [{ title: "Consultant + salary", caption: "Mixed income ITR" }],
  },
  {
    slug: "logo-brand-identity",
    title: "Logo + brand identity",
    category: "brand",
    providerSlug: "studio-arka",
    startingPrice: 8999,
    delivery: "7–10 days",
    rating: 4.9,
    reviewCount: 40,
    tags: ["Logo", "Identity", "Brand"],
    excerpt: "Logo, colour, type and a small kit you can actually use.",
    description:
      "Two directions, one chosen system. You receive logo files, a short brand sheet and social avatars. Packaging or a full website design is not included unless added.",
    includes: [
      "Two logo directions",
      "Final logo files",
      "Colour and type sheet",
      "Social avatar + cover",
      "One revision round",
    ],
    faq: [
      {
        question: "Do you transfer ownership?",
        answer: "Yes. Final artwork is licensed to you for business use on delivery.",
      },
    ],
    portfolio: [
      { title: "Atelier ceramics", caption: "Wordmark + clay palette" },
      { title: "Coastal cafe", caption: "Mark + menu type" },
    ],
  },
  {
    slug: "social-media-kit",
    title: "Social media kit",
    category: "brand",
    providerSlug: "voicebox-studio",
    startingPrice: 4499,
    delivery: "4–6 days",
    rating: 4.7,
    reviewCount: 31,
    tags: ["Instagram", "Content", "Launch"],
    excerpt: "Profile setup plus 12 post templates for the first two weeks.",
    description:
      "A practical launch kit: highlights, a bio, and templates sized for Instagram. Copy is drafted from your brief so it does not sound templated.",
    includes: [
      "Profile copy",
      "Highlight covers",
      "12 post templates",
      "Two-week calendar",
    ],
    faq: [
      {
        question: "Do you also post for us?",
        answer: "Posting retainers are a separate service. This kit is assets you can use immediately.",
      },
    ],
    portfolio: [{ title: "Coaching launch", caption: "12-post carousel set" }],
  },
  {
    slug: "domain-professional-email",
    title: "Domain + professional email setup",
    category: "brand",
    providerSlug: "northpixel",
    startingPrice: 1999,
    delivery: "1–2 days",
    rating: 4.9,
    reviewCount: 66,
    tags: ["Domain", "Email", "Google Workspace"],
    excerpt: "Name shortlist, domain purchase guidance and mailbox setup.",
    description:
      "We help you choose a domain, walk through purchase, and connect professional email. Domain registrar charges and Google Workspace/Microsoft 365 seats are paid by you to those vendors.",
    includes: [
      "5-name shortlist",
      "Purchase walkthrough",
      "DNS basics",
      "Mailbox setup assistance",
    ],
    faq: [
      {
        question: "Is the domain price included?",
        answer: "No. You pay the registrar and email vendor directly. Our fee is for setup assistance.",
      },
    ],
    portfolio: [{ title: "Consultant domain", caption: "name + two mailboxes" }],
  },
  {
    slug: "business-website",
    title: "Business website",
    category: "website",
    providerSlug: "rahul-web-studio",
    startingPrice: 7999,
    delivery: "5–7 days",
    rating: 4.9,
    reviewCount: 86,
    tags: ["Website", "WhatsApp", "SEO"],
    excerpt: "A professional site with contact, WhatsApp and basic SEO.",
    description:
      "A 4–6 page marketing website for a local or professional business. Designed to look trustworthy on mobile, collect enquiries, and give you a URL you can put on a visiting card.",
    includes: [
      "Responsive website",
      "Contact form",
      "WhatsApp integration",
      "Basic SEO",
      "Google Analytics",
    ],
    faq: [
      {
        question: "Can I add e-commerce later?",
        answer:
          "Yes. This package is a marketing site. A store can be scoped as a follow-on project.",
      },
      {
        question: "Who hosts it?",
        answer:
          "Hosting is set up on a standard provider. Annual hosting is billed by that provider, not bundled unless you choose a care plan.",
      },
    ],
    portfolio: [
      { title: "Clinic site", caption: "5 pages, appointment WhatsApp" },
      { title: "Interior studio", caption: "Portfolio + enquiry form" },
    ],
  },
  {
    slug: "ecommerce-website",
    title: "E-commerce website",
    category: "website",
    providerSlug: "northpixel",
    startingPrice: 24999,
    delivery: "10–18 days",
    rating: 4.8,
    reviewCount: 29,
    tags: ["Store", "Checkout", "Catalogue"],
    excerpt: "A store with catalogue, cart, payments and order basics.",
    description:
      "For founders ready to sell online. Includes a starter catalogue, checkout, payment gateway connection and a short operations walkthrough. Payment aggregator KYC is done in your name.",
    includes: [
      "Store setup",
      "Up to 30 products (you provide content)",
      "Payment gateway connection",
      "Order notification setup",
      "Admin walkthrough",
    ],
    faq: [
      {
        question: "Which platform?",
        answer:
          "Typically Shopify or a lightweight custom storefront, chosen after the brief. Platform subscription is extra.",
      },
    ],
    portfolio: [
      { title: "Apparel drop", caption: "28 SKUs, prepaid + COD notes" },
    ],
  },
  {
    slug: "payment-gateway-setup",
    title: "Payment gateway setup",
    category: "website",
    providerSlug: "northpixel",
    startingPrice: 3999,
    delivery: "2–5 days",
    rating: 4.8,
    reviewCount: 37,
    tags: ["Payments", "Razorpay", "Checkout"],
    excerpt: "KYC walkthrough and live checkout connection on your site or store.",
    description:
      "We help you complete aggregator onboarding and connect payments to the website or store. Settlement timelines and MDR are between you and the gateway.",
    includes: [
      "Provider comparison notes",
      "KYC document list",
      "Test + live keys",
      "Success/failure pages",
    ],
    faq: [
      {
        question: "Do you process money for us?",
        answer:
          "No. Settlements go to your business account through the payment provider.",
      },
    ],
    portfolio: [{ title: "Course checkout", caption: "Razorpay + webhook" }],
  },
  {
    slug: "whatsapp-business-setup",
    title: "WhatsApp Business setup",
    category: "website",
    providerSlug: "rahul-web-studio",
    startingPrice: 1499,
    delivery: "1–2 days",
    rating: 4.9,
    reviewCount: 55,
    tags: ["WhatsApp", "Catalogue", "Enquiries"],
    excerpt: "Business profile, quick replies, catalogue basics and site click-to-chat.",
    description:
      "A one-sitting setup so customers can reach you on WhatsApp without looking unprofessional. Optional catalogue if you sell a small set of products.",
    includes: [
      "Business profile",
      "Greeting + away messages",
      "Quick replies",
      "Website click-to-chat",
    ],
    faq: [
      {
        question: "Is this the paid WhatsApp API?",
        answer:
          "This package is WhatsApp Business app setup. Official API onboarding is scoped separately.",
      },
    ],
    portfolio: [{ title: "Bakery orders", caption: "Menu + quick replies" }],
  },
  {
    slug: "seo-starter",
    title: "SEO foundation",
    category: "marketing",
    providerSlug: "growthlane",
    startingPrice: 5999,
    delivery: "5–8 days",
    rating: 4.8,
    reviewCount: 41,
    tags: ["SEO", "Search", "Analytics"],
    excerpt: "Technical basics, Search Console, and a first keyword map.",
    description:
      "We fix the obvious technical gaps, connect Search Console and Analytics, and give you a short list of pages worth writing. Rankings are not guaranteed.",
    includes: [
      "Technical checklist",
      "Search Console + Analytics",
      "Keyword map for 10 terms",
      "On-page for up to 5 URLs",
    ],
    faq: [
      {
        question: "When will we rank?",
        answer:
          "Nobody can honestly promise a date. This service sets the foundation and a writing plan.",
      },
    ],
    portfolio: [{ title: "Interior firm", caption: "Local terms + GBP" }],
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile setup",
    category: "marketing",
    providerSlug: "growthlane",
    startingPrice: 2499,
    delivery: "2–4 days",
    rating: 4.9,
    reviewCount: 60,
    tags: ["Maps", "Local", "GBP"],
    excerpt: "Claim, complete and verify a profile customers can trust.",
    description:
      "Categories, photos, services, hours and a verification plan. Review response templates included. Verification timing depends on Google.",
    includes: [
      "Profile completion",
      "Category & service list",
      "Photo guidance",
      "Review reply templates",
    ],
    faq: [
      {
        question: "Can you verify it for me?",
        answer:
          "Verification must be completed by the business owner. We prepare everything and sit with you through the steps.",
      },
    ],
    portfolio: [{ title: "Clinic listing", caption: "Maps + services" }],
  },
  {
    slug: "legal-agreements",
    title: "Founder & client agreement pack",
    category: "legal",
    providerSlug: "lexora-legal",
    startingPrice: 6999,
    delivery: "5–8 days",
    rating: 4.7,
    reviewCount: 22,
    tags: ["Contracts", "Policies", "Legal"],
    excerpt: "A practical set of agreements and website policies for a new business.",
    description:
      "Standard-form documents adapted to your model: client terms, a simple founder/consultant agreement, privacy and refund notes. This is not litigation work and not a substitute for a court opinion on a live dispute.",
    includes: [
      "Client service terms",
      "Privacy policy draft",
      "Refund/cancellation note",
      "One revision round",
    ],
    faq: [
      {
        question: "Is this legal advice for a dispute?",
        answer:
          "No. It is documentation support for a new business. Disputes need a separate engagement.",
      },
    ],
    portfolio: [{ title: "Agency terms", caption: "Scope + payment clauses" }],
  },
  {
    slug: "automation-setup",
    title: "Business automation starter",
    category: "automation",
    providerSlug: "northpixel",
    startingPrice: 9999,
    delivery: "7–12 days",
    rating: 4.8,
    reviewCount: 18,
    tags: ["Automation", "CRM", "Ops"],
    excerpt: "Lead capture to WhatsApp/email, plus a simple pipeline.",
    description:
      "We connect your form, inbox and a lightweight CRM so enquiries stop living only in your head. Built for volume you can still run yourself.",
    includes: [
      "Lead capture workflow",
      "WhatsApp or email alert",
      "Simple pipeline board",
      "Handover notes",
    ],
    faq: [
      {
        question: "Which tools?",
        answer:
          "Usually a form + a sheet or HubSpot free + WhatsApp. We pick based on what you already use.",
      },
    ],
    portfolio: [{ title: "Coaching funnel", caption: "Form → sheet → WhatsApp" }],
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Priya M.",
    role: "Clothing brand founder",
    rating: 5,
    body: "The website brief was short and the first draft already looked like a real storefront. WhatsApp from the product page is what we use every day.",
    date: "12 Aug 2026",
    serviceSlug: "business-website",
    providerSlug: "rahul-web-studio",
  },
  {
    id: "r2",
    author: "Arjun S.",
    role: "Consultant",
    rating: 5,
    body: "I did not want a marketplace full of noise. The CA actually explained GST in one call and sent a checklist the same evening.",
    date: "3 Aug 2026",
    serviceSlug: "gst-registration",
    providerSlug: "mehta-compliance",
  },
  {
    id: "r3",
    author: "Neha R.",
    role: "Cafe owner",
    rating: 4,
    body: "Brand kit was restrained — which is what we asked for. One extra revision would have been nice, but the files were production-ready.",
    date: "21 Jul 2026",
    serviceSlug: "logo-brand-identity",
    providerSlug: "studio-arka",
  },
  {
    id: "r4",
    author: "Vikram D.",
    role: "Coaching business",
    rating: 5,
    body: "Google Business was a mess of duplicate listings. They cleaned the profile and wrote reply templates we still use.",
    date: "9 Jul 2026",
    serviceSlug: "google-business-profile",
    providerSlug: "growthlane",
  },
  {
    id: "r5",
    author: "Sana K.",
    role: "Studio founder",
    rating: 5,
    body: "Payment setup was the part I was avoiding. KYC list was clear and checkout went live without drama.",
    date: "28 Jun 2026",
    serviceSlug: "payment-gateway-setup",
    providerSlug: "northpixel",
  },
]

export function getProvider(slug: string) {
  return providers.find((item) => item.slug === slug)
}

export function getService(slug: string) {
  return services.find((item) => item.slug === slug)
}

export function servicesByProvider(slug: string) {
  return services.filter((item) => item.providerSlug === slug)
}

export function reviewsForService(slug: string) {
  return reviews.filter((item) => item.serviceSlug === slug)
}

export function reviewsForProvider(slug: string) {
  return reviews.filter((item) => item.providerSlug === slug)
}

export function getCategoryLabel(id: ServiceCategoryId | string) {
  return serviceCategories.find((item) => item.id === id)?.name ?? id
}
