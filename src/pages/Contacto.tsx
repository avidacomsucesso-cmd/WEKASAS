import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationSelect } from "@/components/LocationSelect";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

function getWhatsAppNumber() {
  const raw =
    (import.meta as any).env?.NEXT_PUBLIC_WHATSAPP ||
    (import.meta as any).env?.VITE_WHATSAPP ||
    "351928202241";
  return String(raw).replace(/\D/g, "");
}

export default function Contacto() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    country: "Portugal",
    region: "Lisboa",
    address: "",
    typology: "T2",
    expectedRent: "",
    message: "",
  });

  const wa = getWhatsAppNumber();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Falha ao enviar.");

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18071544613/LH9ECIK30KccEKXGl6lD',
          'value': 1.0,
          'currency': 'EUR'
        });
      }

      setDone(true);
      toast.success(t('contact_page.success_title'));
    } catch (error) {
      console.error("Submission error:", error);
      
      // Fallback a mailto apenas se a API falhar
      const subject = encodeURIComponent(`Novo pedido de avaliação — ${form.name}`);
      const body = encodeURIComponent(
        `Nome: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Telefone: ${form.phone}\n` +
        `País: ${form.country}\n` +
        `Região: ${form.region}\n` +
        `Morada: ${form.address}\n` +
        `Tipologia: ${form.typology}\n` +
        `Renda esperada: ${form.expectedRent}€\n` +
        `Mensagem: ${form.message}`
      );

      window.location.href = `mailto:contacto@wekasas.com?subject=${subject}&body=${body}`;
      setDone(true);
      toast.info("Abrimos o teu cliente de email para completar o envio.");
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
          {/* ONBOARDING BANNER */}
          <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[color:var(--color-orange-light)] p-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-zinc-900">{t('contact_page.onboarding_title')}</h3>
              <p className="text-sm text-zinc-600">{t('contact_page.onboarding_sub')}</p>
            </div>
            <WekaButton asChild className="h-11">
              <Link to="/submeter-imovel">
                {t('contact_page.onboarding_btn')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </WekaButton>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-zinc-200 lg:grid-cols-12">
            {/* LEFT */}
            <div className="relative bg-[color:var(--color-charcoal)] p-8 text-white lg:col-span-5">
              <div className="pointer-events-none absolute -right-24 -top-10 opacity-[0.08]">
                <img
                  src="/assets/wekasas-logo-official.png"
                  alt=""
                  className="h-64 w-auto object-contain mix-blend-screen"
                />
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                {t('contact_page.title')}
              </h1>
              <p className="mt-3 text-sm text-white/90 sm:text-base">
                {t('contact_page.sub')}
              </p>

              <div className="mt-7 space-y-4 text-sm font-medium text-white">
                {[
                  t('contact_page.v1'),
                  t('contact_page.v2'),
                  t('contact_page.v3'),
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
                href="https://wa.me/message/XPRMI6GLOCXKM1"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#1fb65a]"
              >
                {t('contact_page.wa_btn')}
              </a>

              <p className="mt-8 text-xs text-white/60">
                {t('contact_page.disclaimer')}
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
                          <Label className="text-zinc-700">{t('contact_page.form_name')}</Label>
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
                          <Label className="text-zinc-700">{t('contact_page.form_email')}</Label>
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
                          <Label className="text-zinc-700">{t('contact_page.form_phone')}</Label>
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
                          <Label className="text-zinc-700">{t('contact_page.form_rent')}</Label>
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

                      <LocationSelect 
                        country={form.country}
                        region={form.region}
                        onCountryChange={(v) => setForm(s => ({ ...s, country: v }))}
                        onRegionChange={(v) => setForm(s => ({ ...s, region: v }))}
                      />

                      <div className="space-y-2">
                        <Label className="text-zinc-700">{t('contact_page.form_address')}</Label>
                        <Input
                          value={form.address}
                          onChange={(e) => setForm(s => ({ ...s, address: e.target.value }))}
                          placeholder={t('contact_page.form_address_p')}
                          className="h-11 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-700">{t('contact_page.form_typology')}</Label>
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

                      <div className="space-y-2">
                        <Label className="text-zinc-700">{t('contact_page.form_message')}</Label>
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
                        {loading ? "..." : t('contact_page.form_btn')}
                      </WekaButton>
                    </form>
                  ) : (
                    <div className="rounded-2xl bg-[color:var(--color-orange-light)] p-6">
                      <p className="text-sm font-semibold text-[color:var(--color-orange)]">
                        {t('contact_page.form_btn')}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900">
                        {t('contact_page.success_title')}
                      </p>
                      <p className="mt-3 text-sm text-zinc-600">
                        {t('contact_page.success_sub')}
                      </p>
                      <a
                        href="https://wa.me/message/XPRMI6GLOCXKM1"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1fb65a]"
                      >
                        {t('contact_page.wa_btn')}
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