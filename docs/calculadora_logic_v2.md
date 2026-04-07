# Prompt Dyad — WEKASAS Calculadora de Renda v2

Substitui a calculadora de renda existente no site WEKASAS por uma versão significativamente melhorada, com dados oficiais do INE ao nível de freguesia, metragem, e cruzamento com preços de mercado do Idealista.

---

## O que muda

A calculadora actual usa apenas tipologia + distrito — resultado demasiado genérico.
A nova usa: **distrito → município → freguesia + metragem + tipologia + estado do imóvel**.

Resultado: estimativa real baseada em €/m² por freguesia (INE), cruzada com mercado (Idealista), ajustada por tipologia e estado.

---

## Componente a substituir

Localizar o componente actual da calculadora (provavelmente `RentalCalculator.tsx` ou similar) e substituir o seu conteúdo completo. Não criar componente novo — substituir o existente para manter as rotas e imports intactos.

---

## Fórmula de cálculo

```typescript
const PESO_INE = 0.55;        // 55% peso dados oficiais INE
const PESO_IDEALISTA = 0.45;  // 45% peso mercado Idealista

const basePorM2 = (ine_por_m2 * PESO_INE) + (idealista_por_m2 * PESO_IDEALISTA);
const rendaBruta = basePorM2 * area_m2 * fator_tipologia * fator_estado;

// Intervalo ±8% arredondado a €5
const minRenda = Math.round(rendaBruta * 0.92 / 5) * 5;
const maxRenda = Math.round(rendaBruta * 1.08 / 5) * 5;
const mediaRenda = Math.round(rendaBruta / 5) * 5;
```

---

## Factores de ajuste

```typescript
// Tipologia — imóveis menores por m² têm rendimento relativo superior
const FATOR_TIPOLOGIA: Record<string, number> = {
  'T0': 1.18,   // T0/Studio — rendimento/m² muito alto
  'T1': 1.10,
  'T2': 1.00,   // referência base
  'T3': 0.96,
  'T4': 0.92,
  'T5+': 0.88,
};

// Estado do imóvel
const FATOR_ESTADO: Record<string, number> = {
  'novo':     1.12,  // novo ou remodelado recentemente
  'premium':  1.25,  // acabamentos de luxo
  'medio':    1.00,  // bom estado de conservação (referência)
  'basico':   0.85,  // necessita de obras
};
```

---

## Base de dados de preços (hardcoded — actualizar semestralmente com dados INE)

```typescript
// Fonte: INE — Estatísticas de Rendas da Habitação ao Nível Local · 2.º Sem 2024
// Fonte: Idealista Portugal — Preço médio de arrendamento por zona · 2024
// Formato: { ine: €/m², idealista: €/m² }

export const DADOS_RENDA = {
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
```

---

## Interface do componente (`RentalCalculator.tsx` ou equivalente)

### Campos em cascata (ordem obrigatória):

**Campo 1 — Distrito/Região** (select)
Opções: Lisboa · Porto · Setúbal · Algarve · Outro distrito

**Campo 2 — Município** (select, aparece após seleccionar distrito)
Populado dinamicamente a partir de `DADOS_RENDA[distrito].municipios`
Apenas municípios do distrito seleccionado

**Campo 3 — Freguesia** (select, aparece APENAS se o município tiver `freguesias`)
Populado dinamicamente. Se o município não tiver `freguesias`, salta este passo.

**Campo 4 — Tipologia** (select, em linha com Campo 5)
T0 · T1 · T2 · T3 · T4 · T5+

**Campo 5 — Área em m²** (number input, em linha com Campo 4)
Min: 20 · Max: 600 · Placeholder: "ex: 85"

**Campo 6 — Estado do imóvel** (select)
- Médio (bom estado de conservação)
- Novo / Remodelado recentemente
- Premium (acabamentos de luxo)
- Básico (necessita de obras)

### Comportamento:
- O resultado aparece automaticamente ao preencher os 5 campos obrigatórios (distrito, município, tipologia, área, estado)
- A freguesia é obrigatória apenas quando o município tem freguesias disponíveis
- Sem botão de "calcular" — o cálculo é reactivo (onChange em todos os campos)

---

## Resultado a apresentar

### Valor principal:
```
Estimativa de renda mensal
€ 1.425 / mês
Intervalo de mercado: € 1.310 — € 1.540
```

### 3 cards de transparência (abaixo do valor):
```
€ 19.05/m²          € 19.20/m²          0.96 × 1.00
INE €/m² (freguesia) Idealista €/m²      Factor tipologia×estado
```

### Nota de fontes (pequena, abaixo dos cards):
```
[INE] Estatísticas de Rendas ao Nível Local · 2.º Sem 2024
[Idealista] Preço médio de mercado por zona · 2024
[WEKASAS] Factor de ajuste por tipologia e estado do imóvel
Valores indicativos. A WEKASAS realiza avaliação presencial gratuita.
```

### CTA abaixo do resultado:
Botão laranja → "Quero uma avaliação gratuita" → scroll para formulário de contacto

---

## Tipos TypeScript

```typescript
interface FreguesiaDados {
  label: string;
  ine: number;       // renda mediana €/m² — INE 2024
  idealista: number; // preço médio €/m² — Idealista 2024
}

interface MunicipioDados {
  label: string;
  ine?: number;       // usado quando não há freguesias
  idealista?: number; // usado quando não há freguesias
  freguesias?: Record<string, FreguesiaDados>;
}

interface DistritoDados {
  label: string;
  municipios: Record<string, MunicipioDados>;
}

interface CalculoResult {
  mediaRenda: number;
  minRenda: number;
  maxRenda: number;
  inePorM2: number;
  idealistaPorM2: number;
  fatorTipologia: number;
  fatorEstado: number;
}
```

---

## Função de cálculo

```typescript
function calcularRenda(
  ine: number,
  idealista: number,
  area: number,
  tipologia: keyof typeof FATOR_TIPOLOGIA,
  estado: keyof typeof FATOR_ESTADO
): CalculoResult {
  const PESO_INE = 0.55;
  const PESO_IDEALISTA = 0.45;

  const fTipo   = FATOR_TIPOLOGIA[tipologia];
  const fEstado = FATOR_ESTADO[estado];
  const basePorM2  = (ine * PESO_INE) + (idealista * PESO_IDEALISTA);
  const rendaBruta = basePorM2 * area * fTipo * fEstado;

  // Arredondar a múltiplos de 5€
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
```

---

## Nota para actualizações futuras

O INE publica as "Estatísticas de Rendas da Habitação ao Nível Local" semestralmente (Junho e Dezembro). Criar comentário no ficheiro de dados:

```typescript
// ÚLTIMA ACTUALIZAÇÃO: Dezembro 2024 (2.º Semestre 2024)
// PRÓXIMA ACTUALIZAÇÃO PREVISTA: Junho 2025 (1.º Semestre 2025)
// FONTE: https://www.ine.pt — Estatísticas de Rendas da Habitação ao Nível Local
// Para actualizar: substituir os valores ine: XX.XX com os novos dados do INE
```

---

## Notas de implementação

- Manter exactamente os mesmos props e exports do componente actual para não quebrar nada
- Não alterar o CSS global nem os estilos de outras secções
- O componente é self-contained — todo o estado é local (useState)
- Usar `toLocaleString('pt-PT')` para formatar valores monetários
- Não usar bibliotecas externas — cálculo puro em JS/TS
