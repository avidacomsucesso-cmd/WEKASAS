import * as React from "react";
import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, UserPlus, Briefcase, MessageCircle } from "lucide-react";

export default function Parceiros() {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const programs = [
    {
      icon: Users,
      title: "Parceiros da Portaria",
      desc: "Porteiros e gestores de condomínio que conhecem os proprietários do prédio.",
    },
    {
      icon: UserPlus,
      title: "Indica WEKASAS",
      desc: "Partilha o teu link ou indica um amigo que quer arrendar o imóvel com segurança.",
    },
    {
      icon: Briefcase,
      title: "Corretor Parceiro",
      desc: "Trabalhas no setor imobiliário? Potencia a tua carteira com a nossa gestão.",
    },
  ];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio (seguindo o padrão das outras páginas)
    setTimeout(() => {
      setDone(true);
      setLoading(false);
      toast.success("Candidatura enviada. Vamos contactar em breve.");
    }, 1000);
  }

  const wa = "351910000000"; // Padrão usado anteriormente

  return (
    <>
      <PageMeta
        title="Parceiros — WEKASAS"
        description="Ganha dinheiro a indicar imóveis. Indica proprietários e recebe até €150 por imóvel arrendado."
        path="/parceiros"
      />

      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              Ganha dinheiro a indicar imóveis.
            </h1>
            <p className="mt-5 text-base text-white/75 sm:text-lg">
              Indica-nos proprietários. Nós tratamos de tudo. Tu recebes até{" "}
              <span className="font-bold text-[color:var(--color-orange)]">
                €150
              </span>{" "}
              por imóvel arrendado.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} className="wk-card p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-zinc-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {p.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                Torna-te parceiro.
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Preenche os teus dados e entra na rede de parceiros WEKASAS.
              </p>

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">
                  Preferes indicar directamente no WhatsApp?
                </p>
                <a
                  href={`https://wa.me/${wa}?text=Olá! Quero ser parceiro WEKASAS.`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1fb65a]"
                >
                  <MessageCircle className="h-4 w-4" /> Falar agora
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="wk-card p-6 sm:p-8">
                {!done ? (
                  <form onSubmit={onSubmit} className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome completo</Label>
                        <Input required className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input required type="email" className="h-11 rounded-xl" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input required className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Cidade</Label>
                        <Select required>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Escolhe a cidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lisboa">Lisboa</SelectItem>
                            <SelectItem value="porto">Porto</SelectItem>
                            <SelectItem value="madrid">Madrid</SelectItem>
                            <SelectItem value="barcelona">Barcelona</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de parceiro</Label>
                      <Select required>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Selecciona o perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portaria">Parceiros da Portaria</SelectItem>
                          <SelectItem value="indica">Indica WEKASAS</SelectItem>
                          <SelectItem value="corretor">Corretor Parceiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <WekaButton
                      type="submit"
                      disabled={loading}
                      className="h-12 text-base"
                    >
                      {loading ? "A processar..." : "Enviar cadastro"}
                    </WekaButton>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-orange-light)] text-[color:var(--color-orange)]">
                      <UserPlus className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-zinc-900">
                      Recebemos o teu cadastro!
                    </h3>
                    <p className="mt-3 text-zinc-600">
                      Obrigado pelo interesse. Vamos contactar-te nas próximas 48 horas para explicar os próximos passos.
                    </p>
                    <div className="mt-8">
                      <WekaButton asChild intent="secondary">
                        <a href="/">Voltar à homepage</a>
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
