import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { Outlet } from "react-router-dom";

import Index from "./pages/Index";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
import Arrendamentos from "./pages/Arrendamentos";
import Inquilinos from "./pages/Inquilinos";
import ArrendamentoDetalhe from "./pages/ArrendamentoDetalhe";
import Contacto from "./pages/Contacto";
import Sobre from "./pages/Sobre";
import Parceiros from "./pages/Parceiros";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import NotFound from "./pages/NotFound";
import SubmeterImovel from "./pages/SubmeterImovel";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/arrendamentos" element={<Arrendamentos />} />
            <Route path="/inquilinos" element={<Inquilinos />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/submeter-imovel" element={<SubmeterImovel />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}

export default App;