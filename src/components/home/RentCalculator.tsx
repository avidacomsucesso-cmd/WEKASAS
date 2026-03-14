import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WekaButton } from "@/components/WekaButton";
import { LocationSelect } from "@/components/LocationSelect";
import { cn } from "@/lib/utils";

type City = string;
type Typology = "T0" | "T1" | "T2" | "T3" | "T4";
type Condition = "excelente" | "bom" | "a recuperar";

const baseRent: Record<string, Partial<Record<Typology, number>>> = {
  Lisboa: { T1: 1100, T2: 1450, T3: 1900 },
  Madrid: { T1: 1000, T2: 1350, T3: 1700 },
  Barcelona: { T1: 1100, T2: 1500, T3: 1900 },
  Porto: { T1: 850, T2: 1100, T3: 1400 },
  Aveiro: { T2: 800 },
  Braga: { T2: 750 },
  Coimbra: { T2: 700 },
  Setúbal: { T2: 900 },
  Faro: { T2: 950 },
  Sevilla: { T2: 1200 },
  Valencia: { T2: 1100 },
  Málaga: { T2: 1150 },
  Bilbao: { T2: 1200 },
  Zaragoza: { T2: 900 },
  Murcia: { T2: 750 },
};

function conditionMultiplier(condition: Condition) {
  if (condition === "excelente") return 1.08;
  if (condition === "a recuperar") return 0.9;
  return 1;
}

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function RentCalculator() {
  const [country, setCountry] = React.useState("Portugal");
  const [region, setRegion] = React.useState("Lisboa");
  const [typology, setTypology] = React.useState<Typology>("T2");
  const [condition, setCondition] = React.useState<Condition>("bom");

  const getBaseValue = () => {
    const specific = baseRent[region]?.[typology];
    if (specific) return specific;
    
    // Fallbacks
    if (country === "Portugal") return 650;
    return 800;
  };

  const base = getBaseValue();
  
  // New Multipliers
  const conditionMult = condition === "excelente" ? 1.0 : condition === "bom" ? 0.92 : 0.80;
  
  const estimated = Math.round(base * conditionMult);
  const commissionMonthly = Math.round(estimated * 0.1);
  
  const netAnnualSelf = Math.round(estimated * 12);
  const netAnnualWeka = Math.round((estimated - commissionMonthly) * 12);
  const diffAnnual = netAnnualSelf - netAnnualWeka;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl lg:grid-cols-12">
        {/* INPUTS PANEL */}
        <div className="p-8 lg:col-span-4 lg:p-10 border-b lg:border-b-0 lg:border-r border-zinc-100">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-[color:var(--color-orange)]" />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">O seu imóvel</h3>
          </div>
          
          <div className="space-y-8">
            <LocationSelect 
              country={country}
              region={region}
              onCountryChange={setCountry}
              onRegionChange={setRegion}
              variant="dark"
            />

            <div className="space-y-4">
              <Label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Tipologia</Label>
              <Select value={typology} onValueChange={(v) => setTypology(v as Typology)}>
                <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-transparent text-zinc-900 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  {(["T0", "T1", "T2", "T3", "T4"] as Typology[]).map((t) => (
                    <SelectItem key={t} value={t} className="font-medium">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Estado</Label>
              <Select value={condition} onValueChange={(v) => setCondition(v as Condition)}>
                <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-transparent text-zinc-900 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  <SelectItem value="excelente" className="font-medium">Excelente</SelectItem>
                  <SelectItem value="bom" className="font-medium">Bom</SelectItem>
                  <SelectItem value="a recuperar" className="font-medium">A recuperar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="mt-10 text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">
            * Estimativas baseadas em valores médios de mercado. Não vinculativas.
          </p>
        </div>

        {/* COMPARISON PANEL */}
        <div className="lg:col-span-8 grid md:grid-cols-2 relative bg-zinc-50">
          {/* Column A - Sem Gestão */}
          <div className="p-8 lg:p-10 border-r border-zinc-200/50">
            <div className="mb-6">
              <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">Por conta própria</h4>
              <p className="text-lg font-bold text-zinc-900">Sem gestão</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Renda mensal</span>
                <span className="font-bold text-zinc-900">{eur(estimated)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Gestão</span>
                <span className="font-bold text-zinc-900">€0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Garantia</span>
                <span className="font-bold text-red-500">Não incluída</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Tempo arrendar</span>
                <span className="font-bold text-zinc-900">45–60 dias</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Se inquilino falhar</span>
                <span className="font-bold text-zinc-900">€0</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Líquido Anual</p>
              <p className="text-2xl font-black text-zinc-900">{eur(netAnnualSelf)}</p>
              <p className="mt-2 text-[10px] font-bold text-red-400 uppercase tracking-tighter italic">Risco não coberto</p>
            </div>
          </div>

          {/* VS Element */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-0 pointer-events-none">
            <div className="bg-[color:var(--color-orange)] rounded-full h-14 w-14 flex items-center justify-center shadow-[0_0_20px_rgba(250,98,28,0.4)] border-4 border-white">
              <span className="text-sm font-black text-white">VS</span>
            </div>
            <div className="mt-[-8px] bg-white px-4 py-2 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-zinc-100 whitespace-nowrap">
              <p className="text-[11px] font-black text-zinc-900 leading-tight text-center">
                {eur(diffAnnual)}/ano <br/>
                <span className="text-[color:var(--color-orange)] uppercase tracking-tighter">pela tranquilidade</span>
              </p>
            </div>
          </div>

          {/* Column B - Com WEKASAS */}
          <div className="p-8 lg:p-10 bg-zinc-900 relative ring-4 ring-[color:var(--color-orange)] ring-inset">
            <div className="absolute top-4 right-4">
              <span className="bg-[color:var(--color-orange)] text-white text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-widest shadow-lg shadow-orange-500/20">
                Recomendado
              </span>
            </div>
            <div className="mb-6">
              <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-1">Com WEKASAS</h4>
              <p className="text-lg font-bold text-white">Renda Garantida</p>
            </div>

            <div className="space-y-4 mb-8 text-white/90">
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">Renda mensal</span>
                <span className="font-bold">{eur(estimated)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">Gestão (10%)</span>
                <span className="font-bold text-[color:var(--color-orange)]">-{eur(commissionMonthly)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">Garantia</span>
                <span className="font-bold text-[#22C55E]">Incluída ✓</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">Tempo arrendar</span>
                <span className="font-bold">18 dias</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">Se inquilino falhar</span>
                <span className="font-bold text-[#22C55E]">{eur(estimated - commissionMonthly)} ✓</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Líquido Anual</p>
              <p className="text-2xl font-black text-white">{eur(netAnnualWeka)}</p>
              <p className="mt-2 text-[10px] font-bold text-[#22C55E] uppercase tracking-tighter">Renda garantida todos os meses</p>
            </div>

            <div className="mt-8">
              <WekaButton asChild className="w-full h-12 rounded-xl text-sm font-black shadow-lg shadow-orange-500/30">
                <a href="/contacto">Quero arrendar com a WEKASAS</a>
              </WekaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}