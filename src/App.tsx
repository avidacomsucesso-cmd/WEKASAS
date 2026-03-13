import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";

import Index from "./pages/Index";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
import Arrendamentos from "./pages/Arrendamentos";
import ArrendamentoDetalhe from "./pages/ArrendamentoDetalhe";
import Contacto from "./pages/Contacto";
import Sobre from "./pages/Sobre";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosCondicoes from "./pages/TermosCondicoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/arrendamentos" element={<Arrendamentos />} />
            <Route
              path="/arrendamentos/:slug"
              element={<ArrendamentoDetalhe />}
            />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route
              path="/politica-de-privacidade"
              element={<PoliticaPrivacidade />}
            />
            <Route path="/termos-e-condicoes" element={<TermosCondicoes />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;