import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const manifesto = `Ter um imóvel para arrendar devia ser simples. Não é.
Há o inquilino que atrasa. O que danifica. O que desaparece.
Há a burocracia, os contratos, as vistorias, as chamadas que ninguém atende.
E no final do mês, a incerteza.
Criámos a WEKASAS para acabar com isso.
Tratamos do seu imóvel como se fosse nosso.
Encontramos o inquilino certo. Gerimos tudo.
E garantimos a sua renda — todos os meses, sem excepções.`;

export default function Sobre() {
  return (
    <>
      <PageMeta
        title="Sobre — WEKASAS"
        description="Criámos a WEKASAS para acabar com a incerteza no arrendamento. Gestão completa e renda garantida em PT + ES."
        path="/sobre"
      />

      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
            Criámos a WEKASAS para acabar com a incerteza.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Gestão de arrendamento com foco em previsibilidade, simplicidade e
            segurança.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                Manifesto
              </h2>
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
                <p className="whitespace-pre-line text-base font-normal leading-relaxed text-zinc-600 sm:text-lg">
                  {manifesto}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="wk-card p-6 sm:p-8">
                <p className="text-xs font-bold text-[color:var(--color-orange)]">
                  MISSÃO
                </p>
                <p className="mt-3 text-xl font-bold text-zinc-900">
                  Tornar o arrendamento simples, seguro e justo — para
                  proprietários e inquilinos.
                </p>

                <div className="mt-6 rounded-xl border border-zinc-200 p-4">
                  <p className="text-sm font-semibold text-zinc-900">Presença</p>
                  <div className="mt-4 grid gap-2">
                    {[
                      { country: "Portugal", note: "Sede em Paço de Arcos" },
                      { country: "Espanha", note: "Operação local" },
                    ].map((c) => (
                      <div
                        key={c.country}
                        className="flex items-center justify-between rounded-xl bg-white px-4 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[color:var(--color-orange)]" />
                          <span className="text-sm font-semibold text-zinc-900">
                            {c.country}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-zinc-600">
                          {c.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <WekaButton asChild className="h-11 w-full">
                    <Link to="/contacto">Falar connosco</Link>
                  </WekaButton>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              Queres arrendar com tranquilidade?
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">Pedir avaliação</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}