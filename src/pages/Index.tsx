import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { RentCalculator } from "@/components/home/RentCalculator";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ShieldCheck, KeyRound, Smartphone, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();

  const promises = [
    {
      n: "01",
      title: t('promises.p1_title'),
      desc: t('promises.p1_desc'),
      icon: ShieldCheck,
    },
    {
      n: "02",
      title: t('promises.p2_title'),
      desc: t('promises.p2_desc'),
      icon: KeyRound,
    },
    {
      n: "03",
      title: t('promises.p3_title'),
      desc: t('promises.p3_desc'),
      icon: Smartphone,
    },
    {
      n: "04",
      title: t('promises.p4_title'),
      desc: t('promises.p4_desc'),
      icon: UserCheck,
    },
  ];

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1'),
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
    },
    {
      q: t('faq.q5'),
      a: t('faq.a5'),
    },
  ];

  return (
    <>
      <PageMeta
        title={`WEKASAS — ${t('footer.platform')}`}
        description={t('hero.sub')}
        path="/"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--color-charcoal)]">
        <div className="pointer-events-none absolute right-[-280px] top-[-100px] hidden opacity-[0.06] sm:block">
          <img
            src="/assets/wekasas-logo-official.png"
            alt=""
            className="h-[1000px] w-auto object-contain mix-blend-screen"
          />
        </div>

        <div className="wk-container wk-section pt-12 sm:pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                <span className="block">{t('hero.line1')}</span>
                <span className="block text-[color:var(--color-orange)]">
                  {t('hero.line2')}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {t('hero.sub')}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WekaButton asChild size="lg" className="h-12 px-6 text-base">
                  <Link to="/contacto">{t('hero.cta_primary')}</Link>
                </WekaButton>

                <Link
                  to="/como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {t('hero.cta_secondary')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="wk-pill">{t('hero.pill1')}</span>
                <span className="wk-pill">{t('hero.pill2')}</span>
                <span className="wk-pill">{t('hero.pill3')}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white">
        <div className="wk-container py-6">
          <div className="grid gap-6 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <p className="text-sm font-bold text-zinc-900 sm:text-base">{t('social_proof.s1_title')}</p>
              <p className="text-xs text-zinc-500 font-medium">{t('social_proof.s1_sub')}</p>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-4 mb-0.5">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-zinc-400">PT</span>
                    <span className="text-sm font-bold text-zinc-900 sm:text-base">Portugal</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium leading-none">{t('social_proof.s2_sub')}</p>
                </div>
                <span className="text-zinc-200 self-center">|</span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-zinc-400">ES</span>
                    <span className="text-sm font-bold text-zinc-900 sm:text-base">Espanha</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium leading-none">{t('social_proof.s2_sub')}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 sm:text-base">{t('social_proof.s3_title')}</p>
              <p className="text-xs text-zinc-500 font-medium">{t('social_proof.s3_sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 PROMESSAS */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              {t('promises.title')}
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              {t('promises.sub')}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {promises.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.n}
                  className="wk-card relative overflow-hidden p-6 sm:p-7 bg-white border-zinc-200"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[color:var(--color-orange)]" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-[color:var(--color-orange)]">
                        {p.n}
                      </p>
                      <p className="mt-2 text-lg font-bold text-zinc-900">
                        {p.title}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[color:var(--color-orange-light)] p-2">
                      <Icon className="h-5 w-5 text-[color:var(--color-orange)]" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {p.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (resumo) */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                {t('steps.title')}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
                {t('steps.sub')}
              </p>
            </div>
            <WekaButton asChild intent="secondary" className="h-11">
              <Link to="/como-funciona">{t('steps.cta')}</Link>
            </WekaButton>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                n: "1",
                t: t('steps.s1'),
                d: t('steps.s1d'),
              },
              {
                n: "2",
                t: t('steps.s2'),
                d: t('steps.s2d'),
              },
              {
                n: "3",
                t: t('steps.s3'),
                d: t('steps.s3d'),
              },
            ].map((s) => (
              <div key={s.n} className="wk-card-dark border border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white">
                    {s.n}
                  </div>
                  <p className="text-base font-bold text-white">{s.t}</p>
                </div>
                <p className="mt-3 text-sm text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
                {t('calculator.title')}
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                {t('calculator.sub')}
              </p>
            </div>
            <WekaButton asChild className="h-11">
              <Link to="/contacto">{t('calculator.cta')}</Link>
            </WekaButton>
          </div>

          <div className="mt-10">
            <RentCalculator />
          </div>
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section className="bg-[color:var(--color-charcoal)]">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              {t('testimonials.title')}
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              {t('testimonials.sub')}
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                text: t('testimonials.t1'),
                name: t('testimonials.t1_name'),
                city: t('testimonials.t1_city'),
              },
              {
                text: t('testimonials.t2'),
                name: t('testimonials.t2_name'),
                city: t('testimonials.t2_city'),
              },
              {
                text: t('testimonials.t3'),
                name: t('testimonials.t3_name'),
                city: t('testimonials.t3_city'),
              },
            ].map((t) => (
              <div
                key={t.name}
                className="wk-card-dark border border-white/10 p-6"
              >
                <p className="text-sm leading-relaxed text-white/80">"{t.text}"</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <span className="text-xs font-semibold text-[color:var(--color-orange)]">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="wk-container wk-section">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              {t('faq.title')}
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              {t('faq.sub')}
            </p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${idx}`}
                  className="wk-card mb-3 overflow-hidden border-zinc-200"
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-sm font-semibold text-zinc-900 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm text-zinc-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              {t('cta_final.title')}
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">{t('cta_final.btn')}</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}