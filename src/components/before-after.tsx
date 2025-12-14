"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function BeforeAfter({
  beforeLabel = "До",
  afterLabel = "После",
  className,
}: {
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [value, setValue] = React.useState(55);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950",
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(0,255,209,0.18),transparent_50%),linear-gradient(135deg,rgba(255,59,99,0.26),rgba(59,130,246,0.16))]" />
          <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_60%)]">
            <div className="absolute left-[10%] top-[18%] h-20 w-20 rounded-full bg-white/10 blur-xl" />
            <div className="absolute right-[12%] bottom-[14%] h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.24),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(255,214,0,0.20),transparent_50%),linear-gradient(135deg,rgba(168,85,247,0.22),rgba(34,211,238,0.14))]" />
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-[8%] bottom-[18%] h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-[18%] top-[22%] h-20 w-20 rounded-full bg-white/10 blur-xl" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] [background-size:200%_100%] animate-[shimmer_2.8s_ease-in-out_infinite]" />
        </div>

        <div
          className="absolute inset-y-0"
          style={{ left: `${value}%` }}
        >
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white/60" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <div className="h-5 w-5 rounded-full bg-zinc-950/80" />
            </div>
          </div>
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {beforeLabel}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {afterLabel}
        </div>

        <input
          aria-label="Before and after slider"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
