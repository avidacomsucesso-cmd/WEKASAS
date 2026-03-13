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
        className="h-32 md:h-44 w-auto object-contain mix-blend-screen"
        aria-hidden="true"
      />
    </div>
  );
}