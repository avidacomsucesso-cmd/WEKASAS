import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WekaButton } from "@/components/WekaButton";
import { cn } from "@/lib/utils";

type City = "Lisboa" | "Madrid" | "Barcelona" | "Porto";
type Typology = "T0" | "T1" | "T2" | "T3" | "T4";
type Condition = "excelente" | "bom" | "a recuperar";

const baseRent: Record<City, Partial<Record<Typology, number>>> = {
  Lisboa: { T1: 1100, T2: 1450, T3: 1900 },
  Madrid: { T1: 1000, T2: 1350, T3: 1700 },
  Barcelona: { T1: 1100, T2: 1500, T3: 1900 },
  Porto: { T1: 850, T2: 1100, T3: 1400 },
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
  const [city, setCity] = React.useState<City>("Lisboa");
  const [typology, setTypology] = React.useState<Typology>("T2");
  const [condition, setCondition] = React.useState<Condition>("bom");

  const base = baseRent[city][typology] ?? 0;
  const estimated = Math.round(base * conditionMultiplier(condition));
  const commissionMonthly = Math.round(estimated * 0.1);
  const netAnnual = Math.round((estimated - commissionMonthly) * 12);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl lg:grid-cols-12">
        {/* INPUTS PANEL */}
        <div className="p-8 lg:col-span-7 lg:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-[color:var(--color-orange)]" />
            <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider">Simulação</h3>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-1">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-zinc-500 uppercase tracking-tight">Onde se localiza o imóvel?</Label>
              <div className="flex flex-wrap gap-2">
                {(["Lisboa", "Porto", "Madrid", "Barcelona"] as City[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={cn(
                      "px-6 py-3 rounded-xl border text-sm font-bold transition-all",
                      city === c 
                        ? "bg-zinc-900 border-zinc-900 text-white shadow-lg" 
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <Label className="text-sm font-bold text-zinc-500 uppercase tracking-tight">Tipologia</Label>
                <Select value={typology} onValueChange={(v) => setTypology(v as Typology)}>
                  <SelectTrigger className="h-14 rounded-2xl bg-zinc-50 border-transparent text-zinc-900 text-lg font-bold focus:ring-orange-500">
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
                <Label className="text-sm font-bold text-zinc-500 uppercase tracking-tight">Estado de Conservação</Label>
                <Select value={condition} onValueChange={(v) => setCondition(v as Condition)}>
                  <SelectTrigger className="h-14 rounded-2xl bg-zinc-50 border-transparent text-zinc-900 text-lg font-bold focus:ring-orange-500">
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
          </div>

          <p className="mt-12 text-xs font-medium text-zinc-400 italic">
            * Valores médios de mercado. A avaliação final requer vistoria técnica.
          </p>
        </div>

        {/* RESULTS PANEL */}
        <div className="bg-zinc-900 p-8 lg:col-span-5 lg:p-12">
          <div className="flex items-center gap-2 mb-10">
            <div className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Estimativa WEKASAS</h3>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Renda Mensal Bruta</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white tracking-tighter">{eur(estimated)}</span>
                <span className="text-xl font-bold text-zinc-500">/mês</span>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-400 uppercase">Gestão WEKASAS (10%)</span>
                <span className="text-lg font-bold text-zinc-200">-{eur(commissionMonthly)}</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[color:var(--color-orange)] uppercase tracking-widest">Rendimento Líquido</p>
                  <p className="text-sm font-medium text-zinc-400">Anual Garantido</p>
                </div>
                <span className="text-3xl font-black text-white">{eur(netAnnual)}</span>
              </div>
            </div>

            <div className="pt-6">
              <WekaButton asChild className="w-full h-14 rounded-2xl text-base font-black shadow-lg shadow-orange-500/20">
                <a href="/contacto">Solicitar Avaliação Real</a>
              </WekaButton>
              <p className="text-center mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Seguro de incumprimento incluído</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}