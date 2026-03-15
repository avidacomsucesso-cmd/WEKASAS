import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { listings } from "@/data/listings";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type CityFilter = "Todas" | "Lisboa" | "Madrid";
type TypologyFilter = "Todas" | "T1" | "T2" | "T3";

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Arrendamentos() {
  const [city, setCity] = React.useState<CityFilter>("Todas");
  const [typology, setTypology] = React.useState<TypologyFilter>("Todas");
  const [maxPrice, setMaxPrice] = React.useState<number>(2500);

  const filtered = listings
    .filter((l) => city === "Todas" || l.city === city)
    .filter((l) => typology === "Todas" || l.typology === typology)
    .filter((l) => l.rentMonthly <= maxPrice);

  return (
    <>
      <PageMeta
        title="Arrendamentos — WEKASAS"
        description="Imóveis disponíveis para arrendar em Portugal e Espanha. Filtra por país, tipologia e preço."
        path="/arrendamentos"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
                Arrendamentos
              </h1>
              <p className="mt-4 text-base text-zinc-600 sm:text-lg">
                Imóveis disponíveis em Portugal e Espanha. Filtra e pede mais
                detalhes.
              </p>
            </div>
            <WekaButton asChild intent="secondary" className="h-11">
              <Link to="/contacto">Quero arrendar o meu imóvel</Link>
            </WekaButton>
          </div>

          <Card className="wk-card mt-10 p-6 sm:p-7">
            <p className="text-sm font-semibold text-zinc-900">Filtros</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-12">
              <div className="space-y-2 lg:col-span-4">
                <Label className="text-zinc-700">País</Label>
                <Select value={city} onValueChange={(v) => setCity(v as CityFilter)}>
                  <SelectTrigger className="h-11 rounded-xl bg-white">
                    <SelectValue placeholder="País" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todos</SelectItem>
                    <SelectItem value="Lisboa">Portugal</SelectItem>
                    <SelectItem value="Madrid">Espanha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-4">
                <Label className="text-zinc-700">Tipologia</Label>
                <Select
                  value={typology}
                  onValueChange={(v) => setTypology(v as TypologyFilter)}
                >
                  <SelectTrigger className="h-11 rounded-xl bg-white">
                    <SelectValue placeholder="Tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="T1">T1</SelectItem>
                    <SelectItem value="T2">T2</SelectItem>
                    <SelectItem value="T3">T3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-4">
                <Label className="text-zinc-700">Preço máximo</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-11 rounded-xl bg-white pr-20"
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                    {eur(maxPrice)}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <Card key={l.slug} className="wk-card overflow-hidden">
                <div className="relative">
                  <img
                    src={l.images[0]}
                    alt={l.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="rounded-full bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)] hover:bg-[color:var(--color-orange-light)]">
                      {l.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold text-[color:var(--color-orange)]">
                    {l.typology}
                  </p>
                  <p className="mt-2 text-lg font-bold text-zinc-900">
                    {l.title}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>
                      {l.neighbourhood}, {l.city}
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-600">Renda</p>
                      <p className="text-2xl font-bold text-zinc-900">
                        {eur(l.rentMonthly)}
                        <span className="text-sm font-semibold text-zinc-600">/mês</span>
                      </p>
                    </div>
                    <WekaButton asChild className="h-10 px-4">
                      <Link to={`/arrendamentos/${l.slug}`}>Ver detalhes</Link>
                    </WekaButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
              <p className="text-sm font-semibold text-zinc-900">
                Sem resultados.
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Ajusta os filtros para ver imóveis disponíveis.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}