import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const ptRegions = [
  "Lisboa", "Porto", "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco",
  "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Portalegre", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Açores", "Madeira"
];

export const esRegions = [
  "Madrid", "Barcelona", "Alicante", "Almeria", "Asturias", "Badajoz", "Bilbao",
  "Burgos", "Cádiz", "Córdoba", "Girona", "Granada", "Huelva", "Jaén", "La Coruña",
  "Las Palmas", "Lleida", "Málaga", "Murcia", "Palma de Mallorca", "Pamplona",
  "Salamanca", "San Sebastián", "Santa Cruz de Tenerife", "Santander", "Segovia",
  "Sevilla", "Tarragona", "Toledo", "Valencia", "Valladolid", "Vigo", "Zaragoza"
];

interface LocationSelectProps {
  country: string;
  region: string;
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  variant?: "light" | "dark";
}

export function LocationSelect({
  country,
  region,
  onCountryChange,
  onRegionChange,
  variant = "light"
}: LocationSelectProps) {
  const regions = country === "Portugal" ? ptRegions : esRegions;

  const triggerClass = variant === "dark" 
    ? "h-12 rounded-xl bg-zinc-50 border-transparent text-zinc-900 font-bold"
    : "h-11 rounded-xl bg-white border-zinc-200 text-zinc-900";

  const labelClass = variant === "dark"
    ? "text-xs font-black text-zinc-400 uppercase tracking-widest"
    : "text-zinc-700";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label className={labelClass}>País</Label>
        <Select value={country} onValueChange={(v) => {
          onCountryChange(v);
          onRegionChange(""); // Reset region
        }}>
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="Selecciona o país" />
          </SelectTrigger>
          <SelectContent className="bg-white border-zinc-200">
            <SelectItem value="Portugal">Portugal</SelectItem>
            <SelectItem value="Espanha">Espanha</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className={labelClass}>Região / Distrito</Label>
        <Select 
          value={region} 
          onValueChange={onRegionChange}
          disabled={!country}
        >
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="Selecciona a região" />
          </SelectTrigger>
          <SelectContent className="bg-white border-zinc-200 max-h-[300px]">
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
