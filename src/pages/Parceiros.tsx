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
import { Users, Briefcase, MessageCircle, Info, UserPlus } from "lucide-react";
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
  
  // Calculator State
  const [partnerType, setPartnerType] = React.useState<"indicador" | "consultor">("indicador");
  const [estimatedRent, setEstimatedRent] = React.useState(1450);

  const calculateCommission = () => {
    if (partnerType === "indicador") {
      if (estimatedRent <= 1000) return 150;
      if (estimatedRent <= 2000) return 200;
      return 300;
    } else {
      // Consultor: 35% of WEKASAS fee (1.5 rents)
      // Fee = estimatedRent * 1.5
      // Commission = Fee * 0.35
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/parceiros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Não foi possível enviar. Liga-nos: +351 96 252 5307");
        return;
      }

      setDone(true);
      toast.success("Candidatura enviada. Vamos contactar em breve.");
    } catch {
      toast.error("Não foi possível enviar. Liga-nos: +351 96 252 5307");
    } finally {
      setLoading(false);
    }
  }

  const wa = getWhatsAppNumber();

  return (
    <>
      <PageMeta
        title="Parceiros — WEKASAS"
        description="Ganha dinheiro a indicar imóveis. Programas para indicadores e consultores imobiliários."
        path="/parceiros"
      />

      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              Ganha dinheiro a indicar imóveis.
            </h1>
            <p className="mt-5 text-base text-white/75 sm:text-lg">
              Indica-nos proprietários. Nós tratamos de tudo. Recebe comissões atrativas por cada imóvel arrendado.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section">
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

          <div className="mt-12 flex items-center gap-3 rounded-2xl bg-zinc-50 p-6 border border-zinc-200">
            <Info className="h-5 w-5 text-[color:var(--color-orange)] shrink-0" />
            <p className="text-sm font-bold text-zinc-700">
              Quando se paga: <span className="font-normal">O pagamento é feito integralmente quando a WEKASAS recebe a primeira renda do inquilino.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
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
                        <SelectContent>
                          <SelectItem value="portaria">Parceiros da Portaria</SelectItem>
                          <SelectItem value="indica">Indica WEKASAS</SelectItem>
                          <SelectItem value="corretor">Corretor Parceiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <WekaButton
                      type="submit"
                      disabled={loading}
                      className="h-12 text-base"
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
                    <p className="mt-3 text-zinc-600">
                      Obrigado pelo interesse. Vamos contactar-te nas próximas 48 horas para explicar os próximos passos.
                    </p>
                    <div className="mt-8">
                      <WekaButton asChild intent="secondary">
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