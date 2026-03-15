import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LocationSelect } from "@/components/LocationSelect";
import { toast } from "sonner";
import { Users, Briefcase, MessageCircle, Info, UserPlus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getWhatsAppNumber() {
  const raw =
    (import.meta as any).env?.NEXT_PUBLIC_WHATSAPP ||
    (import.meta as any).env?.VITE_WHATSAPP ||
    "351962525307";
  return String(raw).replace(/\D/g, "");
}

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Parceiros() {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    country: "Portugal",
    region: "Lisboa",
    partnerType: "portaria"
  });
  
  const [partnerType, setPartnerType] = React.useState<"indicador" | "consultor">("indicador");
  const [estimatedRent, setEstimatedRent] = React.useState(1450);

  const calculateCommission = () => {
    if (partnerType === "indicador") {
      if (estimatedRent <= 1000) return 150;
      if (estimatedRent <= 2000) return 200;
      return 300;
    } else {
      return Math.round(estimatedRent * 1.5 * 0.35);
    }
  };

  const programs = [
    {
      icon: Users,
      title: "Indicadores de Imóveis",
      desc: "Ideal para porteiros, zeladores, gestores de condomínio, vizinhos ou qualquer pessoa que conheça um proprietário.",
      benefits: [
        "Renda até €1.000 → €150 de comissão",
        "Renda €1.001–€2.000 → €200 de comissão",
        "Renda acima de €2.001 → €300 de comissão",
      ],
    },
    {
      icon: Briefcase,
      title: "Consultor Parceiro",
      desc: "Para consultores imobiliários, corretores e agentes independentes que querem potenciar a sua carteira.",
      benefits: [
        "35% da taxa de intermediação WEKASAS",
        "Renda €1.000 → comissão €525",
        "Renda €1.450 → comissão €761",
        "Renda €2.000 → comissão €1.050",
      ],
    },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Novo parceiro WEKASAS — ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nTelefone: ${form.phone}\nPaís: ${form.country}\nRegião: ${form.region}\nTipo: ${form.partnerType}`
    );
    window.location.href = `mailto:wekasasadm@gmail.com?subject=${subject}&body=${body}`;
    setDone(true);
    toast.success("O teu cliente de email foi aberto.");
  };

  const wa = getWhatsAppNumber();

  return (
    <>
      <PageMeta
        title="Parceiros — WEKASAS"
        description="Ganha dinheiro a indicar imóveis. Recebe até €300 por imóvel arrendado."
        path="/parceiros"
      />

      {/* SECÇÃO 1 — HERO */}
      <section className="bg-[color:var(--color-charcoal)] overflow-hidden">
        <div className="wk-container wk-section">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[10px] font-black tracking-[0.2em] text-[color:var(--color-orange)] uppercase">PROGRAMA PARCEIROS</span>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Ganha dinheiro a <br className="hidden sm:block" /> indicar imóveis.
              </h1>
              <p className="mt-6 text-base text-white/75 sm:text-lg max-w-xl leading-relaxed">
                Conheces um proprietário que quer arrendar? Indica-nos. Nós tratamos de tudo. Tu recebes até <span className="text-white font-bold underline decoration-[color:var(--color-orange)] decoration-2">€300</span> por imóvel arrendado.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="wk-pill bg-white/5 border border-white/10 text-white/80">Sem burocracia</span>
                <span className="wk-pill bg-white/5 border border-white/10 text-white/80">Pago com a 1ª renda</span>
                <span className="wk-pill bg-white/5 border border-white/10 text-white/80">PT + ES</span>
              </div>

              <div className="mt-10">
                <WekaButton asChild size="lg" className="h-14 px-8 text-base font-bold shadow-xl shadow-orange-500/20">
                  <a href="#form-parceiros">Quero ser parceiro</a>
                </WekaButton>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-square w-full">
                <img 
                  src="/assets/hero-parceiros-1.png" 
                  alt="Pedro M. parceiro WEKASAS" 
                  className="h-full w-full object-cover rounded-2xl shadow-2xl"
                />
                
                {/* Badge Superior Esquerdo */}
                <div className="absolute left-4 top-4 flex items-center gap-3 rounded-[10px] border border-white/10 bg-[rgba(33,33,33,0.85)] p-[10px_14px] backdrop-blur-[8px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-[11px] font-bold text-white">
                    PM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">Pedro M. · Portugal</p>
                    <p className="mt-1 text-[10px] font-medium text-white/50 leading-none">Parceiro desde Jan 2025</p>
                  </div>
                </div>

                {/* Badge Inferior Direito */}
                <div className="absolute bottom-6 right-4 flex items-center gap-3 rounded-[10px] border border-white/10 bg-[rgba(33,33,33,0.85)] p-[10px_14px] backdrop-blur-[8px]">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"></span>
                  </div>
                  <p className="text-xs font-bold text-white leading-none">Comissão recebida · €200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 2 — OS 2 PROGRAMAS */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#212121] sm:text-4xl">Escolhe o teu programa.</h2>
            <p className="mt-4 text-zinc-600">Duas formas de ganhar com a WEKASAS.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} className="wk-card p-8 border-zinc-200">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-zinc-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {p.desc}
                  </p>
                  <div className="mt-6 space-y-2 border-t border-zinc-100 pt-6">
                    {p.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                        <div className="h-1 w-1 rounded-full bg-[color:var(--color-orange)]" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECÇÃO 3 — COMO FUNCIONA */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <img 
                src="/assets/hero-parceiros-2.png" 
                alt="Processo de indicação" 
                className="h-[420px] w-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">3 passos. Menos de 2 minutos.</h2>
              
              <div className="mt-10 space-y-10">
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-white font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold">Indica em 2 minutos</h4>
                    <p className="mt-2 text-white/70 leading-relaxed">Envia-nos o endereço e o contacto do proprietário por WhatsApp ou pelo formulário.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-white font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold">Nós tratamos de tudo</h4>
                    <p className="mt-2 text-white/70 leading-relaxed">A WEKASAS contacta o proprietário, avalia o imóvel, publica o anúncio e encontra o inquilino certo.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-white font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold">Recebes a comissão</h4>
                    <p className="mt-2 text-white/70 leading-relaxed">Quando a primeira renda é recebida, transferimos o pagamento. €150 a €300 na tua conta.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <WekaButton asChild intent="secondary" className="h-12 border-white text-white hover:bg-white/10 px-6 font-bold">
                  <a href={`https://wa.me/${wa}?text=Olá!%20Quero%20ser%20parceiro%20WEKASAS.`} target="_blank" rel="noreferrer">
                    Indicar agora pelo WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </WekaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 4 — COMISSÕES */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <img 
                src="/assets/hero-parceiros-3.png" 
                alt="Tabela de comissões" 
                className="h-[460px] w-full object-cover object-top rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] text-[color:var(--color-orange)] uppercase">TABELA DE COMISSÕES</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#212121] sm:text-4xl">Quanto podes ganhar?</h2>
              
              <div className="mt-10 space-y-4">
                {[
                  { range: "Renda até €1.000", value: "€150" },
                  { range: "Renda €1.001–€2.000", value: "€200" },
                  { range: "Renda acima de €2.001", value: "€300" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 border-l-4 border-[color:var(--color-orange)] bg-zinc-50 rounded-r-xl">
                    <span className="text-zinc-600 font-medium">{item.range}</span>
                    <span className="text-xl font-bold text-zinc-900">{item.value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 flex items-center gap-2 text-sm font-medium text-zinc-500 italic">
                <Info className="h-4 w-4 text-[color:var(--color-orange)]" />
                Pagamento único quando a WEKASAS recebe a primeira renda do inquilino.
              </p>

              <div className="mt-10">
                <WekaButton asChild className="h-12 px-8 font-bold">
                  <a href="#form-parceiros">Simular os meus ganhos <ArrowRight className="ml-2 h-4 w-4" /></a>
                </WekaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 5 — SIMULADOR + FORMULÁRIO */}
      <section id="form-parceiros" className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                Torna-te parceiro.
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Simula os teus ganhos e envia o teu cadastro.
              </p>

              {/* SIMULATOR CARD */}
              <Card className="mt-8 p-6 bg-zinc-900 text-white rounded-3xl border-0 shadow-xl">
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-6">Simulador de Comissão</p>
                
                <div className="space-y-8">
                  <div className="flex p-1 bg-white/5 rounded-xl">
                    <button
                      onClick={() => setPartnerType("indicador")}
                      className={cn(
                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                        partnerType === "indicador" ? "bg-white text-zinc-900" : "text-white/60"
                      )}
                    >
                      Indicador
                    </button>
                    <button
                      onClick={() => setPartnerType("consultor")}
                      className={cn(
                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                        partnerType === "consultor" ? "bg-white text-zinc-900" : "text-white/60"
                      )}
                    >
                      Consultor
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <Label className="text-xs font-bold text-white/60 uppercase">Renda Estimada</Label>
                      <span className="text-xl font-black">{eur(estimatedRent)}</span>
                    </div>
                    <Slider
                      value={[estimatedRent]}
                      onValueChange={(v) => setEstimatedRent(v[0])}
                      min={500}
                      max={4000}
                      step={50}
                      className="py-4"
                    />
                  </div>

                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] font-black text-[color:var(--color-orange)] uppercase tracking-widest mb-1">A tua comissão</p>
                    <p className="text-4xl font-black text-white">{eur(calculateCommission())}</p>
                  </div>
                </div>
              </Card>

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">
                  Preferes indicar directamente no WhatsApp?
                </p>
                <a
                  href={`https://wa.me/${wa}?text=Olá! Quero ser parceiro WEKASAS.`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1fb65a]"
                >
                  <MessageCircle className="h-4 w-4" /> Falar agora
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="wk-card p-6 sm:p-8 border-zinc-200 shadow-xl">
                {!done ? (
                  <form onSubmit={onSubmit} className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome completo</Label>
                        <Input 
                          required 
                          className="h-11 rounded-xl"
                          value={form.name}
                          onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          required 
                          type="email" 
                          className="h-11 rounded-xl" 
                          value={form.email}
                          onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Telefone</Label>
                      <Input 
                        required 
                        className="h-11 rounded-xl" 
                        value={form.phone}
                        onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))}
                      />
                    </div>

                    <LocationSelect 
                      country={form.country}
                      region={form.region}
                      onCountryChange={(v) => setForm(s => ({ ...s, country: v }))}
                      onRegionChange={(v) => setForm(s => ({ ...s, region: v }))}
                    />

                    <div className="space-y-2">
                      <Label>Tipo de parceiro</Label>
                      <Select 
                        required
                        value={form.partnerType}
                        onValueChange={(v) => setForm(s => ({ ...s, partnerType: v }))}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Selecciona o perfil" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="portaria">Indicadores de Imóveis</SelectItem>
                          <SelectItem value="consultor">Consultor Parceiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <WekaButton
                      type="submit"
                      disabled={loading}
                      className="h-12 text-base font-bold"
                    >
                      {loading ? "A processar..." : "Enviar cadastro"}
                    </WekaButton>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]">
                      <UserPlus className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-zinc-900">
                      Recebemos o teu cadastro!
                    </h3>
                    <p className="mt-3 text-zinc-600 leading-relaxed">
                      Obrigado pelo interesse. O teu cliente de email foi aberto com os teus dados. Por favor, clica em "Enviar" para concluir o processo.
                    </p>
                    <div className="mt-8">
                      <WekaButton asChild intent="secondary" className="font-bold border-zinc-200 text-zinc-900">
                        <a href="/">Voltar à homepage</a>
                      </WekaButton>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}