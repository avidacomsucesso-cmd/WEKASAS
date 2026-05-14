import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center shrink-0", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-8 md:h-12 w-auto object-contain mix-blend-screen scale-[1.5] md:scale-[3.0] origin-left relative z-50"
        aria-hidden="true"
      />
      {/* Spacer to prevent overlap without breaking the layout */}
      <div className="hidden md:block w-[180px] lg:w-[240px]" />
    </div>
  );
}