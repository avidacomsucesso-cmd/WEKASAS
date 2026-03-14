import { Link } from "react-router-dom";
import { WekaLogo } from "@/components/WekaLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--color-charcoal)]">
      <div className="wk-container wk-section py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <WekaLogo className="mb-4" />
            <p className="max-w-xs text-base font-medium text-[color:var(--color-text-muted)]">
              O seu imóvel. A nossa responsabilidade.
            </p>
            <div className="mt-8 space-y-2 text-xs text-[color:var(--color-text-muted)]">
              <p className="font-bold text-white/60">HEAVENWHISPER UNIPESSOAL, LDA</p>
              <p>NIF: 517 714 140</p>
              <p>Rua dos Malhões, Quinta da Fonte</p>
              <p>2770-071 Paço de Arcos, Lisboa</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 md:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-white">Serviços</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link className="text-white/70 hover:text-white" to="/como-funciona">
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/precos">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/arrendamentos">
                    Para inquilinos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Empresa</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link className="text-white/70 hover:text-white" to="/sobre">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/parceiros">
                    Parceiros
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/contacto">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    className="text-white/70 hover:text-white"
                    to="/privacidade"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/termos">
                    Termos e Condições
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Contacto</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-white/70 tracking-tight">contacto@wekasas.com</li>
                <li className="text-white/70">+351 96 252 5307</li>
                <li className="text-white/70">Lisboa · Porto · Madrid · Barcelona</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 HEAVENWHISPER UNIPESSOAL, LDA — Marca WEKASAS</p>
          <p>Plataforma de gestão de arrendamento — PT + ES</p>
        </div>
      </div>
    </footer>
  );
}