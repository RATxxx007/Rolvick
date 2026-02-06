import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[#11141a] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.01),0_18px_60px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-heading text-xl font-semibold tracking-tight text-zinc-100",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-zinc-400", className)} {...props} />;
}

export { Card, CardTitle, CardDescription };
