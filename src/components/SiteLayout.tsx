import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { CookieBanner } from "@/components/CookieBanner";

export function SiteLayout() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <SiteNavbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <CookieBanner />
    </div>
  );
}