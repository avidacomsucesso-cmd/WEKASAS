import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { ReturnCalculator } from "@/components/pricing/ReturnCalculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Precos() {
  return (
    <>
      <PageMeta
        title="Preços — WEKASAS"
        description="Preços simples. Sem letras pequenas. Intermediação ou Gestão Completa com renda garantida."
        path="/precos"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            Preços simples. Sem letras pequenas.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
            Escolhe entre encontrar o inquilino certo ou delegar tudo com renda
            garantida.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="wk-card p-7">
              <p className="text-xs font-bold text-[color:var(--color-orange)]">
                INTERMEDIAÇÃO
              </p>
              <p className="mt-3 text-4xl font-bold text-zinc-900">1,5 rendas</p>
              <p className="mt-2 text-sm text-zinc-600">pagamento único</p>
              <p className="mt-5 text-sm font-semibold text-zinc-900">Para:</p>
              <p className="mt-1 text-sm text-zinc-600">
                proprietários que querem só encontrar o inquilino certo
              </p>

              <div className="mt-6 space-y-2">
                {[
                  "Avaliação",
                  "Fotografia",
                  "Anúncio",
                  "Triagem",
                  "Contrato digital",
                  "Vistoria de entrada",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[color:var(--color-orange)]" />
                    <span className="text-zinc-700">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <WekaButton asChild intent="secondary" className="h-11 w-full">
                  <Link to="/contacto">Pedir proposta</Link>
                </WekaButton>
              </div>
            </Card>

            <Card className="wk-card relative overflow-hidden p-7">
              <div className="absolute right-6 top-6 rounded-full bg-[color:var(--color-orange)] px-3 py-1 text-xs font-bold text-white">
                Mais escolhido
              </div>

              <p className="text-xs font-bold text-[color:var(--color-orange)]">
                GESTÃO COMPLETA
              </p>
              <p className="mt-3 text-4xl font-bold text-zinc-900">10%</p>
              <p className="mt-2 text-sm text-zinc-600">da renda / mês</p>
              <p className="mt-5 text-sm font-semibold text-zinc-900">Para:</p>
              <p className="mt-1 text-sm text-zinc-600">
                proprietários que querem zero trabalho e renda garantida
              </p>

              <div className="mt-6 space-y-2">
                {[
                  "Tudo do plano Intermediação",
                  "Gestão mensal",
                  "Seguro de incumprimento",
                  "Suporte contínuo",
                  "Painel online",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[color:var(--color-orange)]" />
                    <span className="text-zinc-700">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <WekaButton asChild className="h-11 w-full">
                  <Link to="/contacto">Quero a Gestão Completa</Link>
                </WekaButton>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              Calculadora de retorno
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Vê rapidamente o impacto da comissão e o rendimento líquido.
            </p>
          </div>

          <div className="mt-10">
            <ReturnCalculator />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              FAQ de preços
            </h2>
            <p className="mt-3 text-base text-zinc-600">O essencial, sem ruído.</p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "Há custos escondidos?",
                  a: "Não. O preço está definido por plano e é transparente desde o primeiro contacto.",
                },
                {
                  q: "Posso cancelar a Gestão Completa?",
                  a: "Sim. Sem contratos de permanência forçados. Combinamos contigo a melhor transição.",
                },
                {
                  q: "O seguro está incluído?",
                  a: "Sim, na Gestão Completa. Cobre incumprimento até 12 mensalidades + danos, conforme condições.",
                },
              ].map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`p-${idx}`}
                  className="wk-card mb-3 overflow-hidden border-zinc-200"
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-sm font-semibold text-zinc-900 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm text-zinc-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Queres uma proposta para o teu imóvel?
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">Falar connosco</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}
