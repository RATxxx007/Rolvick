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
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-surface-2">
        {broken ? (
          <div className="flex h-full w-full items-center justify-center font-heading text-xs font-semibold text-white">
            {initials}
          </div>
        ) : (
          // Using <img> here to keep export simple and allow basePath via withBasePath.
          <img
            src={withBasePath(imagePath)}
            alt={name}
            className="h-full w-full object-cover"
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
