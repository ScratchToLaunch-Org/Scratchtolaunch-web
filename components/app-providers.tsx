"use client"

import { AuthProvider } from "@/components/auth-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TooltipProvider delay={200}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </TooltipProvider>
    </AuthProvider>
  )
}
