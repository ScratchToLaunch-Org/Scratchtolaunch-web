import type { LaunchPackage, ResourceArticle } from "@/lib/types"

export const businessIntents = [
  { id: "online-store", label: "Online Store", icon: "store" },
  { id: "local-business", label: "Local Business", icon: "building" },
  { id: "digital-agency", label: "Digital Agency", icon: "monitor" },
  { id: "coaching", label: "Coaching / Education", icon: "graduation" },
  { id: "creative", label: "Creative Business", icon: "camera" },
  { id: "restaurant", label: "Restaurant / Food", icon: "utensils" },
  { id: "consultancy", label: "Consultancy", icon: "briefcase" },
  { id: "startup", label: "Startup", icon: "rocket" },
  { id: "something-else", label: "Something Else", icon: "sparkles" },
] as const

export const launchPlans: Record<
  string,
  { title: string; steps: string[]; estimate: string; timeline: string }
> = {
  "online-store": {
    title: "Online store",
    steps: [
      "Business registration",
      "GST",
      "Brand identity",
      "Domain",
      "E-commerce website",
      "Payment gateway",
      "WhatsApp Business",
      "Google Business",
      "Marketing",
      "Launch",
    ],
    estimate: "₹25,000 – ₹45,000",
    timeline: "3–5 weeks",
  },
  "local-business": {
    title: "Local business",
    steps: [
      "Business registration",
      "GST / local licences checklist",
      "Brand identity",
      "Google Business Profile",
      "Business website",
      "WhatsApp Business",
      "Basic SEO",
      "Launch",
    ],
    estimate: "₹15,000 – ₹30,000",
    timeline: "2–4 weeks",
  },
  "digital-agency": {
    title: "Digital agency",
    steps: [
      "Entity decision",
      "Brand identity",
      "Professional website",
      "Service agreements",
      "Invoicing setup",
      "Domain + email",
      "Lead capture",
      "Launch",
    ],
    estimate: "₹20,000 – ₹40,000",
    timeline: "2–4 weeks",
  },
  coaching: {
    title: "Coaching / education",
    steps: [
      "Positioning session",
      "Brand identity",
      "Landing page",
      "Payment collection",
      "WhatsApp + calendar",
      "Content kit",
      "Launch",
    ],
    estimate: "₹12,000 – ₹28,000",
    timeline: "2–3 weeks",
  },
  creative: {
    title: "Creative business",
    steps: [
      "Brand identity",
      "Portfolio website",
      "Professional email",
      "Service menu + pricing sheet",
      "WhatsApp enquiries",
      "Instagram kit",
      "Launch",
    ],
    estimate: "₹12,000 – ₹25,000",
    timeline: "2–3 weeks",
  },
  restaurant: {
    title: "Restaurant / food",
    steps: [
      "Registrations checklist",
      "FSSAI guidance path",
      "Brand + menu design",
      "Google Business",
      "Ordering WhatsApp",
      "Simple website",
      "Launch week content",
    ],
    estimate: "₹18,000 – ₹35,000",
    timeline: "3–5 weeks",
  },
  consultancy: {
    title: "Consultancy",
    steps: [
      "Entity + GST path",
      "Personal brand",
      "Website",
      "Proposal + agreement templates",
      "Invoicing",
      "LinkedIn + email",
      "Launch",
    ],
    estimate: "₹12,000 – ₹28,000",
    timeline: "2–3 weeks",
  },
  startup: {
    title: "Startup",
    steps: [
      "Private Limited path",
      "Founder documentation",
      "Brand identity",
      "Product/landing site",
      "Analytics",
      "Professional email",
      "Pitch-ready assets",
      "Launch",
    ],
    estimate: "₹35,000 – ₹70,000",
    timeline: "4–6 weeks",
  },
  "something-else": {
    title: "Custom launch",
    steps: [
      "Discovery call",
      "Need-to-have vs later",
      "Registration path",
      "Brand + web",
      "Payments if needed",
      "Launch checklist",
    ],
    estimate: "Depends on scope",
    timeline: "After a short brief",
  },
}

