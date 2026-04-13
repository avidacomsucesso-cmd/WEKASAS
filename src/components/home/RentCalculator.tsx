import * as React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Info, TrendingUp, Landmark, Activity, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// --- DATA & CONSTANTS ---

// ÚLTIMA ATUALIZAÇÃO: Dezembro 2024 (2.º Semestre 2024)
// PRÓXIMA ATUALIZAÇÃO PREVISTA: Junho 2025 (1.º Semestre 2025)
// FONTE: https://www.ine.pt — Estatísticas de Rendas da Habitação ao Nível Local

interface FreguesiaDados {
  label: string;
  ine: number;
  idealista: number;
}

interface MunicipioDados {
  label: string;
  ine?: number;
  idealista?: number;
  freguesias?: Record<string, FreguesiaDados>;
}

interface DistritoDados {
  label: string;
  municipios: Record<string, MunicipioDados>;
}

export const DADOS_RENDA: Record<string, DistritoDados> = {
  lisboa: {
    label: 'Lisboa',
    municipios: {
      'lisboa': {
        label: 'Lisboa (município)',
        freguesias: {
          'santo-antonio':    { label: 'Santo António',                        ine: 20.00, idealista: 22.5 },
          'campo-ourique':    { label: 'Campo de Ourique',                     ine: 19.02, idealista: 18.8 },
          'parque-nacoes':    { label: 'Parque das Nações',                    ine: 19.05, idealista: 19.2 },
          'sta-maria-maior':  { label: 'Santa Maria Maior',                    ine: 19.33, idealista: 20.1 },
          'misericordia':     { label: 'Misericórdia',                         ine: 18.35, idealista: 19.0 },
          'estrela':          { label: 'Estrela',                              ine: 17.80, idealista: 18.2 },
          'ajuda':            { label: 'Ajuda',                                ine: 17.06, idealista: 16.5 },
          'campolide':        { label: 'Campolide',                            ine: 17.05, idealista: 16.8 },
          'avenidas-novas':   { label: 'Avenidas Novas',                       ine: 16.56, idealista: 17.1 },
          'sao-vicente':      { label: 'São Vicente',                          ine: 16.24, idealista: 16.5 },
          'belem':            { label: 'Belém',                                ine: 16.14, idealista: 15.9 },
          'carnide':          { label: 'Carnide',                              ine: 16.27, idealista: 15.2 },
          'arroios':          { label: 'Arroios',                              ine: 15.40, idealista: 15.8 },
          'alvalade':         { label: 'Alvalade',                             ine: 14.80, idealista: 15.0 },
          'benfica':          { label: 'São Domingos de Benfica',              ine: 14.20, idealista: 14.1 },
          'lumiar':           { label: 'Lumiar',                               ine: 13.90, idealista: 13.5 },
          'olivais':          { label: 'Olivais',                              ine: 13.10, idealista: 12.8 },
          'marvila':          { label: 'Marvila',                              ine: 12.50, idealista: 13.2 },
          'beato':            { label: 'Beato',                                ine: 13.20, idealista: 13.8 },
          'penha-franca':     { label: 'Penha de França',                      ine: 14.10, idealista: 14.0 },
          'santa-clara':      { label: 'Santa Clara',                          ine: 12.80, idealista: 12.0 },
          'benfica-uf':       { label: 'Benfica',                              ine: 13.60, idealista: 13.2 },
        }
      },
      'cascais':  { label: 'Cascais',        ine: 15.31, idealista: 16.2 },
      'oeiras':   { label: 'Oeiras',         ine: 13.80, idealista: 14.0 },
      'sintra':   { label: 'Sintra',         ine: 10.20, idealista: 10.8 },
      'amadora':  { label: 'Amadora',        ine: 11.40, idealista: 11.2 },
      'loures':   { label: 'Loures',         ine: 10.90, idealista: 10.5 },
      'odivelas': { label: 'Odivelas',       ine: 11.20, idealista: 10.9 },
      'mafra':    { label: 'Mafra',          ine:  9.50, idealista:  9.2 },
      'vila-franca': { label: 'Vila Franca de Xira', ine: 9.80, idealista: 9.6 },
      'alenquer': { label: 'Alenquer',       ine:  8.20, idealista:  8.0 },
    }
  },
  porto: {
    label: 'Porto',
    municipios: {
      'porto': {
        label: 'Porto (município)',
        freguesias: {
          'foz-nevogilde':  { label: 'Aldoar, Foz do Douro e Nevogilde',              ine: 14.29, idealista: 15.2 },
          'lordelo':        { label: 'Lordelo do Ouro e Massarelos',                  ine: 12.97, idealista: 13.5 },
          'cedofeita':      { label: 'Cedofeita, Ildefonso, Sé, Miragaia, Vitória',   ine: 13.50, idealista: 14.0 },
          'paranhos':       { label: 'Paranhos',                                      ine: 11.20, idealista: 11.5 },
          'ramalde':        { label: 'Ramalde',                                       ine: 11.50, idealista: 11.2 },
          'campanha':       { label: 'Campanhã',                                      ine: 10.80, idealista: 10.5 },
          'bonfim':         { label: 'Bonfim',                                        ine: 12.10, idealista: 12.5 },
        }
      },
      'matosinhos':  { label: 'Matosinhos',         ine: 11.80, idealista: 12.2 },
      'gaia':        { label: 'Vila Nova de Gaia',  ine: 10.90, idealista: 11.2 },
      'gondomar':    { label: 'Gondomar',            ine:  9.80, idealista:  9.5 },
      'maia':        { label: 'Maia',                ine:  9.60, idealista:  9.2 },
      'valongo':     { label: 'Valongo',             ine:  8.90, idealista:  8.6 },
      'braga':       { label: 'Braga',               ine:  8.50, idealista:  8.8 },
      'guimaraes':   { label: 'Guimarães',           ine:  8.10, idealista:  8.3 },
    }
  },
  setubal: {
    label: 'Setúbal',
    municipios: {
      'almada':     { label: 'Almada',      ine: 11.50, idealista: 11.8 },
      'seixal':     { label: 'Seixal',      ine: 10.40, idealista: 10.2 },
      'setubal':    { label: 'Setúbal',     ine:  9.20, idealista:  9.0 },
      'barreiro':   { label: 'Barreiro',    ine:  9.80, idealista:  9.5 },
      'moita':      { label: 'Moita',       ine:  9.10, idealista:  8.8 },
      'palmela':    { label: 'Palmela',     ine:  8.90, idealista:  8.6 },
      'sesimbra':   { label: 'Sesimbra',    ine:  9.50, idealista: 10.0 },
      'montijo':    { label: 'Montijo',     ine:  9.00, idealista:  8.8 },
      'alcochete':  { label: 'Alcochete',   ine:  8.70, idealista:  8.5 },
    }
  },
  algarve: {
    label: 'Algarve',
    municipios: {
      'faro':      { label: 'Faro',         ine: 10.20, idealista: 10.8 },
      'loule':     { label: 'Loulé',        ine: 11.50, idealista: 12.5 },
      'portimao':  { label: 'Portimão',     ine: 10.80, idealista: 11.2 },
      'silves':    { label: 'Silves',        ine:  9.80, idealista: 10.0 },
      'albufeira': { label: 'Albufeira',    ine: 11.20, idealista: 12.0 },
      'lagos':     { label: 'Lagos',         ine: 10.90, idealista: 11.5 },
      'tavira':    { label: 'Tavira',        ine:  9.50, idealista:  9.8 },
      'olhao':     { label: 'Olhão',         ine:  9.30, idealista:  9.5 },
      'vila-real': { label: 'Vila Real de Santo António', ine: 9.10, idealista: 9.3 },
      'castro-marim': { label: 'Castro Marim', ine: 8.80, idealista: 9.0 },
      'alcoutim':  { label: 'Alcoutim',     ine:  7.20, idealista:  7.5 },
    }
  },
  outros: {
    label: 'Outro distrito',
    municipios: {
      'aveiro':    { label: 'Aveiro',       ine:  7.80, idealista:  8.0 },
      'coimbra':   { label: 'Coimbra',      ine:  8.20, idealista:  8.5 },
      'viseu':     { label: 'Viseu',        ine:  6.80, idealista:  7.0 },
      'leiria':    { label: 'Leiria',       ine:  7.50, idealista:  7.8 },
      'evora':     { label: 'Évora',        ine:  7.20, idealista:  7.5 },
      'beja':      { label: 'Beja',         ine:  6.20, idealista:  6.5 },
      'braganca':  { label: 'Bragança',     ine:  5.80, idealista:  6.0 },
      'castelo-branco': { label: 'Castelo Branco', ine: 6.00, idealista: 6.2 },
      'faro-out':  { label: 'Outro (Algarve interior)', ine: 8.00, idealista: 8.2 },
      'viana':     { label: 'Viana do Castelo', ine: 7.10, idealista: 7.3 },
      'outros-pt': { label: 'Outro município', ine: 6.50, idealista: 6.8 },
    }
  }
};

