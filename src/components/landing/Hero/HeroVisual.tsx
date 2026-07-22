"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import type { HeroVisualProps } from "./types";

export default function HeroVisual({
  mainImageRef,
  secondaryImageRef,
  cardRefs,
}: HeroVisualProps) {
  const setCardRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      cardRefs.current[index] = element;
    }
  };

  return (
    <div className="relative z-10 min-h-[760px] max-lg:min-h-[720px] max-md:min-h-[620px]">
      <div
        ref={mainImageRef}
        className="absolute bottom-12 right-[6%] top-10 w-[68%] overflow-hidden bg-neutral-900 will-change-transform max-xl:right-0 max-xl:w-[72%] max-lg:bottom-14 max-lg:right-[5%] max-lg:top-0 max-md:bottom-20 max-md:right-0 max-md:w-[82%]"
      >
        <Image
          src="/images/hero-fashion.png"
          alt="Female fashion model wearing a modern outfit"
          fill
          priority
          sizes="(max-width: 900px) 80vw, 40vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,transparent_44%)]" />

        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-7 text-white max-md:p-5">
          <div>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/55">
              Featured collection
            </span>

            <p className="mt-2 text-sm font-semibold">Undefined / Edition 01</p>
          </div>

          <ArrowUpRight size={27} strokeWidth={1.3} />
        </div>

        <p
          aria-hidden="true"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 [writing-mode:vertical-rl] font-display text-5xl uppercase tracking-[0.08em] text-white/25 max-md:text-4xl"
        >
          Undefined
        </p>
      </div>

      <div
        ref={secondaryImageRef}
        className="absolute left-[2%] top-[20%] z-20 h-[330px] w-[220px] rotate-[-3deg] overflow-hidden border-[7px] border-page bg-neutral-900 shadow-2xl will-change-transform max-xl:left-0 max-lg:left-[4%] max-md:top-[14%] max-md:h-[230px] max-md:w-[150px]"
      >
        <Image
          src="/images/hero-fashion-2.png"
          alt="Male fashion model wearing a modern outfit"
          fill
          sizes="(max-width: 900px) 40vw, 16vw"
          className="object-cover object-center"
        />

        <span className="absolute bottom-3 right-3 z-10 font-display text-4xl text-white">
          02
        </span>

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div
        ref={(element) => setCardRef(element, 0)}
        className="absolute left-[4%] top-[66%] z-30 min-w-[165px] rounded-2xl border border-black/10 bg-white/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl max-md:left-0 max-md:top-[62%]"
      >
        <div className="mb-3 flex gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={13} fill="currentColor" />
          ))}
        </div>

        <strong className="font-display text-4xl font-normal leading-none text-ink">
          4.9
        </strong>

        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted">
          Trusted marketplace
        </p>
      </div>

      <div
        ref={(element) => setCardRef(element, 1)}
        className="absolute right-[-2%] top-[17%] z-30 min-w-[170px] rounded-2xl bg-accent p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] max-xl:right-0 max-md:top-[7%]"
      >
        <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-white/70">
          Live now
        </span>

        <strong className="mt-3 block font-display text-5xl font-normal leading-none">
          4,500+
        </strong>

        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/75">
          Curated products
        </p>
      </div>

      <div
        ref={(element) => setCardRef(element, 2)}
        className="absolute bottom-[10%] right-[-3%] z-30 flex items-center gap-3 rounded-full border border-black/10 bg-white/90 py-3 pl-4 pr-6 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl max-xl:right-0 max-md:bottom-[4%]"
      >
        <span className="relative h-3 w-3 rounded-full bg-accent">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
        </span>

        <div>
          <strong className="block text-xs font-extrabold uppercase tracking-[0.08em] text-ink">
            Just dropped
          </strong>

          <p className="text-[0.65rem] text-muted">Summer collection</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-[33%] z-30 flex flex-wrap gap-x-5 gap-y-2 text-[0.6rem] font-extrabold uppercase tracking-[0.17em] text-muted max-md:left-0">
        <span>Delhi</span>
        <span>Mumbai</span>
        <span>Chandigarh</span>
        <span>Shimla</span>
      </div>
    </div>
  );
}
