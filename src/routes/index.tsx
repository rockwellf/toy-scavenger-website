import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import logo from "@/assets/toy-scavenger-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Toy Scavenger — Vintage Toys & MCM Treasures" },
      { name: "description", content: "Hand-picked vintage toys and Mid-Century Modern finds. Beyond collecting." },
    ],
  }),
});

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-foreground bg-cream">
        <div className="absolute -top-20 -right-20 h-80 w-80 starburst opacity-30 rounded-full" aria-hidden />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-cherry/10" aria-hidden />
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div>
            <div className="inline-block bg-mustard border-2 border-foreground px-3 py-1 font-mono-retro text-xs tracking-widest mb-6">
              EST. — VINTAGE & MCM
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-foreground">
              <span className="text-teal-deep">SCAVENGED</span><br />
              <span className="text-cherry">TREASURES</span><br />
              <span className="text-foreground">FROM ANOTHER ERA</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Hand-picked vintage toys, atomic-age oddities, and Mid-Century Modern finds.
              Each piece chosen for character — not catalogs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="bg-cherry text-cream font-display px-6 py-3 border-2 border-foreground rounded-md hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_0_oklch(0.22_0.04_30)]">
                SHOP THE FINDS
              </a>
              <a href="/about" className="bg-cream text-foreground font-display px-6 py-3 border-2 border-foreground rounded-md hover:bg-mustard transition-colors">
                OUR STORY
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-cherry/20 rounded-full blur-3xl" aria-hidden />
            <img src={logo} alt="Toy Scavenger logo" className="relative w-72 md:w-96 drop-shadow-[6px_6px_0_oklch(0.22_0.04_30)]" />
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-b-2 border-foreground bg-teal-deep text-cream py-3 overflow-hidden">
        <div className="flex gap-12 font-display text-sm whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 px-6">
              <span>★ TIN ROBOTS</span><span>★ ACTION FIGURES</span><span>★ ATOMIC LAMPS</span>
              <span>★ EAMES ERA</span><span>★ SPACE TOYS</span><span>★ BARWARE</span>
              <span>★ DIE-CAST CARS</span><span>★ TEAK FURNITURE</span><span>★ KITSCH</span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-4xl text-teal-deep">THE COLLECTION</h2>
            <p className="text-muted-foreground mt-2">Fresh finds, rotating inventory. One-of-a-kind pieces.</p>
          </div>
          <div className="font-mono-retro text-sm text-cherry tracking-widest">/// CURATED WEEKLY</div>
        </div>
        <ProductGrid />
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-foreground bg-foreground text-cream py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">TOY SCAVENGER</div>
          <div className="font-mono-retro text-xs tracking-widest opacity-70">© BEYOND COLLECTING</div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
