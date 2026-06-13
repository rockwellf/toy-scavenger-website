import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Toy Scavenger" },
      { name: "description", content: "Toy Scavenger is a one-person hunt for vintage toys and Mid-Century Modern artifacts worth saving." },
      { property: "og:title", content: "About Toy Scavenger" },
      { property: "og:description", content: "Beyond collecting — a hunt for vintage toys and MCM artifacts." },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="inline-block bg-mustard border-2 border-foreground px-3 py-1 font-mono-retro text-xs tracking-widest mb-6">
        OUR STORY
      </div>
      <h1 className="font-display text-5xl text-teal-deep mb-6">BEYOND COLLECTING.</h1>
      <div className="space-y-5 text-lg leading-relaxed text-foreground">
        <p>
          Toy Scavenger is a hunt — estate sales at dawn, dusty attics, forgotten basements,
          back-corner thrift stores. The goal isn't to amass; it's to rescue.
        </p>
        <p>
          We focus on <span className="text-cherry font-semibold">vintage toys</span> from the
          golden ages of play — tin wind-ups, space-age robots, die-cast classics — and the
          <span className="text-cherry font-semibold"> Mid-Century Modern</span> objects that
          shaped the homes those toys lived in.
        </p>
        <p>
          Every piece listed here was held, inspected, and chosen. No drop-shipping, no algorithms.
          Just one scavenger and the things worth passing on.
        </p>
      </div>
      <div className="mt-12 p-6 border-2 border-foreground rounded-md bg-card">
        <div className="font-mono-retro text-xs tracking-widest text-cherry mb-2">/// THE PROMISE</div>
        <p className="font-display text-xl">
          AUTHENTIC. CURATED. ONE-OF-A-KIND.
        </p>
      </div>
    </main>
  );
}
