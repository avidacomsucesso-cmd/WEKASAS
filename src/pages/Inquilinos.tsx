import * as React from "react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Building, Target, Shield, ArrowRight, Check, 
  Dog, Car, Sofa, Building2, School, Train, 
  Briefcase, BarChart, Globe, Lock, MessageCircle, Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const conceptCards = [
  {
    title: "Portfólio Exclusivo",
    description: "Imóveis selecionados e verificados pela WEKASAS.",
    icon: Building,
  },
  {
    title: "Matching Personalizado",
    description: "Encontramos opções alinhadas ao perfil de cada cliente.",
    icon: Target,
  },
  {
    title: "Processo Transparente",
    description: "Acompanhamento claro do primeiro contacto à assinatura.",
    icon: Shield,
  },
];

// --- TYPES ---

interface InquilinoForm {
  perfil: 'sozinho' | 'casal' | 'familia' | 'profissional' | '';
  cidade: 'lisboa' | 'porto' | 'madrid' | 'barcelona' | 'outra' | '';
  tipologia: string[];
  orcamentoMax: number;
  dataEntrada: 'urgente' | '1-3meses' | '3-6meses' | '';
  preferencias: string[];
  observacoes: string;
  situacaoLaboral: 'efetivo' | 'prazo' | 'independente' | 'outro' | '';
  rendimentoRange: string;
  temFiador: 'sim' | 'nao' | 'se-necessario' | '';
  documentacaoDisponivel: string[];
  nome: string;
  email: string;
  telefone: string;
  prefixo: '+351' | '+34';
  canalContacto: 'whatsapp' | 'email' | 'indiferente';
  aceitaPrivacidade: boolean;
  aceitaNewsletter: boolean;
}

const defaults: InquilinoForm = {
  perfil: '',
  cidade: '',
  tipologia: [],
  orcamentoMax: 1200,
  dataEntrada: '',
  preferencias: [],
  observacoes: '',
  situacaoLaboral: '',
  rendimentoRange: '',
  temFiador: '',
  documentacaoDisponivel: [],
  nome: '',
  email: '',
  telefone: '',
  prefixo: '+351',
  canalContacto: 'indiferente',
  aceitaPrivacidade: false,
  aceitaNewsletter: false,
};

// --- COMPONENT ---

