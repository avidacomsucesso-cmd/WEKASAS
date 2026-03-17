import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-[140px] md:h-[230px] w-auto object-contain mix-blend-screen"
        aria-hidden="true"
      />
    </div>
  );
}