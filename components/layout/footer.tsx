import Link from "next/link"
import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { SITE } from "@/lib/constants"

const columns = [
  {
    title: "Launch",
    links: [
      { href: "/start", label: "Start a Business" },
      { href: "/services?category=business-setup", label: "Business Setup" },
      { href: "/services?category=website", label: "Website" },
      { href: "/services?category=brand", label: "Branding" },
      { href: "/services?category=marketing", label: "Marketing" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services?category=finance", label: "CA" },
      { href: "/services?category=legal", label: "Legal" },
      { href: "/services?category=website", label: "Web Development" },
      { href: "/services?category=brand", label: "Design" },
      { href: "/services/seo-starter", label: "SEO" },
      { href: "/services?category=marketing", label: "Marketing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/become-provider", label: "Become a Provider" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "Guides" },
      { href: "/resources", label: "Blog" },
      { href: "/faq", label: "FAQs" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              From idea to launch.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} {SITE.name}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/refund" className="hover:text-foreground">
              Refund Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
