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
        src="/assets/wekasas-logo-final.png"
        alt="WEKASAS"
        className="h-28 w-auto object-contain mix-blend-screen brightness-125 contrast-125"
        aria-hidden="true"
      />
    </div>
  );
}