import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center shrink-0 pr-12 md:pr-48 lg:pr-64", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-12 md:h-12 w-auto object-contain mix-blend-screen scale-[2.5] md:scale-[3.5] origin-left"
        aria-hidden="true"
      />
    </div>
  );
}