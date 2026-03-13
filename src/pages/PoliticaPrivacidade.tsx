import { PageMeta } from "@/components/PageMeta";

export default function PoliticaPrivacidade() {
  return (
    <>
      <PageMeta
        title="Política de Privacidade — WEKASAS"
        description="Informação sobre como tratamos os teus dados pessoais."
        path="/politica-de-privacidade"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 max-w-3xl text-base text-zinc-600 sm:text-lg">
            Esta página é um resumo simples. Para versão final legal, substitui o
            conteúdo por um texto revisto por jurista.
          </p>

          <div className="mt-10 space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <div>
              <p className="text-sm font-bold text-zinc-900">1. Responsável</p>
              <p className="mt-2 text-sm text-zinc-600">
                A WEKASAS trata os dados necessários para responder a pedidos de
                contacto e interesse em imóveis.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">2. Dados recolhidos</p>
              <p className="mt-2 text-sm text-zinc-600">
                Nome, email, telefone, cidade e detalhes que submetas nos
                formulários.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">3. Finalidade</p>
              <p className="mt-2 text-sm text-zinc-600">
                Contacto comercial e prestação de informação sobre serviços e
                imóveis.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">4. Conservação</p>
              <p className="mt-2 text-sm text-zinc-600">
                Mantemos os dados pelo tempo necessário para cumprir a finalidade
                do contacto.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">5. Direitos</p>
              <p className="mt-2 text-sm text-zinc-600">
                Podes pedir acesso, rectificação ou eliminação contactando
                geral@wekasas.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
