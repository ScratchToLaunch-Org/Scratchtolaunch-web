import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileStickyCta />
    </>
  )
}
