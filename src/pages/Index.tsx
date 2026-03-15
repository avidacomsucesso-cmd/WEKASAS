import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { RentCalculator } from "@/components/home/RentCalculator";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ShieldCheck, KeyRound, Smartphone, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const promises = [
  {
    n: "01",
    title: "Renda garantida",
    desc: "Mesmo que o inquilino falhe, tu recebes. Seguro de incumprimento incluído.",
    icon: ShieldCheck,
  },
  {
    n: "02",
    title: "Gestão total",
    desc: "Fotografias, anúncios, visitas, contratos, vistorias. Tratamos de tudo.",
    icon: KeyRound,
  },
  {
    n: "03",
    title: "100% digital",
    desc: "Assina o contrato do telemóvel. Sem papelada. Sem reuniões desnecessárias.",
    icon: Smartphone,
  },
  {
    n: "04",
    title: "Inquilinos verificados",
    desc: "Triagem rigorosa de rendimentos e histórico. Sabemos quem entra em tua casa.",
    icon: UserCheck,
  },
];

const faqs = [
  {
    q: "Quanto custa a WEKASAS?",
    a: "Intermediação: 1,5 rendas na assinatura. Gestão mensal: 10% da renda. Sem custos escondidos.",
  },
  {
    q: "O que acontece se o inquilino não pagar?",
    a: "Está coberto. O nosso seguro de incumprimento garante até 12 mensalidades + danos.",
  },
  {
    q: "Posso sair quando quiser?",
    a: "Sim. Sem contratos de permanência forçados.",
  },
  {
    q: "Operam em Espanha também?",
    a: "Sim. Lisboa, Porto, Madrid e Barcelona.",
  },
  {
    q: "Quanto tempo demora até arrendar?",
    a: "Em média 18 dias úteis desde a avaliação até ao contrato assinado.",
  },
];

export default function Index() {
  return (
    <>
      <PageMeta
        title="WEKASAS — Gestão de Arrendamento com Renda Garantida | Lisboa e Madrid"
        description="Gerimos tudo e garantimos a tua renda todos os meses — mesmo que o inquilino falhe. Plataforma de gestão de arrendamento em PT + ES."
        path="/"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--color-charcoal)]">
        <div className="pointer-events-none absolute right-[-280px] top-[-100px] hidden opacity-[0.06] sm:block">
          <img
            src="/assets/wekasas-logo-official.png"
            alt=""
            className="h-[1000px] w-auto object-contain mix-blend-screen"
          />
        </div>

        <div className="wk-container wk-section pt-12 sm:pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                <span className="block">O seu imóvel.</span>
                <span className="block text-[color:var(--color-orange)]">
                  A nossa responsabilidade.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Gerimos tudo. Garantimos a sua renda todos os meses — mesmo que o
                inquilino falhe.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WekaButton asChild size="lg" className="h-12 px-6 text-base">
                  <Link to="/contacto">Quero uma avaliação gratuita</Link>
                </WekaButton>

                <Link
                  to="/como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
                >
                  Ver como funciona <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="wk-pill">Renda garantida</span>
                <span className="wk-pill">100% digital</span>
                <span className="wk-pill">Lisboa e Madrid</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white">
        <div className="wk-container py-6">
          <div className="grid gap-6 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <p className="text-sm font-bold text-zinc-900 sm:text-base">Avaliação gratuita</p>
              <p className="text-xs text-zinc-500 font-medium">em 24h</p>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🇵🇹</span>
                  <span className="text-sm font-bold text-zinc-900 sm:text-base">Portugal</span>
                </div>
                <span className="text-zinc-300 mx-1">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🇪🇸</span>
                  <span className="text-sm font-bold text-zinc-900 sm:text-base">Espanha</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 font-medium">presença local</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 sm:text-base">Renda garantida</p>
              <p className="text-xs text-zinc-500 font-medium">todos os meses</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 PROMESSAS */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              Tudo o que um proprietário precisa. Num só lugar.
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Um serviço completo, digital e sem complicações — com uma obsessão:
              previsibilidade.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {promises.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.n}
                  className="wk-card relative overflow-hidden p-6 sm:p-7 bg-white border-zinc-200"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[color:var(--color-orange)]" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-[color:var(--color-orange)]">
                        {p.n}
                      </p>
                      <p className="mt-2 text-lg font-bold text-zinc-900">
                        {p.title}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[color:var(--color-orange-light)] p-2">
                      <Icon className="h-5 w-5 text-[color:var(--color-orange)]" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {p.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (resumo) */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                3 passos. Sem complicações.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
                Do primeiro contacto até à renda mensal — com um processo pensado
                para simplificar.
              </p>
            </div>
            <WekaButton asChild intent="secondary" className="h-11">
              <Link to="/como-funciona">Ver o processo completo</Link>
            </WekaButton>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                n: "1",
                t: "Preenches o formulário",
                d: "Avaliação gratuita em 24h",
              },
              {
                n: "2",
                t: "Nós tratamos de tudo",
                d: "Foto, anúncio, triagem, contrato",
              },
              {
                n: "3",
                t: "Recebes a renda",
                d: "Todos os meses, garantido",
              },
            ].map((s) => (
              <div key={s.n} className="wk-card-dark border border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white">
                    {s.n}
                  </div>
                  <p className="text-base font-bold text-white">{s.t}</p>
                </div>
                <p className="mt-3 text-sm text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                Quanto pode render o seu imóvel?
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Faz uma estimativa rápida. Depois, pedimos os detalhes e damos-te
                um valor realista.
              </p>
            </div>
            <WekaButton asChild className="h-11">
              <Link to="/contacto">Quero uma avaliação real do meu imóvel</Link>
            </WekaButton>
          </div>

          <div className="mt-10">
            <RentCalculator />
          </div>
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Proprietários com tranquilidade.
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Histórias reais (e um sentimento comum): previsibilidade.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                text: "Recebi a renda mesmo quando o inquilino atrasou dois meses. Nunca pensei que fosse possível.",
                name: "Carlos M.",
                city: "Lisboa",
              },
              {
                text: "Trataram de tudo desde o primeiro dia. Eu não fiz nada.",
                name: "Inês R.",
                city: "Porto",
              },
              {
                text: "Processo todo pelo telemóvel. Assinámos o contrato sem uma única reunião.",
                name: "Miguel T.",
                city: "Madrid",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="wk-card-dark border border-white/10 p-6"
              >
                <p className="text-sm leading-relaxed text-white/80">"{t.text}"</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <span className="text-xs font-semibold text-[color:var(--color-orange)]">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              Perguntas frequentes
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Transparência total. Sem surpresas.
            </p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${idx}`}
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

      {/* CTA FINAL */}
      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Pronto para receber a sua renda?
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">Falar com um gestor agora</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}