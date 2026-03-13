import * as React from "react";
import { cn } from "@/lib/utils";

export function WekaLogo({
  className,
  markClassName,
  textClassName,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 80 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-7 w-7", markClassName)}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M10,20 L10,56 L22,56 L22,36 L40,56 L58,36 L58,56 L70,56 L70,20 L58,20 L58,40 L40,20 L22,40 L22,20 Z"
          fill="#3A3A3A"
        />
        <path
          d="M4,14 L4,50 L16,50 L16,30 L40,50 L64,30 L64,50 L76,50 L76,14 L64,14 L64,34 L40,14 L16,34 L16,14 Z"
          fill="#FA621C"
        />
      </svg>

      <span
        className={cn(
          "select-none font-sans text-sm font-bold uppercase tracking-[0.05em] text-white",
          textClassName
        )}
      >
        WEKASAS
      </span>
    </div>
  );
}
