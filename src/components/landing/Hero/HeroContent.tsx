"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HeroContentProps } from "./types";

export default function HeroContent({
  eyebrowRef,
  headingRefs,
  descriptionRef,
  buttonRefs,
  magneticHandlers,
}: HeroContentProps) {
  const setHeadingRef = (element: HTMLHeadingElement | null, index: number) => {
    if (element) {
      headingRefs.current[index] = element;
    }
  };

  const setButtonRef = (element: HTMLAnchorElement | null, index: number) => {
    if (element) {
      buttonRefs.current[index] = element;
    }
  };

  return (
    <div className="relative z-20 flex min-h-[720px] flex-col justify-center py-20 max-lg:min-h-0 max-lg:pb-10 max-lg:pt-32 max-md:pt-28">
      <div
        ref={eyebrowRef}
        className="mb-8 flex items-center gap-4 overflow-hidden"
      >
        <span className="h-px w-10 bg-ink" />

        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-muted">
          Independent fashion marketplace
        </p>
      </div>

      <div className="font-display uppercase text-ink">
        <div className="overflow-hidden">
          <h1
            ref={(element) => setHeadingRef(element, 0)}
            className="text-[clamp(5rem,10vw,11.5rem)] leading-[0.75] tracking-[-0.045em]"
          >
            Style
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={(element) => setHeadingRef(element, 1)}
            className="text-[clamp(4.2rem,8.1vw,9.4rem)] leading-[0.8] tracking-[-0.045em]"
          >
            Doesn&apos;t live
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={(element) => setHeadingRef(element, 2)}
            className="text-[clamp(4.2rem,8.1vw,9.4rem)] leading-[0.8] tracking-[-0.045em]"
          >
            In <span className="text-accent">one store.</span>
          </h1>
        </div>
      </div>

      <div className="mt-12 grid max-w-[760px] grid-cols-[minmax(220px,390px)_1fr] items-end gap-10 max-md:grid-cols-1 max-md:gap-7">
        <p
          ref={descriptionRef}
          className="text-sm leading-7 text-muted max-md:max-w-[500px]"
        >
          Discover remarkable pieces from local stores, independent designers
          and emerging clothing brands in one curated marketplace.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            ref={(element) => setButtonRef(element, 0)}
            href="/products"
            {...magneticHandlers}
            className="group flex min-h-14 items-center gap-5 rounded-full bg-ink py-2 pl-6 pr-2 text-[0.7rem] font-extrabold uppercase tracking-[0.1em] text-white"
          >
            <span>Explore collection</span>

            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </span>
          </Link>

          <Link
            ref={(element) => setButtonRef(element, 1)}
            href="/seller/register"
            {...magneticHandlers}
            className="group flex min-h-14 items-center gap-5 rounded-full border border-black/20 bg-white/70 py-2 pl-6 pr-2 text-[0.7rem] font-extrabold uppercase tracking-[0.1em] text-ink backdrop-blur-md"
          >
            <span>Open your store</span>

            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