const FATOR_TIPOLOGIA: Record<string, number> = {
  'T0': 1.18,
  'T1': 1.10,
  'T2': 1.00,
  'T3': 0.96,
  'T4': 0.92,
  'T5+': 0.88,
};

const FATOR_ESTADO: Record<string, number> = {
  'medio':    1.00,
  'novo':     1.12,
  'premium':  1.25,
  'basico':   0.85,
};

// --- LOGIC ---

interface CalculoResult {
  mediaRenda: number;
  minRenda: number;
  maxRenda: number;
  inePorM2: number;
  idealistaPorM2: number;
  fatorTipologia: number;
  fatorEstado: number;
}

function calcularRenda(
  ine: number,
  idealista: number,
  area: number,
  tipologia: string,
  estado: string
): CalculoResult {
  const PESO_INE = 0.55;
  const PESO_IDEALISTA = 0.45;

  const fTipo   = FATOR_TIPOLOGIA[tipologia] || 1.0;
  const fEstado = FATOR_ESTADO[estado] || 1.0;
  const basePorM2  = (ine * PESO_INE) + (idealista * PESO_IDEALISTA);
  const rendaBruta = basePorM2 * area * fTipo * fEstado;

  const arredondar = (v: number) => Math.round(v / 5) * 5;

  return {
    mediaRenda:       arredondar(rendaBruta),
    minRenda:         arredondar(rendaBruta * 0.92),
    maxRenda:         arredondar(rendaBruta * 1.08),
    inePorM2:         ine,
    idealistaPorM2:   idealista,
    fatorTipologia:   fTipo,
    fatorEstado:      fEstado,
  };
}

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

