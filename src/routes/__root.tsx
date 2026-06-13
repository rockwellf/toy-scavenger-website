import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { useCartSync } from "@/hooks/useCartSync";

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

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
