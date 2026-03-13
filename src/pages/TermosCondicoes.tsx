import { PageMeta } from "@/components/PageMeta";

export default function TermosCondicoes() {
  return (
    <>
      <PageMeta
        title="Termos e Condições — WEKASAS"
        description="Termos de utilização do website WEKASAS."
        path="/termos-e-condicoes"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Termos e Condições
          </h1>
          <p className="mt-4 max-w-3xl text-base text-zinc-600 sm:text-lg">
            Conteúdo simplificado. Para publicação, substitui por uma versão final
            validada legalmente.
          </p>

          <div className="mt-10 space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <div>
              <p className="text-sm font-bold text-zinc-900">1. Âmbito</p>
              <p className="mt-2 text-sm text-zinc-600">
                Este website apresenta serviços de gestão de arrendamento e
                imóveis disponíveis.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">2. Informação</p>
              <p className="mt-2 text-sm text-zinc-600">
                As informações e simulações são indicativas e podem variar.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">3. Contacto</p>
              <p className="mt-2 text-sm text-zinc-600">
                Ao submeter formulários, autorizas o contacto para resposta ao teu
                pedido.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">4. Propriedade</p>
              <p className="mt-2 text-sm text-zinc-600">
                O conteúdo e marca WEKASAS são propriedade dos respectivos
                titulares.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
