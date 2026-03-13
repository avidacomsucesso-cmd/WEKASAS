import { Link } from "react-router-dom";
import { WekaLogo } from "@/components/WekaLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--color-charcoal)]">
      <div className="wk-container wk-section py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <WekaLogo />
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-text-muted)]">
              O seu imóvel. A nossa responsabilidade.
            </p>
            <img
              src="/assets/wekasas-brand-wall.png"
              alt="WEKASAS"
              className="mt-6 w-full max-w-sm rounded-xl border border-white/10 opacity-90"
              loading="lazy"
            />
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
                    to="/politica-de-privacidade"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link className="text-white/70 hover:text-white" to="/termos-e-condicoes">
                    Termos e Condições
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Contacto</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-white/70">geral@wekasas.com</li>
                <li className="text-white/70">Lisboa · Porto · Madrid · Barcelona</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 WEKASAS UAB</p>
          <p>Plataforma de gestão de arrendamento — PT + ES</p>
        </div>
      </div>
    </footer>
  );
}
