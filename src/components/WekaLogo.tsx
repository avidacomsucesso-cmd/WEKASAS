import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 shrink-0", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-64 md:h-[208px] w-auto object-contain mix-blend-screen"
        aria-hidden="true"
      />
    </div>
  );
}