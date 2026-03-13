import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

function getWhatsAppNumber() {
  const raw =
    (import.meta as any).env?.NEXT_PUBLIC_WHATSAPP ||
    (import.meta as any).env?.VITE_WHATSAPP ||
    "351910000000";
  return String(raw).replace(/\D/g, "");
}

export default function Contacto() {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "Lisboa",
    typology: "T2",
    expectedRent: "",
    message: "",
  });

  const wa = getWhatsAppNumber();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          expectedRent: Number(form.expectedRent),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Não foi possível enviar. Tenta novamente.");
        return;
      }

      setDone(true);
      toast.success("Pedido enviado. Vamos contactar em menos de 24 horas.");
    } catch {
      toast.error("Não foi possível enviar. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Contacto — WEKASAS"
        description="Pede uma avaliação gratuita em 24 horas. Sem compromisso."
        path="/contacto"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="grid overflow-hidden rounded-2xl border border-zinc-200 lg:grid-cols-12">
            {/* LEFT */}
            <div className="relative bg-[color:var(--color-charcoal)] p-8 text-white lg:col-span-5">
              <div className="pointer-events-none absolute -right-24 -top-10 opacity-[0.08]">
                <img
                  src="/assets/wekasas-logo-final.png"
                  alt=""
                  className="h-64 w-auto object-contain mix-blend-screen"
                />
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                Vamos falar sobre o seu imóvel.
              </h1>
              <p className="mt-3 text-sm text-white/90 sm:text-base">
                Avaliação gratuita em 24 horas. Sem compromisso.
              </p>

              <div className="mt-7 space-y-4 text-sm font-medium text-white">
                {[
                  "Resposta em 24h",
                  "Sem custos",
                  "Cobre PT e ES",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[color:var(--color-orange)] ring-1 ring-white/20">
                      ✓
                    </span>
                    <span className="text-white">{t}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#1fb65a]"
              >
                Falar no WhatsApp
              </a>

              <p className="mt-8 text-xs text-white/60">
                Ao submeter, concordas em ser contactado pela WEKASAS.
              </p>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-8 lg:col-span-7">
              <Card className="wk-card border-0 shadow-none">
                <div className="p-0">
                  {!done ? (
                    <form onSubmit={onSubmit} className="grid gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-zinc-700">Nome completo</Label>
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
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
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
                          <Label className="text-zinc-700">Renda esperada</Label>
                          <div className="relative">
                            <Input
                              required
                              inputMode="numeric"
                              type="number"
                              min={0}
                              className="h-11 rounded-xl pr-12"
                              value={form.expectedRent}
                              onChange={(e) =>
                                setForm((s) => ({
                                  ...s,
                                  expectedRent: e.target.value,
                                }))
                              }
                            />
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500">
                              €
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-zinc-700">Cidade</Label>
                          <Select
                            value={form.city}
                            onValueChange={(v) =>
                              setForm((s) => ({ ...s, city: v }))
                            }
                          >
                            <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Cidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Lisboa",
                                "Porto",
                                "Madrid",
                                "Barcelona",
                              ].map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-700">Tipologia</Label>
                          <Select
                            value={form.typology}
                            onValueChange={(v) =>
                              setForm((s) => ({ ...s, typology: v }))
                            }
                          >
                            <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Tipologia" />
                            </SelectTrigger>
                            <SelectContent>
                              {["T0", "T1", "T2", "T3", "T4"].map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
                        className="h-12 px-6 text-base"
                      >
                        {loading ? "A enviar..." : "Pedir avaliação gratuita"}
                      </WekaButton>
                    </form>
                  ) : (
                    <div className="rounded-2xl bg-[color:var(--color-orange-light)] p-6">
                      <p className="text-sm font-semibold text-[color:var(--color-orange)]">
                        Enviado
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900">
                        Vamos contactar em menos de 24 horas.
                      </p>
                      <p className="mt-3 text-sm text-zinc-600">
                        Se preferires, podes também falar connosco diretamente via
                        WhatsApp.
                      </p>
                      <a
                        href={`https://wa.me/${wa}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1fb65a]"
                      >
                        Falar no WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}