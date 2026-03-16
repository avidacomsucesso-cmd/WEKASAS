import { WekaLogo } from "@/components/WekaLogo";
import { WekaButton } from "@/components/WekaButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/precos", label: "Preços" },
  { href: "/arrendamentos", label: "Para inquilinos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/sobre", label: "Sobre" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
      {navItems.map((item) => {
        const active = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white",
              active && "bg-white/10 text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-charcoal)]">
      <div className="wk-container flex h-28 md:h-36 items-center justify-between">
        <Link to="/" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
          <WekaLogo />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          <NavLinks />
          <WekaButton asChild size="lg" className="px-6 h-12 text-sm font-bold">
            <Link to="/submeter-imovel">
              Quero arrendar o meu imóvel <ArrowUpRight className="ml-1.5 h-4.5 w-4.5" />
            </Link>
          </WekaButton>
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-white/10 bg-[color:var(--color-charcoal)] text-white">
              <div className="mt-6 flex items-center justify-between">
                <WekaLogo />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <NavLinks onNavigate={() => setOpen(false)} />

                <WekaButton asChild className="w-full">
                  <Link to="/submeter-imovel" onClick={() => setOpen(false)}>
                    Quero arrendar o meu imóvel
                  </Link>
                </WekaButton>
              </div>

              <p className="mt-10 text-xs text-white/60">
                Gestão de arrendamento em PT + ES.
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}