export default function Inquilinos() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<InquilinoForm>(defaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleTipologia = (val: string) => {
    setFormData(prev => ({
      ...prev,
      tipologia: prev.tipologia.includes(val) 
        ? prev.tipologia.filter(t => t !== val) 
        : [...prev.tipologia, val]
    }));
  };

  const handleTogglePreferencia = (val: string) => {
    setFormData(prev => ({
      ...prev,
      preferencias: prev.preferencias.includes(val) 
        ? prev.preferencias.filter(p => p !== val) 
        : [...prev.preferencias, val]
    }));
  };

  const canProceed = (currentStep: number): boolean => {
    switch(currentStep) {
      case 1: return !!formData.perfil && !!formData.cidade && formData.tipologia.length > 0;
      case 2: return !!formData.dataEntrada;
      case 3: return !!formData.situacaoLaboral && !!formData.rendimentoRange;
      case 4: return !!formData.nome && !!formData.email && !!formData.telefone && formData.aceitaPrivacidade;
      default: return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed(4)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquilino-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Falha ao submeter");

      setIsSuccess(true);
      scrollToForm();
      toast.success("Perfil enviado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      // Fallback a mailto
      const body = `Nome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.prefixo}${formData.telefone}\nPerfil: ${formData.perfil}\nCidade: ${formData.cidade}\nTipologia: ${formData.tipologia.join(', ')}\nOrçamento: €${formData.orcamentoMax}\nEntrada: ${formData.dataEntrada}\nSituação: ${formData.situacaoLaboral}\nObservações: ${formData.observacoes}`;
      window.location.href = `mailto:contacto@wekasas.com?subject=Novo Perfil Inquilino: ${formData.nome}&body=${encodeURIComponent(body)}`;
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <>
      <PageMeta
        title="Para Inquilinos — Encontramos o seu próximo lar | WEKASAS"
        description="Diga-nos o que procura. A WEKASAS gere um portfólio exclusivo e off-market em Lisboa, Porto, Madrid e Barcelona."
        path="/arrendamentos"
      />

      {/* SECÇÃO 1 — HERO */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="wk-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-8 duration-700">
              <span className="inline-flex items-center rounded-full bg-[color:var(--color-orange-light)] px-4 py-1.5 text-xs font-bold text-[color:var(--color-orange)] uppercase tracking-wider">
                IMÓVEIS EXCLUSIVOS · OFF-MARKET
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                O seu próximo lar <br />
                <span className="text-[color:var(--color-orange)]">já existe.</span> <br />
                <span className="text-zinc-400">Ainda não está para todos.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-zinc-600 leading-relaxed">
                A WEKASAS gere um portfólio exclusivo de imóveis rigorosamente seleccionados em Lisboa, Porto, Madrid e Barcelona. Não publicamos tudo — reservamos os melhores para quem conhecemos primeiro.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <WekaButton onClick={scrollToForm} size="lg" className="h-14 px-8 text-base font-bold shadow-xl shadow-orange-500/20">
                  Submeter o meu perfil <ArrowRight className="ml-2 h-5 w-5" />
                </WekaButton>
                <p className="text-xs font-medium text-zinc-400">
                  Resposta garantida em 24 horas. <br className="hidden sm:block" /> Sem compromisso.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {["🏠 Imóveis exclusivos", "⚡ Resposta em 24h", "🔒 100% Confidencial"].map(badge => (
                  <span key={badge} className="rounded-full bg-zinc-50 px-4 py-2 text-xs font-bold text-zinc-500 border border-zinc-100">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              {/* Mobile: apenas imagem família em banner */}
              <div className="lg:hidden w-full h-[240px] rounded-2xl overflow-hidden shadow-lg mb-8">
                <img 
                  src="/images/inquilinos/familia_1.png"
                  alt="Família a encontrar o seu novo lar WEKASAS"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Desktop Collage */}
              <div className="relative w-full h-[560px] hidden lg:block group/collage">
                {/* Card 1 — Jovem Profissional */}
                <div className="absolute top-0 left-0 w-[58%] h-[320px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03] z-10">
                  <img
                    src="/images/inquilinos/jovem.png"
                    alt="Jovem profissional à procura de imóvel"
                    className="w-full h-full object-contain bg-zinc-50"
                  />
                </div>

                {/* Card 2 — Casal */}
                <div className="absolute top-[40px] right-0 w-[40%] h-[260px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03] z-20">
                  <img 
                    src="/images/inquilinos/casal_1.jpg" 
                    alt="Casal à procura do lar ideal" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Card 3 — Família */}
                <div className="absolute bottom-0 left-[8%] w-[84%] h-[220px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03] z-0">
                  <img 
                    src="/images/inquilinos/familia_1.png" 
                    alt="Família a encontrar o seu novo lar" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Overlay decorativo sutil */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent rounded-b-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 2 — CONCEITO */}
      <section className="bg-zinc-50 py-24">
        <div className="wk-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--color-orange)]">COMO FUNCIONA</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Não é uma vitrine. É um serviço.</h2>
            <p className="mt-4 text-zinc-600">Enquanto os outros portais mostram imóveis para todos, a WEKASAS encontra o imóvel certo para si.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {conceptCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 cursor-default"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3EE] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={32} color="#FA621C" strokeWidth={2} />
                </div>

                <h3 className="text-xl font-semibold text-neutral-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO 3 — WIZARD DE FORMULÁRIO */}
      <section ref={formRef} id="submeter-perfil" className="bg-white py-24 scroll-mt-24">
        <div className="wk-container">
          <div className="max-w-2xl mx-auto">
            {!isSuccess ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-12">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
                    <span>Passo {step} de 4</span>
                    <span className="text-[color:var(--color-orange)]">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div 
                      className="h-full bg-[color:var(--color-orange)] transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Card className="p-8 sm:p-12 border-zinc-200 shadow-2xl rounded-[32px]">
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-900">Conte-nos sobre si</h3>
                        <p className="text-sm text-zinc-500 mt-1">Quem vai habitar o imóvel?</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'sozinho', icon: "🧑", label: "Sozinho(a)", sub: "Profissional individual" },
                          { id: 'casal', icon: "👫", label: "Casal", sub: "Dois adultos" },
                          { id: 'familia', icon: "👨‍👩‍👧", label: "Família", sub: "Com crianças" },
                          { id: 'profissional', icon: "🏢", label: "Profissional", sub: "Relocation" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setFormData(s => ({ ...s, perfil: opt.id as any }))}
                            className={cn(
                              "flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all group",
                              formData.perfil === opt.id 
                                ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] shadow-lg shadow-orange-500/10" 
                                : "border-zinc-100 hover:border-zinc-200 bg-white"
                            )}
                          >
                            <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{opt.icon}</span>
                            <span className="text-sm font-bold text-zinc-900">{opt.label}</span>
                            <span className="text-[10px] text-zinc-500 mt-1 font-medium">{opt.sub}</span>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Cidade pretendida</Label>
                        <div className="flex flex-wrap gap-2">
                          {['Lisboa', 'Porto', 'Madrid', 'Barcelona', 'Outra'].map(c => (
                            <button
                              key={c}
                              onClick={() => setFormData(s => ({ ...s, cidade: c.toLowerCase() as any }))}
                              className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold border transition-all",
                                formData.cidade === c.toLowerCase()
                                  ? "bg-[color:var(--color-orange)] text-white border-[color:var(--color-orange)] shadow-lg shadow-orange-500/20"
                                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Tipologia (escolha uma ou mais)</Label>
                        <div className="flex flex-wrap gap-2">
                          {['T0', 'T1', 'T2', 'T3', 'T4+'].map(t => (
                            <button
                              key={t}
                              onClick={() => handleToggleTipologia(t)}
                              className={cn(
                                "h-11 w-14 rounded-xl text-sm font-black border transition-all",
                                formData.tipologia.includes(t)
                                  ? "bg-[color:var(--color-charcoal)] text-white border-[color:var(--color-charcoal)] shadow-lg"
                                  : "bg-zinc-50 text-zinc-500 border-transparent hover:bg-zinc-100"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <WekaButton 
                        disabled={!canProceed(1)} 
                        onClick={() => setStep(2)} 
                        className="w-full h-14 text-base font-bold"
                      >
                        Continuar <ArrowRight className="ml-2 h-5 w-5" />
                      </WekaButton>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-900">O imóvel ideal</h3>
                        <p className="text-sm text-zinc-500 mt-1">Ajude-nos a perceber o que procura</p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Orçamento máximo</Label>
                          <span className="text-xl font-black text-zinc-900">€ {formData.orcamentoMax.toLocaleString()} / mês</span>
                        </div>
                        <input 
                          type="range" 
                          min="400" 
                          max="5000" 
                          step="100"
                          value={formData.orcamentoMax}
                          onChange={(e) => setFormData(s => ({ ...s, orcamentoMax: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[color:var(--color-orange)]"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                          <span>Económico</span>
                          <span>Confortável</span>
                          <span>Premium</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Data de entrada</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'urgente', label: "Urgente", sub: "< 30 dias" },
                            { id: '1-3meses', label: "1–3 meses", sub: "" },
                            { id: '3-6meses', label: "3–6 meses", sub: "" },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setFormData(s => ({ ...s, dataEntrada: opt.id as any }))}
                              className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all",
                                formData.dataEntrada === opt.id 
                                  ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]" 
                                  : "border-zinc-100 bg-zinc-50 hover:border-zinc-200 text-zinc-600"
                              )}
                            >
                              <span className="text-xs font-bold">{opt.label}</span>
                              {opt.sub && <span className="text-[9px] mt-1 opacity-70">{opt.sub}</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Preferências especiais</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'animais', icon: Dog, label: "Animais" },
                            { id: 'garagem', icon: Car, label: "Garagem" },
                            { id: 'mobilado', icon: Sofa, label: "Mobilado" },
                            { id: 'alto', icon: Building2, label: "Andar alto" },
                            { id: 'escola', icon: School, label: "Escolas" },
                            { id: 'metro', icon: Train, label: "Metro/Bus" },
                          ].map((pref) => (
                            <button
                              key={pref.id}
                              onClick={() => handleTogglePreferencia(pref.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                                formData.preferencias.includes(pref.id)
                                  ? "bg-[color:var(--color-charcoal)] text-white border-transparent"
                                  : "bg-white text-zinc-600 border-zinc-200"
                              )}
                            >
                              <pref.icon className="h-4 w-4 shrink-0" />
                              <span className="text-xs font-bold">{pref.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Observações livres</Label>
                          <span className="text-[10px] text-zinc-400">{formData.observacoes.length}/300</span>
                        </div>
                        <Textarea 
                          placeholder="Exemplo: Precisamos de um jardim, preferimos o centro de Lisboa, aceitamos imóvel para renovar..."
                          maxLength={300}
                          value={formData.observacoes}
                          onChange={(e) => setFormData(s => ({ ...s, observacoes: e.target.value }))}
                          className="min-h-[100px] rounded-2xl border-zinc-200 focus:ring-[color:var(--color-orange-light)]"
                        />
                      </div>

                      <div className="flex gap-3">
                        <WekaButton intent="secondary" onClick={() => setStep(1)} className="flex-1">Anterior</WekaButton>
                        <WekaButton disabled={!canProceed(2)} onClick={() => setStep(3)} className="flex-[2] h-14 font-bold">Continuar</WekaButton>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-900">Qualificação prévia</h3>
                        <p className="text-sm text-zinc-500 mt-1">Informação confidencial — apenas para encontrar o imóvel certo.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[color:var(--color-orange-light)] border border-orange-200 flex gap-3">
                        <Lock className="h-5 w-5 text-[color:var(--color-orange)] shrink-0" />
                        <p className="text-[11px] text-orange-900 leading-relaxed font-medium">
                          Esta informação é confidencial e serve apenas para garantir que apresentamos imóveis adequados ao seu perfil. Não é necessário enviar documentos nesta fase.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Situação laboral</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'efetivo', icon: Briefcase, label: "Efectivo" },
                            { id: 'prazo', icon: Globe, label: "A prazo" },
                            { id: 'independente', icon: BarChart, label: "Independente" },
                            { id: 'outro', icon: Users, label: "Outro" },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setFormData(s => ({ ...s, situacaoLaboral: opt.id as any }))}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                                formData.situacaoLaboral === opt.id 
                                  ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-zinc-900" 
                                  : "border-zinc-100 bg-zinc-50 hover:border-zinc-200 text-zinc-600"
                              )}
                            >
                              <opt.icon className="h-4 w-4 text-[color:var(--color-orange)]" />
                              <span className="text-xs font-bold">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Rendimento mensal líquido</Label>
                        <div className="flex flex-wrap gap-2">
                          {['< €1.000', '€1.000–€1.500', '€1.500–€2.500', '€2.500–€4.000', '€4.000+'].map(r => (
                            <button
                              key={r}
                              onClick={() => setFormData(s => ({ ...s, rendimentoRange: r }))}
                              className={cn(
                                "px-4 py-2.5 rounded-xl text-[11px] font-bold border transition-all",
                                formData.rendimentoRange === r
                                  ? "bg-[color:var(--color-charcoal)] text-white border-transparent"
                                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                              )}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Tem fiador disponível?</Label>
                        <div className="flex gap-2">
                          {['Sim', 'Não', 'Se necessário'].map(o => (
                            <button
                              key={o}
                              onClick={() => setFormData(s => ({ ...s, temFiador: o.toLowerCase().replace(' ', '-') as any }))}
                              className={cn(
                                "flex-1 py-3 rounded-xl border-2 text-xs font-bold transition-all",
                                formData.temFiador === o.toLowerCase().replace(' ', '-')
                                  ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]"
                                  : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                              )}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <WekaButton intent="secondary" onClick={() => setStep(2)} className="flex-1">Anterior</WekaButton>
                        <WekaButton disabled={!canProceed(3)} onClick={() => setStep(4)} className="flex-[2] h-14 font-bold">Continuar</WekaButton>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-900">Quase lá!</h3>
                        <p className="text-sm text-zinc-500 mt-1">Como podemos contactá-lo(a)?</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-zinc-700">Nome completo</Label>
                          <Input 
                            required 
                            className="h-12 rounded-xl"
                            value={formData.nome}
                            onChange={e => setFormData(s => ({ ...s, nome: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-zinc-700">Email</Label>
                          <Input 
                            required 
                            type="email" 
                            className="h-12 rounded-xl"
                            value={formData.email}
                            onChange={e => setFormData(s => ({ ...s, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-zinc-700">Telefone / WhatsApp</Label>
                          <div className="flex gap-2">
                            <select 
                              className="w-24 h-12 rounded-xl border border-zinc-200 px-2 text-sm font-bold"
                              value={formData.prefixo}
                              onChange={e => setFormData(s => ({ ...s, prefixo: e.target.value as any }))}
                            >
                              <option value="+351">🇵🇹 +351</option>
                              <option value="+34">🇪🇸 +34</option>
                            </select>
                            <Input 
                              required 
                              className="flex-1 h-12 rounded-xl"
                              value={formData.telefone}
                              onChange={e => setFormData(s => ({ ...s, telefone: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Canal preferido</Label>
                        <div className="flex gap-2">
                          {['WhatsApp', 'Email', 'Indiferente'].map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setFormData(s => ({ ...s, canalContacto: c.toLowerCase() as any }))}
                              className={cn(
                                "flex-1 py-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all",
                                formData.canalContacto === c.toLowerCase()
                                  ? "border-[color:var(--color-orange)] bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]"
                                  : "border-zinc-100 bg-zinc-50 hover:border-zinc-200 text-zinc-500"
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            id="privacidade" 
                            required 
                            checked={formData.aceitaPrivacidade}
                            onCheckedChange={v => setFormData(s => ({ ...s, aceitaPrivacidade: !!v }))}
                          />
                          <Label htmlFor="privacidade" className="text-xs leading-tight text-zinc-500 font-medium">
                            Autorizo a WEKASAS a contactar-me com base na minha pesquisa. Concordo com a Política de Privacidade.
                          </Label>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            id="newsletter" 
                            checked={formData.aceitaNewsletter}
                            onCheckedChange={v => setFormData(s => ({ ...s, aceitaNewsletter: !!v }))}
                          />
                          <Label htmlFor="newsletter" className="text-xs leading-tight text-zinc-500 font-medium">
                            Quero receber novidades sobre novos imóveis WEKASAS.
                          </Label>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <WekaButton 
                          type="submit" 
                          disabled={isSubmitting || !canProceed(4)} 
                          className="w-full h-14 text-base font-bold shadow-xl shadow-orange-500/20"
                        >
                          {isSubmitting ? "A processar..." : "Enviar o meu perfil →"}
                        </WekaButton>
                        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          Resposta garantida em 24 horas.
                        </p>
                      </div>
                    </form>
                  )}
                </Card>
              </div>
            ) : (
              <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mb-8">
                  <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-zinc-900">Perfil recebido! 🎉</h3>
                <p className="mt-4 text-zinc-600 max-w-sm mx-auto leading-relaxed">
                  A nossa equipa vai analisar o seu perfil e contactá-lo(a) em até 24 horas com opções exclusivas seleccionadas para si.
                </p>

                <Card className="mt-12 p-8 bg-[color:var(--color-orange-light)] border-0 rounded-[24px] text-left">
                  <p className="text-[10px] font-black text-[color:var(--color-orange)] uppercase tracking-widest mb-4">Resumo das preferências:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
                      Perfil: <span className="capitalize text-[color:var(--color-orange)]">{formData.perfil}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
                      Cidade: <span className="capitalize text-[color:var(--color-orange)]">{formData.cidade}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
                      Tipologia: <span className="text-[color:var(--color-orange)]">{formData.tipologia.join(', ')}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-zinc-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
                      Orçamento: <span className="text-[color:var(--color-orange)]">€{formData.orcamentoMax}/mês</span>
                    </li>
                  </ul>
                </Card>

                <div className="mt-10">
                  <WekaButton asChild intent="secondary" className="border-zinc-200 text-zinc-900 h-12">
                    <a href="/">Conheça melhor a WEKASAS →</a>
                  </WekaButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECÇÃO 4 — TRUST SIGNALS */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image com Vista Aérea */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
          style={{ 
            backgroundImage: "url('/images/inquilinos/vista_aerea.jpg')",
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Dark overlay — garante legibilidade total do texto */}
        <div className="absolute inset-0 bg-[#1C1C1E]/85" />
        
        <div className="wk-container relative z-10">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 lg:divide-x lg:divide-white/10">
            {[
              { val: "18 dias", label: "Prazo médio de arrendamento" },
              { val: "100%", label: "Digital — do contrato à chave" },
              { val: "4 cidades", label: "Lisboa · Porto · Madrid · Barcelona" },
              { val: "Seguro incluído", label: "Renda garantida até 12 meses" },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <p className="text-3xl font-black text-[color:var(--color-orange)] sm:text-4xl">{stat.val}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO 5 — FOOTER CTA */}
      <section className="bg-zinc-50 py-24">
        <div className="wk-container text-center">
          <div className="mx-auto h-12 w-auto mb-10 opacity-20 grayscale">
            <img src="/assets/wekasas-logo-official.png" alt="WEKASAS" className="h-full mx-auto mix-blend-multiply" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">Não encontra o que procura nos portais?</h2>
          <p className="mt-4 text-zinc-600 max-w-xl mx-auto">Fale directamente connosco. Temos imóveis exclusivos que não aparecem em lado nenhum.</p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <WekaButton onClick={scrollToForm} size="lg" className="h-14 px-10 font-bold">Submeter o meu perfil</WekaButton>
            <WekaButton asChild intent="secondary" size="lg" className="h-14 px-10 font-bold bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-100">
              <a href="https://wa.me/message/XPRMI6GLOCXKM1" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#25D366]" /> Falar pelo WhatsApp
              </a>
            </WekaButton>
          </div>

          <div className="mt-12 text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
            contacto@wekasas.com · +351 928 202 241 · wekasas.com
          </div>
        </div>
      </section>
    </>
  );
}