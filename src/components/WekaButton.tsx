import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Intent = "primary" | "secondary" | "ghost";

export function WekaButton({
  intent = "primary",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant"> & {
  intent?: Intent;
}) {
  return (
    <Button
      {...props}
      variant="default"
      className={cn(
        "rounded-lg transition-colors duration-200",
        intent === "primary" &&
          "bg-[color:var(--color-orange)] text-white hover:bg-[color:var(--color-orange-dark)]",
        intent === "secondary" &&
          "border border-[color:var(--color-orange)] bg-transparent text-[color:var(--color-orange)] hover:bg-[color:var(--color-orange-light)]",
        intent === "ghost" && "bg-transparent text-white hover:bg-white/10",
        className
      )}
    />
  );
}