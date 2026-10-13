import Link from "next/link"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FinalCta() {
  return (
    <section className="pb-20">
      <Container>
        <div className="rounded-2xl border bg-foreground px-6 py-12 text-background sm:px-12">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tell us what you want to build. We’ll help you launch it.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-background/70">
            Start with a 2-minute brief. You’ll get a launch plan, a price range,
            and the experts to execute it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-background text-foreground hover:bg-background/90"
              )}
            >
              Start My Business
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
              )}
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
