import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center shrink-0 w-[200px] md:w-[350px] lg:w-[450px]", className)}>
      <img
        src="/assets/wekasas-logo-official.png"
        alt="WEKASAS"
        className="h-10 md:h-16 w-auto object-contain mix-blend-screen scale-[1.8] md:scale-[2.5] origin-left relative z-50 block"
        style={{ minWidth: '150px' }}
      />
    </div>
  );
}
