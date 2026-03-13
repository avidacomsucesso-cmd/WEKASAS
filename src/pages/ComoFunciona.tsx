import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Pedes avaliação gratuita",
    desc: "Formulário ou WhatsApp, resposta em 24h",
  },
  {
    title: "Avaliação do imóvel",
    desc: "Definimos a renda ideal para o mercado actual",
  },
  {
    title: "Fotografia profissional",
    desc: "Enviamos fotógrafo sem custo adicional",
  },
  {
    title: "Publicação nos portais",
    desc: "Idealista, Imovirtual e redes sociais",
  },
  {
    title: "Triagem de candidatos",
    desc: "Verificamos rendimentos, histórico e idoneidade",
  },
  {
    title: "Assinatura digital",
    desc: "Contrato 100% online, proprietário e inquilino",
  },
  {
    title: "Vistoria de entrada",
    desc: "Documentada com fotos e relatório",
  },
  {
    title: "Gestão contínua",
    desc: "Acompanhamento mensal, renda garantida",
  },
];

const included = [
  "Fotografia profissional",
  "Anúncio nos principais portais",
  "Visitas acompanhadas",
  "Triagem de candidatos",
  "Contrato digital",
  "Vistoria de entrada e saída",
  "Gestão de incidências",
  "Seguro de incumprimento",
  "Painel do proprietário online",
  "Suporte em PT e ES",
];

export default function ComoFunciona() {
  return (
    <>
      <PageMeta
        title="Como funciona — WEKASAS"
        description="Do primeiro contacto até à renda mensal — sem surpresas. Conhece o processo WEKASAS passo a passo."
        path="/como-funciona"
      />

      {/* HERO */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
            Como a WEKASAS funciona
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Do primeiro contacto até à renda mensal — sem surpresas.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              Timeline do processo
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Um fluxo claro, documentado e 100% digital.
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-2">
            <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-zinc-200 lg:left-1/2 lg:block" />

            {steps.map((s, idx) => {
              const side = idx % 2 === 0 ? "lg:pr-10" : "lg:pl-10";
              const align = idx % 2 === 0 ? "lg:justify-end" : "lg:justify-start";
              const col = idx % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2";

              return (
                <div key={s.title} className={`flex ${align} ${col}`}>
                  <Card
                    className={`wk-card relative w-full max-w-xl overflow-hidden p-6 sm:p-7 ${side}`}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-[color:var(--color-orange)]" />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-orange-light)] text-sm font-bold text-[color:var(--color-orange)]">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-base font-bold text-zinc-900">
                          {s.title}
                        </p>
                        <p className="mt-2 text-sm text-zinc-600">{s.desc}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INCLUÍDO */}
      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              O que está incluído
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Um serviço completo para proprietários que querem tranquilidade.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div
                key={item}
                className="wk-card flex items-start gap-3 p-5"
              >
                <div className="mt-0.5 rounded-lg bg-[color:var(--color-orange-light)] p-1.5">
                  <Check className="h-4 w-4 text-[color:var(--color-orange)]" />
                </div>
                <p className="text-sm font-semibold text-zinc-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARAÇÃO */}
      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              WEKASAS vs Imobiliária tradicional
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Comparação directa do que muda (e do que deixa de te preocupar).
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50">
                  <TableHead className="text-zinc-700">Serviço</TableHead>
                  <TableHead className="text-zinc-700">WEKASAS</TableHead>
                  <TableHead className="text-zinc-700">Imobiliária tradicional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Fotografia profissional", "✓ incluída", "✓ (paga à parte)"],
                  ["Anúncios nos portais", "✓ incluído", "✓"],
                  ["Gestão mensal", "✓ 10%/mês", "✗ desaparece após contrato"],
                  ["Renda garantida", "✓ seguro incluído", "✗"],
                  ["Painel online", "✓", "✗"],
                  ["Disponível em PT + ES", "✓", "raramente"],
                  ["Contrato digital", "✓", "✗"],
                ].map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell className="font-medium text-zinc-900">
                      {row[0]}
                    </TableCell>
                    <TableCell className="font-semibold text-[color:var(--color-orange)]">
                      {row[1]}
                    </TableCell>
                    <TableCell className="text-zinc-600">{row[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Queres avançar com uma avaliação gratuita?
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">Pedir avaliação</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}
