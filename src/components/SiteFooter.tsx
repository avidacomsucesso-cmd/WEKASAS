import { Link, useLocation } from "react-router-dom";
import { WekaLogo } from "@/components/WekaLogo";
import { useTranslation } from 'react-i18next';

export function SiteFooter() {
  const { t } = useTranslation();
  const location = useLocation();

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[color:var(--color-charcoal)] border-t border-white/10 pt-16 pb-8 text-white">
      <div className="wk-container">
        <div className="grid gap-12 md:grid-cols-12 lg:gap-20">
          <div className="md:col-span-5">
            <WekaLogo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-orange)]">
                  {t('footer.services')}
                </p>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/como-funciona" className="text-xs text-white/60 hover:text-white transition-colors">{t('nav.how')}</Link></li>
                  <li><Link to="/precos" className="text-xs text-white/60 hover:text-white transition-colors">{t('nav.prices')}</Link></li>
                  <li><Link to="/arrendamentos" className="text-xs text-white/60 hover:text-white transition-colors">{t('nav.tenants')}</Link></li>
                  <li>
                    <Link 
                      to="/#faq" 
                      onClick={handleFaqClick}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-orange)]">
                  {t('footer.company')}
                </p>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/sobre" className="text-xs text-white/60 hover:text-white transition-colors">{t('nav.about')}</Link></li>
                  <li><Link to="/parceiros" className="text-xs text-white/60 hover:text-white transition-colors">{t('nav.partners')}</Link></li>
                  <li><Link to="/contacto" className="text-xs text-white/60 hover:text-white transition-colors">{t('footer.contact')}</Link></li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-orange)]">
                  {t('footer.legal')}
                </p>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/privacidade" className="text-xs text-white/60 hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
                  <li><Link to="/termos" className="text-xs text-white/60 hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-orange)]">
                  {t('footer.contact')}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="text-xs text-white/60">contacto@wekasas.com</li>
                  <li className="text-xs text-white/60">+351 96 252 5307</li>
                  <li className="text-xs text-white/60">{t('footer.platform')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="text-[10px] font-medium text-white/40">
            {t('footer.copyright')}
          </div>
          <div className="mt-2 text-[10px] font-bold text-white/40 sm:mt-0">
            {t('footer.platform')}
          </div>
        </div>
      </div>
    </footer>
  );
}