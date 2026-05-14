import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center shrink-0 pr-[140px] md:pr-[280px] lg:pr-[320px]", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-10 md:h-12 w-auto object-contain mix-blend-screen scale-[2.5] md:scale-[3.5] origin-left relative z-50"
        aria-hidden="true"
      />
    </div>
  );
}