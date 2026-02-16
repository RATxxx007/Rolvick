"use client";

import { useMemo, useState } from "react";

import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

type OwnerMarkProps = {
  name: string;
  imagePath: string;
  className?: string;
};

export function OwnerMark({ name, imagePath, className }: OwnerMarkProps) {
  const [broken, setBroken] = useState(false);
  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part.slice(0, 1).toUpperCase())
      .join("");
  }, [name]);

  return (
    <div className={cn("group flex items-center gap-3", className)} title={name}>
      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-surface-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all group-hover:border-accent/40 group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.22),0_14px_50px_rgba(0,0,0,0.55)]">
        {broken ? (
          <div className="flex h-full w-full items-center justify-center font-heading text-xs font-semibold text-white">
            {initials}
          </div>
        ) : (
          // Using <img> here to keep export simple and allow basePath via withBasePath.
          <img
            src={withBasePath(imagePath)}
            alt={name}
            className="h-full w-full object-cover object-[50%_35%]"
            loading="lazy"
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-white">{name}</p>
      </div>
    </div>
  );
}
