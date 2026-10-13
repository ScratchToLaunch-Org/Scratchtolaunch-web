import { LegalPage } from "@/components/legal-page"
import { SITE } from "@/lib/constants"

export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      body={`${SITE.name} will collect account details, briefs and files you upload so we can run the product. This preview does not store production data. A complete policy will be published before live accounts.`}
    />
  )
}
