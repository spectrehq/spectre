import { BondWidget } from "~/components/bond-widget";

export default function BondPage() {
  return (
    <section>
      <div className="container py-16">
        <div className="text-center mb-8">
          <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
            Bond
          </h3>
          {/* TODO */}
          <p className="text-muted-foreground text-sm" />
        </div>
        <BondWidget />
      </div>
    </section>
  )
}
