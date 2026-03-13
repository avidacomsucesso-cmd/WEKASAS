import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function ReturnCalculator() {
  const [rent, setRent] = React.useState<number>(1200);

  const monthly = Number.isFinite(rent) ? rent : 0;
  const annualCommission = Math.round(monthly * 0.1 * 12);
  const netAnnual = Math.round(monthly * 0.9 * 12);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="wk-card lg:col-span-5">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-900">Input</p>
          <div className="mt-6 space-y-2">
            <Label className="text-zinc-700">Renda mensal esperada</Label>
            <div className="relative">
              <Input
                value={String(monthly)}
                onChange={(e) => setRent(Number(e.target.value))}
                inputMode="numeric"
                type="number"
                min={0}
                className="h-11 rounded-xl bg-white pr-12"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500">
                €
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Simulação indicativa: comissão de 10%/mês.
            </p>
          </div>
        </div>
      </Card>

      <Card className="wk-card lg:col-span-7">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-900">Resultado</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-4">
              <p className="text-xs font-semibold text-zinc-600">Comissão anual WEKASAS</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {eur(annualCommission)}
              </p>
            </div>
            <div className="rounded-xl bg-[color:var(--color-orange-light)] p-4">
              <p className="text-xs font-semibold text-[color:var(--color-orange)]">
                Rendimento líquido anual
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{eur(netAnnual)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">Sem gestão</p>
              <p className="mt-1 text-sm text-zinc-600">
                Mais stress: chamadas, atrasos, burocracia e incerteza.
              </p>
            </div>
            <div className="rounded-xl border border-[color:var(--color-orange)]/30 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">Com WEKASAS</p>
              <p className="mt-1 text-sm text-zinc-600">
                Tranquilidade: renda garantida, gestão total e suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
