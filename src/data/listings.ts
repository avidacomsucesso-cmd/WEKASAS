export type Listing = {
  slug: string;
  status: "Disponível" | "Reservado";
  title: string;
  city: "Lisboa" | "Madrid";
  neighbourhood: string;
  typology: "T1" | "T2" | "T3";
  rentMonthly: number;
  areaM2: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  description: string;
  images: string[];
};

const baseImages = [
  "/assets/listing-placeholder.png",
  "/assets/listing-placeholder.png",
  "/assets/listing-placeholder.png",
];

export const listings: Listing[] = [
  {
    slug: "t1-lisboa-principe-real",
    status: "Disponível",
    title: "T1 moderno com luz natural",
    city: "Lisboa",
    neighbourhood: "Príncipe Real",
    typology: "T1",
    rentMonthly: 1250,
    areaM2: 58,
    bedrooms: 1,
    bathrooms: 1,
    features: ["Mobilado", "Cozinha equipada", "Elevador"],
    description:
      "Apartamento T1 renovado, com boa exposição solar e acabamentos modernos. Ideal para quem quer viver no centro, com tudo à porta.",
    images: baseImages,
  },
  {
    slug: "t2-lisboa-parque-das-nacoes",
    status: "Disponível",
    title: "T2 com varanda e garagem",
    city: "Lisboa",
    neighbourhood: "Parque das Nações",
    typology: "T2",
    rentMonthly: 1750,
    areaM2: 92,
    bedrooms: 2,
    bathrooms: 2,
    features: ["Varanda", "Garagem", "Ar condicionado"],
    description:
      "T2 confortável, com varanda e lugar de garagem. Zona moderna, tranquila e bem servida de transportes.",
    images: baseImages,
  },
  {
    slug: "t3-lisboa-alvalade",
    status: "Disponível",
    title: "T3 familiar em bairro clássico",
    city: "Lisboa",
    neighbourhood: "Alvalade",
    typology: "T3",
    rentMonthly: 2200,
    areaM2: 118,
    bedrooms: 3,
    bathrooms: 2,
    features: ["Despensa", "Janelas duplas", "Boa exposição solar"],
    description:
      "T3 espaçoso, excelente para família. Rua calma, comércio local e boas escolas nas proximidades.",
    images: baseImages,
  },
  {
    slug: "t1-madrid-malasana",
    status: "Disponível",
    title: "T1 compacto no coração de Malasaña",
    city: "Madrid",
    neighbourhood: "Malasaña",
    typology: "T1",
    rentMonthly: 1150,
    areaM2: 48,
    bedrooms: 1,
    bathrooms: 1,
    features: ["Renovado", "Cozinha equipada", "Metro perto"],
    description:
      "T1 renovado, perfeito para estilo de vida urbano. A poucos minutos a pé de transportes, cafés e cultura.",
    images: baseImages,
  },
  {
    slug: "t2-madrid-salamanca",
    status: "Disponível",
    title: "T2 elegante em Salamanca",
    city: "Madrid",
    neighbourhood: "Salamanca",
    typology: "T2",
    rentMonthly: 1650,
    areaM2: 88,
    bedrooms: 2,
    bathrooms: 2,
    features: ["Elevador", "Aquecimento central", "Acabamentos premium"],
    description:
      "T2 com acabamentos premium, ideal para quem valoriza conforto e localização. Prédio com elevador.",
    images: baseImages,
  },
  {
    slug: "t3-madrid-chamberi",
    status: "Disponível",
    title: "T3 amplo e luminoso em Chamberí",
    city: "Madrid",
    neighbourhood: "Chamberí",
    typology: "T3",
    rentMonthly: 2100,
    areaM2: 120,
    bedrooms: 3,
    bathrooms: 2,
    features: ["Sala ampla", "Cozinha equipada", "Ar condicionado"],
    description:
      "T3 amplo, com sala grande e muita luz natural. Excelente para famílias ou partilha com conforto.",
    images: baseImages,
  },
];
