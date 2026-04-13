import { PageMeta } from "@/components/PageMeta";
import { useTranslation } from "react-i18next";

export default function Termos() {
  const { i18n } = useTranslation();
  const isEs = i18n.language.startsWith('es');

  return (
    <>
      <PageMeta
        title="Termos e Condições — WEKASAS"
        description="Os termos e condições de utilização da nossa plataforma."
        path="/termos"
      />

      <section className="bg-white">
        <div className="wk-container wk-section max-w-3xl">
          {isEs && (
            <div className="mb-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-600 italic">
              Este documento legal está actualmente disponible sólo en portugués. Versión en español disponible bajo petición.
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Termos e Condições
          </h1>
          <p className="mt-4 text-sm font-medium text-zinc-500">
            Última actualização: Março de 2025
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                1. Identificação
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                HEAVENWHISPER UNIPESSOAL, LDA, NIF 517 714 140, com sede na Rua dos Malhões, Quinta da Fonte, 2770-071 Paço de Arcos, Lisboa, Portugal, a operar sob a marca WEKASAS nos websites wekasas.com, wekasas.pt e wekasas.es.
                <br />
                Contacto: <a href="mailto:contacto@wekasas.com" className="text-[#FA621C] font-semibold hover:underline">contacto@wekasas.com</a> | WhatsApp: <a href="https://wa.me/message/XPRMI6GLOCXKM1" className="text-[#FA621C] font-semibold hover:underline">+351 928 202 241</a>
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                2. Objecto
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                A WEKASAS presta serviços de intermediação imobiliária e gestão de arrendamento residencial em Portugal e Espanha, ao abrigo do Regime Jurídico da Actividade de Mediação Imobiliária (Lei n.º 15/2013, de 8 de Fevereiro, e legislação aplicável).
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                3. Serviços disponíveis
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600">
                <p>
                  <span className="font-bold text-zinc-900">3.1 Intermediação</span> — Angariação e apresentação de inquilino adequado ao imóvel do proprietário, mediante remuneração de 1,5 rendas mensais, paga pelo proprietário aquando da assinatura do contrato de arrendamento.
                </p>
                <p>
                  <span className="font-bold text-zinc-900">3.2 Gestão Completa</span> — Gestão mensal do arrendamento por 10% da renda mensal, incluindo comunicação com o inquilino, acompanhamento do contrato, vistorias periódicas e seguro de incumprimento. O serviço de gestão inicia-se após a assinatura do contrato de arrendamento.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                4. Avaliação gratuita
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                O pedido de avaliação do imóvel não implica qualquer compromisso ou custo para o proprietário. A avaliação é sempre gratuita e sem obrigação de contratar os serviços da WEKASAS.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                5. Seguro de incumprimento
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                O seguro de incumprimento incluído no serviço de Gestão Completa é contratado junto de parceiro segurador devidamente autorizado e cobre até 12 mensalidades em atraso e danos no imóvel até €3.000, sujeito às condições gerais da apólice. A WEKASAS actua como intermediário de seguros neste âmbito.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                6. Programa de Parceiros
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600">
                <p>
                  <span className="font-bold text-zinc-900">6.1 Indicadores de Imóveis</span> — Qualquer pessoa singular ou colectiva pode indicar imóveis à WEKASAS. A comissão de indicação é paga integralmente no momento em que a WEKASAS recebe a primeira renda do inquilino, de acordo com a seguinte tabela: rendas até €1.000/mês — €150; rendas de €1.001 a €2.000/mês — €200; rendas acima de €2.001/mês — €300.
                </p>
                <p>
                  <span className="font-bold text-zinc-900">6.2 Consultor Parceiro</span> — Consultores imobiliários registados podem angariar imóveis em co-exclusividade com a WEKASAS, recebendo 35% da taxa de intermediação praticada, paga após o recebimento pela WEKASAS da primeira renda do inquilino.
                </p>
                <p className="mt-4 italic">
                  A WEKASAS reserva o direito de alterar as condições de remuneração do programa de parceiros mediante aviso prévio de 30 dias.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                7. Responsabilidade
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                A WEKASAS não é parte no contrato de arrendamento celebrado entre proprietário e inquilino. A responsabilidade da WEKASAS perante o proprietário limita-se à correcta prestação dos serviços contratados. A WEKASAS não se responsabiliza por danos decorrentes de incumprimento do inquilino para além da cobertura do seguro incluído.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                8. Propriedade intelectual
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                Toda a marca, logótipo, conteúdos e elementos gráficos do website wekasas.com são propriedade exclusiva da HEAVENWHISPER UNIPESSOAL, LDA e não podem ser reproduzidos sem autorização prévia e escrita.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FA621C]">
                9. Lei aplicável e foro
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                Os presentes termos são regidos pela lei portuguesa. Para resolução de litígios, as partes elegem o foro da comarca de Lisboa, sem prejuízo do direito do consumidor de recorrer a meios alternativos de resolução de conflitos (RAL) ou ao Centro de Arbitragem de Conflitos de Consumo de Lisboa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}