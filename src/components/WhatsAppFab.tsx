import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function getWhatsAppNumber() {
  const raw =
    (import.meta as any).env?.NEXT_PUBLIC_WHATSAPP ||
    (import.meta as any).env?.VITE_WHATSAPP ||
    "351928202241";
  return String(raw).replace(/\D/g, "");
}

function eur(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export function WhatsAppFab({ className }: { className?: string }) {
  const number = getWhatsAppNumber();
  const href = `https://wa.me/${number}`;

  return (
    <div className={cn("fixed bottom-5 right-5 z-50", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
            className={cn(
              "group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg",
              "transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20.52 3.48A11.89 11.89 0 0 0 12.01 0C5.4 0 .03 5.37 0 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.94 11.94 0 0 0 5.81 1.48h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.24-6.21-3.48-8.4ZM12.02 21.5h-.01a9.52 9.52 0 0 1-4.86-1.33l-.35-.2-3.68.96.98-3.59-.23-.37a9.5 9.5 0 1 1 8.15 4.53Zm5.52-7.53c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.47-1.77-1.64-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
            </svg>
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" className="rounded-lg bg-black/80 text-white">
          Falar no WhatsApp
        </TooltipContent>
      </Tooltip>
    </div>
  );
}