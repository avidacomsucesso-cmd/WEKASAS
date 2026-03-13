import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";

export default function NotFound() {
  return (
    <section className="bg-white">
      <PageMeta
        title="Página não encontrada — WEKASAS"
        description="A página que procuras não existe."
        path="/404"
      />
      <div className="wk-container wk-section">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
          <p className="text-sm font-semibold text-[color:var(--color-orange)]">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-600">
            Verifica o link ou volta à homepage.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WekaButton asChild className="h-11">
              <Link to="/">Ir para a homepage</Link>
            </WekaButton>
            <WekaButton asChild intent="secondary" className="h-11">
              <Link to="/contacto">Falar connosco</Link>
            </WekaButton>
          </div>
        </div>
      </div>
    </section>
  );
}