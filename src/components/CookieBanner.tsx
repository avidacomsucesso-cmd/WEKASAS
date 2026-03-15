import * as React from "react";
import { Link } from "react-router-dom";
import { WekaButton } from "./WekaButton";

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[#212121] p-5 shadow-2xl border border-white/10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/90 leading-relaxed text-center sm:text-left">
            Usamos cookies para melhorar a tua experiência. Ao continuar, aceitas a nossa{" "}
            <Link to="/privacidade" className="font-bold text-[color:var(--color-orange)] hover:underline">
              Política de Privacidade
            </Link>.
          </p>
          <WekaButton onClick={handleAccept} className="whitespace-nowrap h-10 px-8 text-sm font-bold">
            Aceitar
          </WekaButton>
        </div>
      </div>
    </div>
  );
}
