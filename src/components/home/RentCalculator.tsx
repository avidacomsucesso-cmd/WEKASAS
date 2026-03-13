import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="wk-card lg:col-span-7">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-900">Inputs</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-zinc-700">Cidade</Label>
              <Select value={city} onValueChange={(v) => setCity(v as City)}>
                <SelectTrigger className="h-11 rounded-xl bg-white">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lisboa">Lisboa</SelectItem>
                  <SelectItem value="Madrid">Madrid</SelectItem>
                  <SelectItem value="Barcelona">Barcelona</SelectItem>
                  <SelectItem value="Porto">Porto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700">Tipologia</Label>
              <Select
                value={typology}
                onValueChange={(v) => setTypology(v as Typology)}
              >
                <SelectTrigger className="h-11 rounded-xl bg-white">
                  <SelectValue placeholder="Tipologia" />
                </SelectTrigger>
                <SelectContent>
                  {(["T0", "T1", "T2", "T3", "T4"] as Typology[]).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700">Estado</Label>
              <Select
                value={condition}
                onValueChange={(v) => setCondition(v as Condition)}
              >
                <SelectTrigger className="h-11 rounded-xl bg-white">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excelente">Excelente</SelectItem>
                  <SelectItem value="bom">Bom</SelectItem>
                  <SelectItem value="a recuperar">A recuperar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {base === 0 ? (
            <p className="mt-6 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
              Ainda não temos uma estimativa para {city} {typology}. Experimenta T1,
              T2 ou T3.
            </p>
          ) : (
            <p className="mt-6 text-sm text-zinc-600">
              Estimativa indicativa (não vinculativa), com base em valores médios de
              mercado.
            </p>
          )}
        </div>
      </Card>

      <Card className={cn("wk-card lg:col-span-5", base === 0 && "opacity-60")}>
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-900">Resultado</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-[color:var(--color-orange-light)] p-4">
              <p className="text-xs font-semibold text-[color:var(--color-orange)]">
                Renda estimada
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {eur(estimated || 0)}
                <span className="text-sm font-semibold text-zinc-600">/mês</span>
              </p>
            </div>

            <div className="grid gap-3 rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">Comissão WEKASAS</span>
                <span className="font-semibold text-zinc-900">{eur(commissionMonthly || 0)} / mês</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">Rendimento líquido anual</span>
                <span className="font-semibold text-zinc-900">{eur(netAnnual || 0)}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-500">
              Comissão de gestão mensal: 10% da renda.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
