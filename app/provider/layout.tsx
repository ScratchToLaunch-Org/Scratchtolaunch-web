import { ProviderShell } from "@/components/provider/provider-shell"

export const metadata = {
  title: "Provider",
}

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return <ProviderShell>{children}</ProviderShell>
}
