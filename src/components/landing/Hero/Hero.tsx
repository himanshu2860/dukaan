"use client";

import { useRef } from "react";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import HeroBottom from "./HeroBottom";
import { useHeroAnimations } from "./HeroAnimations";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLParagraphElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRefs = useRef<HTMLAnchorElement[]>([]);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const bottomBarRef = useRef<HTMLDivElement>(null);

  const magneticHandlers = useHeroAnimations({
    sectionRef,
    spotlightRef,
    backgroundTextRef,
    eyebrowRef,
    headingRefs,
    descriptionRef,
    buttonRefs,
    mainImageRef,
    secondaryImageRef,
    cardRefs,
    bottomBarRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-page text-ink"
    >
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,75,43,0.15)_0%,rgba(255,75,43,0.06)_35%,transparent_70%)] blur-2xl max-lg:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04] [background-image:url('/images/noise.png')]"
      />

      <p
        ref={backgroundTextRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[47%] z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(11rem,24vw,28rem)] uppercase leading-none tracking-[-0.04em] text-black/[0.025] will-change-transform"
      >
        Fashion Fashion Fashion
      </p>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-[1.08fr_0.92fr] gap-8 px-[4vw] max-lg:grid-cols-1 max-lg:px-6 max-md:px-5">
        <HeroContent
          eyebrowRef={eyebrowRef}
          headingRefs={headingRefs}
          descriptionRef={descriptionRef}
          buttonRefs={buttonRefs}
          magneticHandlers={magneticHandlers}
        />

        <HeroVisual
          mainImageRef={mainImageRef}
          secondaryImageRef={secondaryImageRef}
          cardRefs={cardRefs}
        />
      </div>

      <HeroBottom bottomBarRef={bottomBarRef} />
    </section>
  );
}
