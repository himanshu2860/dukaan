"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const firstRow = [
  "PREMIUM",
  "STREETWEAR",
  "LUXURY",
  "DESIGNER",
  "VINTAGE",
  "HANDCRAFTED",
];

const secondRow = [
  "INDEPENDENT LABELS",
  "CURATED DROPS",
  "MODERN STYLE",
  "LIMITED EDITIONS",
  "NEW CULTURE",
];

export default function FashionMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstTrackRef = useRef<HTMLDivElement>(null);
  const secondTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const firstTrack = firstTrackRef.current;
      const secondTrack = secondTrackRef.current;

      if (!section || !firstTrack || !secondTrack) return;

      const firstAnimation = gsap.to(firstTrack, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.set(secondTrack, {
        xPercent: -50,
      });

      const secondAnimation = gsap.to(secondTrack, {
        xPercent: 0,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.from("[data-marquee-header]", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const handleMouseEnter = () => {
        gsap.to([firstAnimation, secondAnimation], {
          timeScale: 0.25,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.to("[data-marquee-word]", {
          skewX: -4,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([firstAnimation, secondAnimation], {
          timeScale: 1,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to("[data-marquee-word]", {
          skewX: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      };

      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);

        firstAnimation.kill();
        secondAnimation.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  const firstContent = [...firstRow, ...firstRow];
  const secondContent = [...secondRow, ...secondRow];

  return (
    <section
      ref={sectionRef}
      aria-label="StyleHub fashion categories"
      className="relative overflow-hidden border-y border-white/15 bg-[#9f1518] py-8 text-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_38%),linear-gradient(90deg,#761012_0%,#b51d21_50%,#761012_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      {/* Header */}
      <div
        data-marquee-header
        className="relative z-20 mx-auto mb-7 flex max-w-[1500px] items-center justify-between gap-6 px-[4vw] max-md:px-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white" />

          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-white/70">
            The StyleHub edit
          </p>
        </div>

        <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/50">
          Hover to slow down
        </p>
      </div>

      {/* First row */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 py-3">
        <div
          ref={firstTrackRef}
          className="flex w-max min-w-max items-center will-change-transform"
        >
          {firstContent.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="flex shrink-0 items-center gap-8 px-5 max-md:gap-5 max-md:px-3"
            >
              <span
                data-marquee-word
                className="will-change-transform font-display text-[clamp(4rem,7.5vw,9rem)] uppercase leading-[0.82] tracking-[-0.045em]"
              >
                {word}
              </span>

              <span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/40 max-md:h-6 max-md:w-6"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white max-md:h-2 max-md:w-2" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row */}
      <div className="relative z-10 mt-3 overflow-hidden py-2">
        <div
          ref={secondTrackRef}
          className="flex w-max min-w-max items-center will-change-transform"
        >
          {secondContent.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="flex shrink-0 items-center gap-7 px-5 max-md:gap-4 max-md:px-3"
            >
              <span
                data-marquee-word
                className="will-change-transform font-display text-[clamp(2.6rem,5vw,6rem)] uppercase leading-none tracking-[-0.035em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.72)]"
              >
                {word}
              </span>

              <span
                aria-hidden="true"
                className="text-2xl font-light text-white/75"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Side fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-24 bg-gradient-to-r from-[#761012] via-[#761012]/65 to-transparent max-md:w-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-24 bg-gradient-to-l from-[#761012] via-[#761012]/65 to-transparent max-md:w-10"
      />

      {/* Bottom details */}
      <div className="relative z-20 mx-auto mt-7 flex max-w-[1500px] items-center gap-5 px-[4vw] max-md:px-5">
        <p className="shrink-0 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/55">
          New Delhi
        </p>

        <div className="h-px flex-1 bg-white/20" />

        <p className="shrink-0 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/55">
          Fashion without limits
        </p>
      </div>
    </section>
  );
}
