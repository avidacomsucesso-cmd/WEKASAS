import { PageMeta } from "@/components/PageMeta";
import { WekaButton } from "@/components/WekaButton";
import { ReturnCalculator } from "@/components/pricing/ReturnCalculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Precos() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        title={`Preços — WEKASAS`}
        description={t('pricing_page.sub')}
        path="/precos"
      />

      <section className="bg-white">
        <div className="wk-container wk-section">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            {t('pricing_page.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
            {t('pricing_page.sub')}
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="wk-card p-7">
              <p className="text-xs font-bold text-[color:var(--color-orange)]">
                {t('pricing_page.p1_title')}
              </p>
              <p className="mt-3 text-4xl font-bold text-zinc-900">{t('pricing_page.p1_price')}</p>
              <p className="mt-2 text-sm text-zinc-600">{t('pricing_page.p1_sub')}</p>
              <p className="mt-5 text-sm font-semibold text-zinc-900">Para:</p>
              <p className="mt-1 text-sm text-zinc-600">
                {t('pricing_page.p1_for')}
              </p>

              <div className="mt-6 space-y-2">
                {[
                  t('pricing_page.p1_v1'),
                  t('pricing_page.p1_v2'),
                  t('pricing_page.p1_v3'),
                  t('pricing_page.p1_v4'),
                  t('pricing_page.p1_v5'),
                  t('pricing_page.p1_v6'),
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[color:var(--color-orange)]" />
                    <span className="text-zinc-700">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <WekaButton asChild intent="secondary" className="h-11 w-full">
                  <Link to="/contacto">{t('pricing_page.p1_btn')}</Link>
                </WekaButton>
              </div>
            </Card>

            <Card className="wk-card relative overflow-hidden p-7">
              <div className="absolute right-6 top-6 rounded-full bg-[color:var(--color-orange)] px-3 py-1 text-xs font-bold text-white">
                {t('pricing_page.most_chosen')}
              </div>

              <p className="text-xs font-bold text-[color:var(--color-orange)]">
                {t('pricing_page.p2_title')}
              </p>
              <p className="mt-3 text-4xl font-bold text-zinc-900">{t('pricing_page.p2_price')}</p>
              <p className="mt-2 text-sm text-zinc-600">{t('pricing_page.p2_sub')}</p>
              <p className="mt-5 text-sm font-semibold text-zinc-900">Para:</p>
              <p className="mt-1 text-sm text-zinc-600">
                {t('pricing_page.p2_for')}
              </p>

              <div className="mt-6 space-y-2">
                {[
                  t('pricing_page.p2_v1'),
                  t('pricing_page.p2_v2'),
                  t('pricing_page.p2_v3'),
                  t('pricing_page.p2_v4'),
                  t('pricing_page.p2_v5'),
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[color:var(--color-orange)]" />
                    <span className="text-zinc-700">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <WekaButton asChild className="h-11 w-full">
                  <Link to="/contacto">{t('pricing_page.p2_btn')}</Link>
                </WekaButton>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              {t('pricing_page.calc_title')}
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              {t('pricing_page.calc_sub')}
            </p>
          </div>

          <div className="mt-10">
            <ReturnCalculator />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wk-container wk-section pt-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-4xl">
              {t('pricing_page.faq_title')}
            </h2>
            <p className="mt-3 text-base text-zinc-600">{t('pricing_page.faq_sub')}</p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: t('pricing_page.faq_q1'),
                  a: t('pricing_page.faq_a1'),
                },
                {
                  q: t('pricing_page.faq_q2'),
                  a: t('pricing_page.faq_a2'),
                },
                {
                  q: t('pricing_page.faq_q3'),
                  a: t('pricing_page.faq_a3'),
                },
              ].map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`p-${idx}`}
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

      <section className="bg-[color:var(--color-orange)]">
        <div className="wk-container wk-section py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              {t('pricing_page.cta_title')}
            </h2>
            <WekaButton
              asChild
              className="h-12 bg-white px-6 text-base font-bold text-[color:var(--color-charcoal)] hover:bg-white"
            >
              <Link to="/contacto">{t('pricing_page.cta_btn')}</Link>
            </WekaButton>
          </div>
        </div>
      </section>
    </>
  );
}