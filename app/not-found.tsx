import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold">This page is not on the launch plan.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The link may be old, or the service hasn’t been listed yet.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "xl" }), "mt-8")}>
        Back home
      </Link>
    </div>
  )
}