export const launchPackages: LaunchPackage[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For someone validating an idea.",
    priceFrom: 9999,
    includes: [
      "Business consultation",
      "Domain guidance",
      "Professional email setup",
      "Basic brand identity",
      "One-page website",
      "WhatsApp setup",
    ],
    cta: { label: "Get Started", href: "/start?package=starter" },
  },
  {
    id: "business",
    name: "Business",
    audience: "For businesses ready to operate.",
    priceFrom: 24999,
    popular: true,
    includes: [
      "Business setup assistance",
      "GST assistance",
      "Logo + branding",
      "Professional website",
      "WhatsApp integration",
      "Payment gateway",
      "Google Business setup",
      "Basic SEO",
    ],
    cta: { label: "Get Started", href: "/start?package=business" },
  },
  {
    id: "growth",
    name: "Growth",
    audience: "For businesses ready to scale.",
    priceFrom: 49999,
    includes: [
      "Everything in Business",
      "E-commerce / advanced website",
      "SEO",
      "Analytics",
      "Automation",
      "Marketing setup",
      "30-day support",
    ],
    cta: { label: "Talk to an Expert", href: "/contact?intent=growth" },
  },
]

export const howItWorks = [
  {
    step: "01",
    title: "Tell us your idea",
    body: "Answer a few questions about what you are building, where, and what you already have.",
  },
  {
    step: "02",
    title: "Get your launch plan",
    body: "We identify the registrations, brand, website and marketing work your business actually needs.",
  },
  {
    step: "03",
    title: "Book the right experts",
    body: "Connect with verified professionals. Book one service or a packaged launch — your choice.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Track files, messages, milestones and payments from one dashboard until you are ready to open.",
  },
]

export const trustCards = [
  {
    title: "Verified professionals",
    body: "We review providers before they join — identity, work samples and the services they are allowed to list.",
  },
  {
    title: "Transparent pricing",
    body: "Starting prices are listed up front. Government fees and third-party costs are called out before you pay.",
  },
  {
    title: "Milestone-based projects",
    body: "Track progress before the project is complete. You always know what has been delivered.",
  },
  {
    title: "One dashboard",
    body: "Keep registration, brand, website and marketing in one place instead of twelve WhatsApp threads.",
  },
]

export const testimonials = [
  {
    id: "t1",
    quote:
      "I had no idea where to start. ScratchToLaunch turned everything into a simple checklist.",
    name: "Placeholder customer",
    role: "Sample story — clothing brand",
    placeholder: true,
  },
  {
    id: "t2",
    quote:
      "We booked a CA and a website in the same week. The dashboard meant we were not chasing people on chat.",
    name: "Placeholder customer",
    role: "Sample story — consultancy",
    placeholder: true,
  },
  {
    id: "t3",
    quote:
      "The launch plan was honest about what could wait. We spent on GST, a logo and a site — not a pile of extras.",
    name: "Placeholder customer",
    role: "Sample story — cafe",
    placeholder: true,
  },
]

