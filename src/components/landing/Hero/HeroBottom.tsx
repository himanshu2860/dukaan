"use client";

import { ArrowDown } from "lucide-react";
import type { HeroBottomProps } from "./types";

export default function HeroBottom({ bottomBarRef }: HeroBottomProps) {
  return (
    <div
      ref={bottomBarRef}
      className="relative z-20 mx-auto flex w-full max-w-[1600px] items-center gap-6 px-[4vw] pb-7 max-md:px-5"
    >
      <div className="flex shrink-0 items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-muted">
        <ArrowDown size={16} strokeWidth={1.7} />
        <span>Scroll to explore</span>
      </div>

      <div className="h-px flex-1 bg-black/15" />

      <div className="shrink-0 text-right">
        <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-muted">
          Next
        </span>

        <p className="mt-1 text-xs font-semibold text-ink">
          Featured categories
        </p>
      </div>
    </div>
  );
}
