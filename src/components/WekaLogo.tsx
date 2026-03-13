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
        src="/assets/wekasas-logo-full.png"
        alt="WEKASAS"
        className="h-10 w-auto object-contain"
        aria-hidden="true"
      />
    </div>
  );
}