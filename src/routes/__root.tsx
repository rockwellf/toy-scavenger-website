import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { useCartSync } from "@/hooks/useCartSync";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-cherry">404</h1>
        <h2 className="mt-4 font-display text-xl">PAGE NOT FOUND</h2>
        <p className="mt-2 text-sm text-muted-foreground">This treasure has been lost to time.</p>
        <a href="/" className="mt-6 inline-flex rounded-md bg-teal-deep px-4 py-2 text-sm font-display text-cream border-2 border-foreground">GO HOME</a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Toy Scavenger — Vintage Toys & MCM Treasures" },
      { name: "description", content: "Hand-picked vintage toys and Mid-Century Modern finds. Beyond collecting." },
      { property: "og:title", content: "Toy Scavenger" },
      { property: "og:description", content: "Vintage toys & MCM treasures, scavenged with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCartSync();
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}
