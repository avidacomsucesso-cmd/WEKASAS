import { useRef } from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  MessageSquare, BarChart3, Camera, Globe, 
  UserCheck, FileSignature, ClipboardCheck, 
  ShieldCheck, Clock, Check, ArrowRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "1",
    title: "Pedes avaliação gratuita",
    desc: "Formulário ou WhatsApp, resposta em 24h",
    tempo: "Dia 1 · 5 minutos",
    icon: MessageSquare,
  },
  {
    n: "2",
    title: "Avaliação do imóvel",
    desc: "Definimos a renda ideal com base em dados reais do mercado actual ou se já tens o preço definido, vamos em frente.",
    tempo: "24 horas",
    icon: BarChart3,
    dark: true,
  },
  {
    n: "3",
    title: "Fotografia profissional",
    desc: "Enviamos fotógrafo profissional sem custo adicional. Fotos editadas em 48h.",
    tempo: "Dia 3–4",
    icon: Camera,
  },
  {
    n: "4",
    title: "Publicação nos portais",
    desc: "Idealista, Imovirtual, Fotocasa e redes sociais. Visibilidade máxima.",
    tempo: "Dia 4–5",
    icon: Globe,
    dark: true,
  },
  {
    n: "5",
    title: "Triagem de candidatos",
    desc: "Verificamos rendimentos, histórico e idoneidade. Só os melhores chegam à visita.",
    tempo: "Dia 5–12",
    icon: UserCheck,
  },
  {
    n: "6",
    title: "Assinatura digital",
    desc: "Contrato 100% online. Proprietário e inquilino assinam do telemóvel.",
    tempo: "Dia 13–16",
    icon: FileSignature,
    dark: true,
  },
  {
    n: "7",
    title: "Vistoria de entrada",
    desc: "Documentada com fotos e relatório. Protege proprietário e inquilino.",
    tempo: "Dia 16–18",
    icon: ClipboardCheck,
  },
  {
    n: "8",
    title: "Gestão contínua",
    desc: "Acompanhamento mensal, renda garantida todos os meses — mesmo que o inquilino falhe.",
    tempo: "Todos os meses",
    icon: ShieldCheck,
    dark: true,
    specialBadge: "RENDA GARANTIDA",
  },
];

const includedItems = [
  "Avaliação de mercado",
  "Fotografia profissional",
  "Anúncios premium",
  "Triagem de inquilinos",
  "Seguro de incumprimento",
  "Contratos digitais",
  "Vistorias detalhadas",
  "Gestão de avarias",
  "Cobrança de rendas",
  "Apoio jurídico",
];

const comparison = [
  {
    service: "Seguro de Incumprimento",
    weka: "✓ Até 12 meses",
    trad: "✗ (Raramente incluído)",
  },
  {
    service: "Triagem de Inquilinos",
    weka: "✓ Rigorosa (Big Data)",
    trad: "Simples (IRS apenas)",
  },
  {
    service: "Fotografia",
    weka: "✓ Profissional (Gratuita)",
    trad: "Telemóvel (Geralmente)",
  },
  {
    service: "Assinatura de Contrato",
    weka: "✓ 100% Digital",
    trad: "Presencial / Papel",
  },
  {
    service: "Gestão de Avarias",
    weka: "✓ Incluído 24/7",
    trad: "✗ (Apenas mediação)",
  },
  {
    service: "Transparência",
    weka: "✓ App Proprietário",
    trad: "Telefone / E-mail",
  },
  {
    service: "Renda garantida se inquilino falhar",
    weka: "✓ Até 12 meses cobertos",
    trad: "✗",
  },
];

