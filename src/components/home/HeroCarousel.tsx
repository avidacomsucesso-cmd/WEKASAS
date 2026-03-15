import * as React from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "/assets/hero-slide-1.png",
    initials: "JM",
    name: "João M.",
    role: "Proprietário · Portugal",
    rent: "€1.450",
    stats: "14 meses consecutivos",
  },
  {
    image: "/assets/hero-slide-2.png",
    initials: "AR",
    name: "Ana R.",
    role: "Proprietária · Portugal",
    rent: "€1.100",
    stats: "8 meses consecutivos",
  },
  {
    image: "/assets/hero-slide-3.png",
    initials: "MT",
    name: "Miguel T.",
    role: "Proprietário · Espanha",
    rent: "€1.350",
    stats: "22 meses consecutivos",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[320px] w-full overflow-hidden sm:h-[520px] sm:w-[420px] sm:rounded-t-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-300 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={slide.image}
            alt={slide.name}
            className="h-full w-full object-cover object-top"
          />
          
          {/* Gradient overlay */}
          <div className="absolute bottom-0 h-[120px] w-full bg-gradient-to-t from-[rgba(33,33,33,0.6)] to-transparent" />

          {/* Top Left Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-[10px] border border-[rgba(250,98,28,0.25)] bg-[rgba(33,33,33,0.85)] p-[10px_14px] backdrop-blur-[8px]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(250,98,28,0.4)] bg-[rgba(250,98,28,0.2)] text-[11px] font-bold text-[color:var(--color-orange)]">
              {slide.initials}
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">{slide.name}</p>
              <p className="mt-1 text-[10px] font-medium text-white/50 leading-none">{slide.role}</p>
            </div>
          </div>

          {/* Bottom Right Badge */}
          <div className="absolute bottom-12 right-4 flex items-center gap-3 rounded-[10px] border border-[rgba(250,98,28,0.25)] bg-[rgba(33,33,33,0.85)] p-[10px_14px] backdrop-blur-[8px]">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"></span>
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Renda recebida</p>
              <p className="mt-1 text-[10px] font-medium text-white/50 leading-none">
                <span className="text-white font-bold">{slide.rent}</span> · {slide.stats}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "transition-all duration-300",
              index === current
                ? "h-1.5 w-5 rounded-[3px] bg-[color:var(--color-orange)]"
                : "h-1.5 w-1.5 rounded-full bg-white/25"
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}