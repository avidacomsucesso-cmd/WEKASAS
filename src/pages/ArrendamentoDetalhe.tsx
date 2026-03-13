import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { listings } from "@/data/listings";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Bath, Ruler } from "lucide-react";
import { toast } from "sonner";

function eur(n: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ArrendamentoDetalhe() {
  const { slug } = useParams();
  const listing = listings.find((l) => l.slug === slug);

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listing) return;

    setLoading(true);
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          listingTitle: `${listing.typology} — ${listing.neighbourhood}`,
          listingCity: listing.city,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Não foi possível enviar. Tenta novamente.");
        return;
      }

      setDone(true);
      toast.success("Pedido enviado. Vamos responder o mais rapidamente possível.");
    } catch {
      toast.error("Não foi possível enviar. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!listing) {
    return (
      <section className="bg-white">
        <PageMeta
          title="Imóvel não encontrado — WEKASAS"
          description="O imóvel que procuras não está disponível."
          path={`/arrendamentos/${slug ?? ""}`}
        />
        <div className="wk-container wk-section">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
            <p className="text-lg font-bold text-zinc-900">Imóvel não encontrado</p>
            <p className="mt-2 text-sm text-zinc-600">
              Volta à lista de arrendamentos para veres outras opções.
            </p>
            <div className="mt-6">
              <WekaButton asChild className="h-11">
                <Link to="/arrendamentos">Ver arrendamentos</Link>
              </WekaButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageMeta
        title={`${listing.typology} em ${listing.neighbourhood} — WEKASAS`}
        description={`${listing.title}. ${listing.neighbourhood}, ${listing.city}. Renda: ${eur(
          listing.rentMonthly
        )}/mês.`}
        path={`/arrendamentos/${listing.slug}`}
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="rounded-full bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)] hover:bg-[color:var(--color-orange-light)]">
                  {listing.status}
                </Badge>
                <span className="text-xs font-semibold text-zinc-500">{listing.typology}</span>
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
                {listing.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>
                  {listing.neighbourhood}, {listing.city}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-600">Renda</p>
              <p className="mt-1 text-3xl font-bold text-zinc-900">
                {eur(listing.rentMonthly)}
                <span className="text-sm font-semibold text-zinc-600">/mês</span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {listing.images.slice(0, 3).map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${listing.title} — foto ${idx + 1}`}
                    className={
                      idx === 0
                        ? "h-60 w-full rounded-2xl object-cover sm:col-span-2"
                        : "h-48 w-full rounded-2xl object-cover"
                    }
                    loading="lazy"
                  />
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="wk-card flex items-center gap-3 p-4">
                  <Home className="h-4 w-4 text-[color:var(--color-orange)]" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-600">Quartos</p>
                    <p className="text-sm font-bold text-zinc-900">
                      {listing.bedrooms}
                    </p>
                  </div>
                </div>
                <div className="wk-card flex items-center gap-3 p-4">
                  <Bath className="h-4 w-4 text-[color:var(--color-orange)]" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-600">WC</p>
                    <p className="text-sm font-bold text-zinc-900">
                      {listing.bathrooms}
                    </p>
                  </div>
                </div>
                <div className="wk-card flex items-center gap-3 p-4">
                  <Ruler className="h-4 w-4 text-[color:var(--color-orange)]" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-600">Área</p>
                    <p className="text-sm font-bold text-zinc-900">
                      {listing.areaM2} m²
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900">Descrição</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {listing.description}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900">Características</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {listing.features.map((f) => (
                    <span key={f} className="wk-pill">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900">Localização</h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">
                  <div className="flex h-56 items-center justify-center bg-zinc-100">
                    <p className="text-sm font-semibold text-zinc-600">
                      Mapa (placeholder)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="wk-card sticky top-20 p-6 sm:p-7">
                <p className="text-sm font-semibold text-zinc-900">
                  Formulário de interesse
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Diz-nos um pouco sobre ti. Respondemos o mais rapidamente
                  possível.
                </p>

                {!done ? (
                  <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-700">Nome</Label>
                      <Input
                        required
                        className="h-11 rounded-xl"
                        value={form.name}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-700">Email</Label>
                      <Input
                        required
                        type="email"
                        className="h-11 rounded-xl"
                        value={form.email}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-700">Telefone</Label>
                      <Input
                        required
                        className="h-11 rounded-xl"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, phone: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-700">Mensagem (opcional)</Label>
                      <Textarea
                        className="min-h-28 rounded-xl"
                        value={form.message}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, message: e.target.value }))
                        }
                      />
                    </div>

                    <WekaButton
                      type="submit"
                      disabled={loading}
                      className="h-11"
                    >
                      {loading ? "A enviar..." : "Quero este imóvel"}
                    </WekaButton>

                    <p className="text-xs text-zinc-500">
                      Ao submeter, concordas em ser contactado pela WEKASAS.
                    </p>
                  </form>
                ) : (
                  <div className="mt-6 rounded-2xl bg-[color:var(--color-orange-light)] p-6">
                    <p className="text-sm font-semibold text-[color:var(--color-orange)]">
                      Pedido enviado
                    </p>
                    <p className="mt-2 text-xl font-bold text-zinc-900">
                      Obrigado. Vamos responder o mais rapidamente possível.
                    </p>
                    <div className="mt-5">
                      <WekaButton asChild intent="secondary" className="h-11 w-full">
                        <Link to="/arrendamentos">Voltar à lista</Link>
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