export default function ComoFunciona() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageMeta
        title="Como Funciona — Gestão de Arrendamento 100% Digital | WEKASAS"
        description="Entenda o nosso processo de 8 passos para arrendar o seu imóvel com segurança, rapidez e renda garantida."
        path="/como-funciona"
      />

      {/* SECÇÃO 1 — HERO */}
      <section className="bg-[color:var(--color-charcoal)] overflow-hidden">
        <div className="wk-container wk-section pt-12 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col items-start">
              <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.2em] text-[color:var(--color-orange)] uppercase">
                PROCESSO 100% DIGITAL
              </span>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
                Do primeiro contacto à renda mensal.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                8 passos. Sem burocracia. Sem reuniões desnecessárias. <br />
                Em média 18 dias até ao primeiro inquilino.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { n: "18 dias", l: "até arrendar" },
                  { n: "100%", l: "online sem papel" },
                  { n: "PT + ES", l: "cobertura" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/12 bg-white/7 px-5 py-3 min-w-[120px]">
                    <p className="text-xl font-bold text-[color:var(--color-orange)]">{s.n}</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button 
                  onClick={scrollToTimeline}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                >
                  Ver o processo <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[480px] w-full overflow-hidden rounded-2xl">
                <img 
                  src="/assets/hero-parceiros-5.png" 
                  alt="Proprietário WEKASAS" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 rounded-xl bg-white p-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900">
                    Imóvel arrendado em 16 dias · Lisboa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 2 — TIMELINE */}
      <section ref={timelineRef} className="bg-white">
        <div className="wk-container wk-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              8 passos. Sem complicações.
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Um fluxo claro, documentado e 100% digital.
            </p>
          </div>

          <div className="relative mt-16 overflow-hidden">
            {/* Linha central (desktop) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-zinc-100 lg:block">
              <div className="h-full w-full bg-gradient-to-b from-[color:var(--color-orange)] via-[color:var(--color-orange)] to-transparent" />
            </div>

            <div className="space-y-8 lg:space-y-0">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 !== 0;

                return (
                  <div key={step.n} className="relative lg:min-h-[160px]">
                    {/* Círculo Numerado */}
                    <div className="absolute left-0 top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white shadow-lg lg:left-1/2 lg:-translate-x-1/2">
                      {step.n}
                    </div>

                    <div className={cn(
                      "flex flex-col lg:w-1/2",
                      isEven ? "lg:ml-auto lg:pl-12" : "lg:mr-auto lg:pr-12 lg:items-end lg:text-right"
                    )}>
                      <Card className={cn(
                        "relative mt-12 overflow-hidden border-zinc-200 p-6 shadow-sm lg:mt-0 lg:max-w-md w-full",
                        step.dark ? "bg-[color:var(--color-charcoal)] text-white border-transparent" : "bg-white text-zinc-900"
                      )}>
                        <div className={cn(
                          "flex items-start justify-between",
                          !isEven && "lg:flex-row-reverse"
                        )}>
                          <div className={cn(
                            "rounded-lg p-2",
                            step.dark ? "bg-white/10" : "bg-[color:var(--color-orange-light)]"
                          )}>
                            <Icon className={cn("h-5 w-5", step.dark ? "text-white" : "text-[color:var(--color-orange)]")} />
                          </div>
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                            step.dark ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                          )}>
                            {step.tempo}
                          </span>
                        </div>
                        
                        <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                        <p className={cn("mt-2 text-sm leading-relaxed", step.dark ? "text-white/70" : "text-zinc-600")}>
                          {step.desc}
                        </p>

                        {step.specialBadge && (
                          <div className="mt-4 flex">
                            <span className="rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
                              {step.specialBadge}
                            </span>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-[color:var(--color-orange)] p-6 text-center text-white sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <p className="text-lg font-medium leading-relaxed">
                Em média, os nossos imóveis são arrendados em{" "}
                <span className="font-bold underline decoration-white/40 underline-offset-4">18 dias úteis</span>{" "}
                após avaliação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 3 — O QUE ESTÁ INCLUÍDO */}
      <section className="bg-[#F8F8F8]">
        <div className="wk-container wk-section">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="/assets/hero-parceiros-6.png" 
                  alt="Equipa WEKASAS" 
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                Tudo incluído. Sem surpresas.
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Um serviço para proprietários que querem zero preocupações.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-zinc-100">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-orange-light)]">
                      <Check className="h-3.5 w-3.5 text-[color:var(--color-orange)]" />
                    </div>
                    <span className="text-sm font-bold text-zinc-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <WekaButton asChild size="lg" className="h-12 px-8">
                  <Link to="/contacto">Quero este serviço</Link>
                </WekaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 4 — COMPARAÇÃO */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              WEKASAS vs Imobiliária tradicional
            </h2>
            <p className="mt-3 text-base text-white/60">
              Comparação directa do que muda (e do que deixa de te preocupar).
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-wider">Serviço</th>
                    <th className="p-5 text-sm font-bold bg-[color:var(--color-orange)] text-white text-center relative">
                      WEKASAS
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-0.5 text-[8px] font-black text-[color:var(--color-orange)] uppercase">Recomendado</span>
                    </th>
                    <th className="p-5 text-sm font-bold bg-white/5 text-white/60 text-center">Imobiliária</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.service} className={cn(i % 2 === 0 ? "bg-white/3" : "bg-transparent")}>
                      <td className="p-5 text-sm font-medium text-white">{row.service}</td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-sm font-bold text-[color:var(--color-orange)]">{row.weka}</span>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {row.trad.startsWith("✗") ? (
                            <X className="h-3.5 w-3.5 text-rose-500/50" />
                          ) : null}
                          <span className="text-sm text-white/40">{row.trad}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 5 — SEGURO EXPLICADO */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <Card className="mx-auto max-w-[800px] overflow-hidden border-orange-500/20 bg-gradient-to-b from-white to-[#FEF0E8] p-8 sm:p-12 shadow-xl rounded-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--color-orange-light)] mb-8">
              <ShieldCheck className="h-10 w-10 text-[color:var(--color-orange)]" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              O seguro de incumprimento explicado.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { v: "12 rendas", l: "garantidas em atraso" },
                { v: "€3.000", l: "cobertura em danos" },
                { v: "0€", l: "custo extra para si" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white p-5 border border-orange-500/10 shadow-sm">
                  <p className="text-2xl font-black text-[color:var(--color-orange)]">{s.v}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">{s.l}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
              O seguro de incumprimento está incluído no serviço de Gestão Completa WEKASAS. 
              Se o inquilino deixar de pagar, recebe na mesma — até 12 mensalidades em atraso. 
              Sem burocracia. Sem advogados. Sem stress.
            </p>
          </Card>
        </div>
      </section>

      {/* SECÇÃO 6 — CTA FINAL */}
      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white">
                Pronto para arrendar sem preocupações?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Avaliação gratuita em 24 horas. Sem compromisso.
              </p>
              
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WekaButton asChild size="lg" className="bg-white text-[color:var(--color-charcoal)] hover:bg-white/90">
                  <Link to="/contacto">Pedir avaliação gratuita</Link>
                </WekaButton>
                <WekaButton asChild intent="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                  <a href="https://wa.me/351962525307" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp →
                  </a>
                </WekaButton>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Resposta em menos de 24 horas",
                "Avaliação gratuita e sem compromisso",
                "Gestor dedicado em PT e ES"
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}