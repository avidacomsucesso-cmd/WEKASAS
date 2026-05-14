import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center shrink-0 w-full md:w-auto", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-10 md:h-12 w-auto object-contain mix-blend-screen scale-[3.5] md:scale-[3.0] origin-left relative z-50 ml-4 md:ml-0"
        aria-hidden="true"
      />
      {/* Spacer to prevent overlap without breaking the layout */}
      <div className="flex-grow md:flex-none md:w-[180px] lg:w-[240px]" />
    </div>
  );
}