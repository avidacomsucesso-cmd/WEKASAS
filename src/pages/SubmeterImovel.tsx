import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LocationSelect } from "@/components/LocationSelect";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, 
  MessageSquare, Camera, Globe, 
  ShieldCheck, LayoutDashboard, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

type Step = 1 | 2 | 3 | 4;

export default function SubmeterImovel() {
  const { t } = useTranslation();
  const [step, setStep] = React.useState<Step>(1);
  const [loading, setLoading] = React.useState(false);

  const typologies = ["T0", "T1", "T2", "T3", "T4", "T5+"];
  const states = [t('onboarding_page.s2_cond_e'), t('onboarding_page.s2_cond_b'), t('onboarding_page.s2_cond_r')];
  const furnishedOptions = [t('onboarding_page.s2_furn'), t('onboarding_page.s2_cond_b'), t('onboarding_page.s2_cond_r')];

  const [form, setForm] = React.useState({
    // Step 1
    country: "Portugal",
    region: "Lisboa",
    address: "",
    postalCode: "",
    typology: "T2",
    area: "",
    floor: "",
    parking: "Não",
    // Step 2
    condition: "Bom",
    furnished: "Mobilado",
    availableFrom: "",
    expectedRent: "",
    service: "GESTÃO COMPLETA",
    // Step 3
    name: "",
    nif: "",
    phone: "",
    email: "",
    iban: "",
    fiscalAddress: "",
    terms: false,
    privacy: false,
    auth: false,
  });

  const onAddressSelect = (formattedAddress: string, components?: any) => {
    if (components) {
      setForm((s) => ({
        ...s,
        address: formattedAddress,
        country: components.countryCode === "PT" ? "Portugal" : components.countryCode === "ES" ? "Espanha" : s.country,
        region: components.region || s.region,
        postalCode: components.postalCode || s.postalCode,
      }));
    } else {
      setForm((s) => ({ ...s, address: formattedAddress }));
    }
  };

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const calculateEstimate = (rent: string) => {
    const val = parseFloat(rent) || 0;
    if (val === 0) return 0;
    // Simple mock logic based on RentCalculator
    return Math.round(val * 1.05);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/onboarding-proprietario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Falha ao submeter o formulário.");

      setStep(4);
      toast.success("Imóvel submetido com sucesso!");
    } catch (error) {
      console.error("Submission error:", error);
      
      // Fallback a mailto
      const subject = encodeURIComponent(`Novo imóvel submetido — ${form.typology} em ${form.region}`);
      const body = encodeURIComponent(
        `DADOS DO IMÓVEL:\n` +
        `País: ${form.country}\n` +
        `Região: ${form.region}\n` +
        `Morada: ${form.address}\n` +
        `Código Postal: ${form.postalCode}\n` +
        `Tipologia: ${form.typology}\n` +
        `Área: ${form.area}m²\n` +
        `Andar: ${form.floor}\n` +
        `Estacionamento: ${form.parking}\n\n` +
        `CARACTERÍSTICAS:\n` +
        `Estado: ${form.condition}\n` +
        `Mobilado: ${form.furnished}\n` +
        `Disponível: ${form.availableFrom}\n` +
        `Renda pretendida: ${form.expectedRent}€\n` +
        `Serviço: ${form.service}\n\n` +
        `DADOS DO PROPRIETÁRIO:\n` +
        `Nome: ${form.name}\n` +
        `NIF/NIE: ${form.nif}\n` +
        `Telefone: ${form.phone}\n` +
        `Email: ${form.email}\n` +
        `IBAN: ${form.iban}\n` +
        `Morada Fiscal: ${form.fiscalAddress}`
      );

      window.location.href = `mailto:contacto@wekasas.com?subject=${subject}&body=${body}`;
      setStep(4);
      toast.info("Abrimos o teu cliente de email para completar o envio.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <>
      <PageMeta
        title={`Submeter Imóvel — WEKASAS`}
        description={t('onboarding_page.s3_sub')}
        path="/submeter-imovel"
      />

      <section className="min-h-screen bg-zinc-50 pt-10 pb-20">
        <div className="wk-container max-w-2xl">
          {/* PROGRESS BAR */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              <span>{t('onboarding_page.step_of', { current: step })}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
              <div 
                className="h-full bg-[color:var(--color-orange)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card className="wk-card border-zinc-200 p-8 sm:p-10 shadow-xl bg-white">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-zinc-900">{t('onboarding_page.s1_title')}</h1>
                  <p className="text-sm text-zinc-500 mt-1">{t('onboarding_page.s1_sub')}</p>
                </div>

                <LocationSelect 
                  country={form.country}
                  region={form.region}
                  onCountryChange={(v) => setForm(s => ({ ...s, country: v }))}
                  onRegionChange={(v) => setForm(s => ({ ...s, region: v }))}
                />

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s1_address')}</Label>
                  <Input 
                    required
                    placeholder={t('onboarding_page.s1_address_p')}
                    value={form.address}
                    onChange={e => setForm(s => ({ ...s, address: e.target.value }))}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.postal_code')}</Label>
                    <Input 
                      placeholder="Ex: 2770-071"
                      value={form.postalCode}
                      onChange={e => setForm(s => ({ ...s, postalCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s1_area')}</Label>
                    <Input 
                      required
                      type="number"
                      placeholder="Ex: 85"
                      value={form.area}
                      onChange={e => setForm(s => ({ ...s, area: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s1_floor')}</Label>
                  <Input 
                    placeholder="Ex: 2º Esq"
                    value={form.floor}
                    onChange={e => setForm(s => ({ ...s, floor: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s1_parking')}</Label>
                  <div className="flex gap-2">
                    {[
                      { key: "Sim", label: t('onboarding_page.s1_parking_y') },
                      { key: "Não", label: t('onboarding_page.s1_parking_n') }
                    ].map(o => (
                      <button
                        key={o.key}
                        type="button"
                        onClick={() => setForm(s => ({ ...s, parking: o.key }))}
                        className={cn(
                          "flex-1 h-10 rounded-lg border text-sm font-bold transition-all",
                          form.parking === o.key 
                            ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <WekaButton 
                  onClick={nextStep} 
                  disabled={!form.address || !form.area}
                  className="w-full h-12 mt-4"
                >
                  {t('onboarding_page.s1_btn')} <ArrowRight className="ml-2 h-4 w-4" />
                </WekaButton>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-zinc-900">{t('onboarding_page.s2_title')}</h1>
                  <p className="text-sm text-zinc-500 mt-1">{t('onboarding_page.s2_sub')}</p>
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s2_cond')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "Excelente", label: t('onboarding_page.s2_cond_e') },
                      { key: "Bom", label: t('onboarding_page.s2_cond_b') },
                      { key: "A recuperar", label: t('onboarding_page.s2_cond_r') }
                    ].map(s => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, condition: s.key }))}
                        className={cn(
                          "h-10 rounded-lg border text-xs font-bold transition-all",
                          form.condition === s.key 
                            ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s2_furn')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "Mobilado", label: t('onboarding_page.s2_furn') },
                      { key: "Sem mobília", label: t('onboarding_page.s2_cond_b') },
                      { key: "Parcialmente", label: t('onboarding_page.s2_cond_r') }
                    ].map(o => (
                      <button
                        key={o.key}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, furnished: o.key }))}
                        className={cn(
                          "h-10 rounded-lg border text-[10px] font-bold transition-all uppercase px-1",
                          form.furnished === o.key 
                            ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s2_avail')}</Label>
                    <Input 
                      type="date"
                      value={form.availableFrom}
                      onChange={e => setForm(s => ({ ...s, availableFrom: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s2_rent')}</Label>
                    <Input 
                      type="number"
                      placeholder="Ex: 1200"
                      value={form.expectedRent}
                      onChange={e => setForm(s => ({ ...s, expectedRent: e.target.value }))}
                    />
                    {form.expectedRent && (
                      <p className="text-[10px] font-bold text-emerald-600">
                        {t('onboarding_page.s2_estimate', { value: calculateEstimate(form.expectedRent) })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>{t('onboarding_page.s2_service')}</Label>
                  <div className="grid gap-3">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, service: "GESTÃO COMPLETA" }))}
                      className={cn(
                        "relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                        form.service === "GESTÃO COMPLETA"
                          ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)]"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                      )}
                    >
                      <span className="text-xs font-black text-[color:var(--color-orange)] uppercase tracking-wider">{t('onboarding_page.s2_service1')}</span>
                      <span className="text-sm font-bold text-zinc-900 mt-1">{t('onboarding_page.s2_service1_d')}</span>
                      {form.service === "GESTÃO COMPLETA" && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-[color:var(--color-orange)]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, service: "SÓ INTERMEDIAÇÃO" }))}
                      className={cn(
                        "relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                        form.service === "SÓ INTERMEDIAÇÃO"
                          ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)]"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                      )}
                    >
                      <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">{t('onboarding_page.s2_service2')}</span>
                      <span className="text-sm font-bold text-zinc-900 mt-1">{t('onboarding_page.s2_service2_d')}</span>
                      {form.service === "SÓ INTERMEDIAÇÃO" && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-[color:var(--color-orange)]" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <WekaButton intent="secondary" onClick={prevStep} className="flex-1">
                    {t('onboarding_page.btn_prev')}
                  </WekaButton>
                  <WekaButton onClick={nextStep} disabled={!form.expectedRent} className="flex-[2]">
                    {t('onboarding_page.s1_btn')}
                  </WekaButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={onSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-zinc-900">{t('onboarding_page.s3_title')}</h1>
                  <p className="text-sm text-zinc-500 mt-1">{t('onboarding_page.s3_sub')}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s3_name')}</Label>
                    <Input 
                      required
                      value={form.name}
                      onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s3_nif')}</Label>
                    <Input 
                      required
                      value={form.nif}
                      onChange={e => setForm(s => ({ ...s, nif: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s3_phone')}</Label>
                    <div className="flex gap-2">
                      <div className="w-20 shrink-0">
                        <Input disabled value={form.country === "Portugal" ? "+351" : "+34"} className="bg-zinc-50" />
                      </div>
                      <Input 
                        required
                        value={form.phone}
                        onChange={e => setForm(s => ({ ...s, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('onboarding_page.s3_email')}</Label>
                    <Input 
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s3_iban')}</Label>
                  <Input 
                    value={form.iban}
                    onChange={e => setForm(s => ({ ...s, iban: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('onboarding_page.s3_fiscal')}</Label>
                  <Input 
                    value={form.fiscalAddress}
                    onChange={e => setForm(s => ({ ...s, fiscalAddress: e.target.value }))}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      required
                      checked={form.terms} 
                      onCheckedChange={(v) => setForm(s => ({ ...s, terms: !!v }))}
                    />
                    <Label htmlFor="terms" className="text-xs leading-none text-zinc-600 font-medium">
                      {t('onboarding_page.s3_terms')}
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="privacy" 
                      required
                      checked={form.privacy} 
                      onCheckedChange={(v) => setForm(s => ({ ...s, privacy: !!v }))}
                    />
                    <Label htmlFor="privacy" className="text-xs leading-none text-zinc-600 font-medium">
                      {t('onboarding_page.s3_privacy')}
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="auth" 
                      required
                      checked={form.auth} 
                      onCheckedChange={(v) => setForm(s => ({ ...s, auth: !!v }))}
                    />
                    <Label htmlFor="auth" className="text-xs leading-none text-zinc-600 font-medium">
                      {t('onboarding_page.s3_auth')}
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <WekaButton type="button" intent="secondary" onClick={prevStep} className="flex-1">
                    {t('onboarding_page.btn_prev')}
                  </WekaButton>
                  <WekaButton type="submit" disabled={loading} className="flex-[2]">
                    {loading ? t('onboarding_page.s3_loading') : t('onboarding_page.s3_btn')}
                  </WekaButton>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center animate-in zoom-in duration-500 py-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-zinc-900">{t('onboarding_page.s4_title')}</h1>
                <p className="mt-3 text-base text-zinc-600">
                  {t('onboarding_page.s4_sub')}
                </p>

                <div className="mt-12 grid gap-4">
                  {[
                    { t: t('onboarding_page.s4_step1'), d: t('onboarding_page.s4_step1_d'), i: LayoutDashboard },
                    { t: t('onboarding_page.s4_step2'), d: t('onboarding_page.s4_step2_d'), i: Camera },
                    { t: t('onboarding_page.s4_step3'), d: t('onboarding_page.s4_step3_d'), i: Globe },
                  ].map((s, idx) => {
                    const Icon = s.i;
                    return (
                      <div key={s.t} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--color-orange)] shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-zinc-900">{idx + 1}. {s.t}</p>
                          <p className="text-xs text-zinc-500">{s.d}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-col gap-3">
                  <WekaButton asChild className="h-12">
                    <Link to="/">{t('onboarding_page.s4_btn_home')}</Link>
                  </WekaButton>
                  <WekaButton asChild intent="secondary" className="h-12 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5">
                    <a href="https://wa.me/message/XPRMI6GLOCXKM1" target="_blank" rel="noopener noreferrer">
                      {t('onboarding_page.s4_btn_wa')}
                    </a>
                  </WekaButton>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}