export const faqs = [
  {
    question: "What is ScratchToLaunch?",
    answer:
      "ScratchToLaunch is a business launch platform. You tell us what you want to build, we help you plan the work, and you book verified professionals for registration, finance, brand, website, payments and marketing — all from one place.",
  },
  {
    question: "Do you provide the services directly?",
    answer:
      "Some packaged launch plans are coordinated by us. Individual services are delivered by independent professionals and studios on the platform. The service page always shows who will do the work.",
  },
  {
    question: "Who are the service providers?",
    answer:
      "CAs, company secretaries, lawyers, web developers, designers, SEO specialists, marketers and other operators. Each profile lists completed work, ratings and response times.",
  },
  {
    question: "How much does it cost to start a business?",
    answer:
      "It depends on the entity, city and what you need besides paperwork. Launch packages on this site start from the prices shown. Government fees are extra. Use the launch planner for a range that matches your brief.",
  },
  {
    question: "Can I book only one service?",
    answer: "Yes. You can book a single service, several, or a launch package.",
  },
  {
    question: "Can I use ScratchToLaunch if I already have a business?",
    answer:
      "Yes. Choose an existing-business upgrade in the start flow. Many customers come for a website, GST cleanup, or marketing after they are already trading.",
  },
  {
    question: "How do payments work?",
    answer:
      "You pay through ScratchToLaunch. Projects can be split into milestones. Platform fees and taxes are shown on checkout. This preview uses a mock payment screen — live processing will be added later.",
  },
  {
    question: "How long does business setup take?",
    answer:
      "A simple website can take about a week. Registrations depend on government processing. A typical launch plan is 2–6 weeks of coordinated work, not counting officer delays.",
  },
  {
    question: "Can I talk to a CA?",
    answer:
      "Yes. Book a CA service, or start a launch plan and we will match you with an available professional.",
  },
  {
    question: "Can I get a custom website?",
    answer:
      "Yes. Business websites, landing pages, e-commerce and web applications are listed as separate services. Share references in the brief.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "The Growth package includes 30-day support. After that, care plans and retainers can be booked with the same providers from your dashboard.",
  },
]

