import { LegalPage } from "@/components/legal-page"
import { SITE } from "@/lib/constants"

export const metadata = { title: "Terms" }

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      body={`${SITE.name} is a platform that connects customers with independent professionals. Providers are responsible for the quality of their work. Government filings depend on third-party systems and officer timelines. These preview terms are a placeholder.`}
    />
  )
}
