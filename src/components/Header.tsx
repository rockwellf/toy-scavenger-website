import { Link } from "@tanstack/react-router";
import logo from "@/assets/toy-scavenger-logo.png";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground bg-cream/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Toy Scavenger" className="h-12 w-12 object-contain" />
          <div className="leading-none">
            <div className="font-display text-xl text-teal-deep">TOY SCAVENGER</div>
            <div className="font-mono-retro text-[10px] tracking-widest text-cherry">BEYOND COLLECTING</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-display text-sm">
          <Link to="/" className="hover:text-cherry transition-colors" activeProps={{ className: "text-cherry" }}>SHOP</Link>
          <Link to="/about" className="hover:text-cherry transition-colors" activeProps={{ className: "text-cherry" }}>ABOUT</Link>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