export const resources: ResourceArticle[] = [
  {
    slug: "how-to-start-a-business-in-india",
    title: "How to start a business in India",
    excerpt: "A practical sequence: idea, entity, registrations, bank, brand, then customers.",
    category: "Getting started",
    readTime: "8 min",
    updated: "Sep 2026",
    sections: [
      {
        heading: "Start with the work, not the logo",
        body: "Write down what you sell, who pays, and whether you need a physical location. That answer decides entity type, GST and whether you need a store or a simple website first.",
      },
      {
        heading: "Pick an entity you can actually run",
        body: "A proprietorship is the lightest path for a solo operator. LLP and Private Limited add compliance and credibility. There is no universal right answer — there is a right answer for your risk, partners and bank.",
      },
      {
        heading: "Registrations in a sensible order",
        body: "Entity documents, PAN, current account, then GST if you need it. Udyam is often useful later. Do not collect certificates you cannot explain.",
      },
      {
        heading: "Then make it possible to buy from you",
        body: "A name, a domain, a page, a payment method and a WhatsApp number will take you further than a 40-page pitch deck.",
      },
    ],
  },
  {
    slug: "proprietorship-vs-llp-vs-private-limited",
    title: "Proprietorship vs LLP vs Private Limited",
    excerpt: "How the three common paths differ on liability, tax, banking and paperwork.",
    category: "Business setup",
    readTime: "7 min",
    updated: "Sep 2026",
    sections: [
      {
        heading: "Proprietorship",
        body: "You and the business are the same legal person. Fast to start, harder to separate from personal assets. Fine for many solo practices and local shops.",
      },
      {
        heading: "LLP",
        body: "A partnership with limited liability and MCA filings. Useful when two or more people will operate together without immediately needing ESOP-style equity.",
      },
      {
        heading: "Private Limited",
        body: "The default for startups that may raise capital. More credibility with banks and marketplaces, and more compliance. Founders should budget time for filings, not just the incorporation fee.",
      },
    ],
  },
  {
    slug: "do-i-need-gst",
    title: "Do I need GST?",
    excerpt: "Thresholds, interstate supply, and when registering early is still a good idea.",
    category: "Finance",
    readTime: "6 min",
    updated: "Aug 2026",
    sections: [
      {
        heading: "The honest answer is: it depends",
        body: "Turnover, product vs service, and whether you sell across states all matter. A CA should confirm this against current rules — this article is orientation, not a filing opinion.",
      },
      {
        heading: "Reasons people register before they must",
        body: "B2B buyers ask for invoices, marketplaces require GSTIN, and some tenders will not talk to you without it. Registering early is a business choice, not always a legal one.",
      },
    ],
  },
  {
    slug: "how-much-does-a-business-website-cost",
    title: "How much does a business website cost?",
    excerpt: "What changes the price: pages, store, copy, photos and who maintains it.",
    category: "Website",
    readTime: "6 min",
    updated: "Sep 2026",
    sections: [
      {
        heading: "A useful range, not a fantasy number",
        body: "A clear 5-page marketing site for a small business often starts in the low tens of thousands of rupees for professional work. Stores, custom apps and heavy animation cost more. Hosting and a domain are yearly extras.",
      },
      {
        heading: "What actually drives cost",
        body: "Unclear copy, missing photos, and change-requests after design freeze. If you can send a competitor list and your offer in one page, you will spend less.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-domain",
    title: "How to choose a domain",
    excerpt: "Short, spellable, and boring on purpose.",
    category: "Brand",
    readTime: "4 min",
    updated: "Jul 2026",
    sections: [
      {
        heading: "Make it easy to say on a phone call",
        body: "If you have to say “that’s a hyphen, then two Ls”, pick another name. Prefer .in or .com based on where customers are, and buy the obvious misspellings if they are cheap.",
      },
    ],
  },
  {
    slug: "how-to-create-a-google-business-profile",
    title: "How to create a Google Business Profile",
    excerpt: "The listing customers use when they search your area plus your category.",
    category: "Marketing",
    readTime: "5 min",
    updated: "Aug 2026",
    sections: [
      {
        heading: "Claim, complete, then verify",
        body: "Categories, hours, photos and a real phone number matter more than keywords stuffed into the name. Verification is done by the owner — have a postcard address or video ready.",
      },
    ],
  },
  {
    slug: "first-10-things-after-starting-a-business",
    title: "First 10 things to do after starting a business",
    excerpt: "A post-registration list that is about customers, not more certificates.",
    category: "Getting started",
    readTime: "6 min",
    updated: "Sep 2026",
    sections: [
      {
        heading: "Open for money, then for applause",
        body: "Current account, invoicing, a page with your offer, a payment method, WhatsApp Business, Google profile if you are local, a simple contract, bookkeeping from month one, one distribution channel, and a weekly review. Certificates on the wall can wait.",
      },
    ],
  },
]

export const wizardOptions = {
  goals: [
    { id: "new-business", label: "New business", hint: "Nothing is registered yet." },
    { id: "website", label: "Website", hint: "You mainly need a site." },
    { id: "online-store", label: "Online store", hint: "You want to sell products." },
    { id: "professional-service", label: "Professional service", hint: "Consulting, coaching, practice." },
    { id: "upgrade", label: "Existing business upgrade", hint: "You already trade." },
    { id: "not-sure", label: "I'm not sure", hint: "We'll help you narrow it." },
  ],
  budgets: [
    { id: "under-10k", label: "Under ₹10K" },
    { id: "10-25k", label: "₹10K–₹25K" },
    { id: "25-50k", label: "₹25K–₹50K" },
    { id: "50k-1l", label: "₹50K–₹1L" },
    { id: "1l-plus", label: "₹1L+" },
  ],
  needs: [
    { id: "registration", label: "Registration" },
    { id: "gst", label: "GST" },
    { id: "ca", label: "CA" },
    { id: "branding", label: "Branding" },
    { id: "website", label: "Website" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "payments", label: "Payment gateway" },
    { id: "marketing", label: "Marketing" },
    { id: "seo", label: "SEO" },
    { id: "automation", label: "Automation" },
    { id: "legal", label: "Legal" },
    { id: "other", label: "Other" },
  ],
}

export const budgetEstimates: Record<string, { investment: string; timeline: string }> = {
  "under-10k": { investment: "₹6,000 – ₹10,000", timeline: "1–2 weeks" },
  "10-25k": { investment: "₹12,000 – ₹22,000", timeline: "2–3 weeks" },
  "25-50k": { investment: "₹25,000 – ₹40,000", timeline: "2–4 weeks" },
  "50k-1l": { investment: "₹50,000 – ₹85,000", timeline: "3–5 weeks" },
  "1l-plus": { investment: "₹1,00,000+", timeline: "4–8 weeks" },
}