// --- COMPONENT ---

export function RentCalculator() {
  const { t } = useTranslation();
  
  // State
  const [distrito, setDistrito] = React.useState("lisboa");
  const [municipio, setMunicipio] = React.useState("lisboa");
  const [freguesia, setFreguesia] = React.useState("santo-antonio");
  const [tipologia, setTipology] = React.useState("T2");
  const [area, setArea] = React.useState("85");
  const [estado, setEstado] = React.useState("medio");

  // Dynamic Options
  const distritos = Object.entries(DADOS_RENDA);
  const municipios = distrito ? Object.entries(DADOS_RENDA[distrito].municipios) : [];
  const selectedMuniData = municipio ? DADOS_RENDA[distrito].municipios[municipio] : null;
  const freguesias = selectedMuniData?.freguesias ? Object.entries(selectedMuniData.freguesias) : [];

  // Refs for auto-scrolling if needed or just calculation
  const resultRef = React.useRef<HTMLDivElement>(null);

  // Auto-reset cascade
  React.useEffect(() => {
    if (!DADOS_RENDA[distrito].municipios[municipio]) {
      const firstMuni = Object.keys(DADOS_RENDA[distrito].municipios)[0];
      setMunicipio(firstMuni);
    }
  }, [distrito]);

  React.useEffect(() => {
    if (selectedMuniData?.freguesias) {
      if (!selectedMuniData.freguesias[freguesia]) {
        setFreguesia(Object.keys(selectedMuniData.freguesias)[0]);
      }
    } else {
      setFreguesia("");
    }
  }, [municipio, selectedMuniData]);

  // Calculation Result
  const areaVal = parseFloat(area) || 0;
  
  let result: CalculoResult | null = null;
  const isReady = distrito && municipio && (freguesias.length > 0 ? freguesia : true) && tipologia && areaVal >= 20 && estado;

  if (isReady) {
    let baseIne = 0;
    let baseIdealista = 0;

    if (freguesias.length > 0 && freguesia) {
      const fData = selectedMuniData.freguesias[freguesia];
      baseIne = fData.ine;
      baseIdealista = fData.idealista;
    } else if (selectedMuniData) {
      baseIne = selectedMuniData.ine || 0;
      baseIdealista = selectedMuniData.idealista || 0;
    }

    result = calcularRenda(baseIne, baseIdealista, areaVal, tipologia, estado);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl lg:grid-cols-12">
        
        {/* INPUTS PANEL */}
        <div className="p-8 lg:col-span-5 lg:p-10 border-b lg:border-b-0 lg:border-r border-zinc-100 bg-zinc-50/30">
          <div className="flex items-center gap-2 mb-8 text-[color:var(--color-orange)]">
            <Activity className="h-5 w-5" />
            <h3 className="text-xs font-black uppercase tracking-widest">Simulador de Arrendamento</h3>
          </div>
          
          <div className="space-y-6">
            {/* Distrito */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Distrito / Região</Label>
              <Select value={distrito} onValueChange={setDistrito}>
                <SelectTrigger className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  {distritos.map(([id, d]) => (
                    <SelectItem key={id} value={id} className="font-medium">{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Município */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Município</Label>
              <Select value={municipio} onValueChange={setMunicipio}>
                <SelectTrigger className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  {municipios.map(([id, m]) => (
                    <SelectItem key={id} value={id} className="font-medium">{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Freguesia (Conditional) */}
            {freguesias.length > 0 && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Freguesia</Label>
                <Select value={freguesia} onValueChange={setFreguesia}>
                  <SelectTrigger className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200">
                    {freguesias.map(([id, f]) => (
                      <SelectItem key={id} value={id} className="font-medium">{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Tipologia */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Tipologia</Label>
                <Select value={tipologia} onValueChange={setTipology}>
                  <SelectTrigger className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200">
                    {Object.keys(FATOR_TIPOLOGIA).map((t) => (
                      <SelectItem key={t} value={t} className="font-medium">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Área */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Área m²</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={area} 
                    onChange={e => setArea(e.target.value)}
                    className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900 pr-10"
                    placeholder="ex: 85"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">m²</span>
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Estado do Imóvel</Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="h-12 rounded-xl bg-white border-zinc-200 shadow-sm font-bold text-zinc-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  <SelectItem value="medio">Médio (bom estado)</SelectItem>
                  <SelectItem value="novo">Novo / Remodelado</SelectItem>
                  <SelectItem value="premium">Premium (luxo)</SelectItem>
                  <SelectItem value="basico">Básico (obras)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 lg:p-12 bg-white relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <TrendingUp className="h-64 w-64 text-zinc-900" />
          </div>

          {!isReady ? (
            <div className="text-center py-20 space-y-4">
              <Activity className="h-12 w-12 text-zinc-200 mx-auto animate-pulse" />
              <p className="text-zinc-400 font-bold text-sm uppercase tracking-widest">A aguardar dados do imóvel...</p>
            </div>
          ) : result && (
            <div ref={resultRef} className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center mb-10">
                <p className="text-xs font-black text-[color:var(--color-orange)] uppercase tracking-[0.2em] mb-4">Estimativa de renda mensal</p>
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter text-zinc-900">{eur(result.mediaRenda).replace('€', '')}</span>
                  <span className="text-2xl font-bold text-zinc-400">€ / mês</span>
                </div>
                <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200">
                  <p className="text-xs font-bold text-zinc-600">
                    Intervalo de mercado: <span className="text-zinc-900">{eur(result.minRenda)} — {eur(result.maxRenda)}</span>
                  </p>
                </div>
              </div>

              {/* Data Cards */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-center">
                  <Landmark className="h-4 w-4 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm font-black text-zinc-900 leading-tight">{result.inePorM2.toFixed(2)}€/m²</p>
                  <p className="text-[8px] font-bold text-zinc-400 uppercase mt-1">INE (Freguesia)</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-center">
                  <TrendingUp className="h-4 w-4 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm font-black text-zinc-900 leading-tight">{result.idealistaPorM2.toFixed(2)}€/m²</p>
                  <p className="text-[8px] font-bold text-zinc-400 uppercase mt-1">Idealista</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-center">
                  <Activity className="h-4 w-4 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm font-black text-zinc-900 leading-tight">{(result.fatorTipologia * result.fatorEstado).toFixed(2)}x</p>
                  <p className="text-[8px] font-bold text-zinc-400 uppercase mt-1">Fator Ajuste</p>
                </div>
              </div>

              {/* Sources */}
              <div className="space-y-1 opacity-40 hover:opacity-80 transition-opacity cursor-default mb-10">
                <div className="flex items-start gap-2">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  <p className="text-[9px] leading-tight font-medium text-zinc-600">
                    [INE] Estatísticas de Rendas ao Nível Local · 2.º Sem 2024 <br/>
                    [Idealista] Preço médio de mercado por zona · 2024 <br/>
                    [WEKASAS] Factor de ajuste por tipologia e estado do imóvel <br/>
                    Valores indicativos. A WEKASAS realiza avaliação presencial gratuita.
                  </p>
                </div>
              </div>

              <WekaButton asChild size="lg" className="w-full h-14 rounded-2xl text-base font-black shadow-xl shadow-orange-500/20">
                <a href="/contacto" className="flex items-center justify-center gap-2">
                  Quero uma avaliação gratuita <ChevronRight className="h-5 w-5" />
                </a>
              </WekaButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}