import { LegalPage } from "@/components/legal-page"
import { SITE } from "@/lib/constants"

export const metadata = { title: "Refund Policy" }

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      body={`${SITE.name} refunds unused milestone balances according to the project agreement. Work already delivered is typically not refunded. Government fees paid to departments are not refundable through the platform. This page is a placeholder until live payments launch.`}
    />
  )
}
