"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const drops = [
  {
    number: "01",
    label: "Featured drop",
    title: "Summer",
    highlightedTitle: "Reframed",
    description:
      "Lightweight tailoring, soft textures and relaxed silhouettes selected for warmer days.",
    image: "/images/drop-summer.png",
    href: "/products?collection=summer",
    objectPosition: "center 30%",
  },
  {
    number: "02",
    label: "Street edit",
    title: "Built For",
    highlightedTitle: "The City",
    description:
      "Oversized layers, washed fabrics and utility-inspired pieces made for everyday movement.",
    image: "/images/drop-street.png",
    href: "/products?collection=street",
    objectPosition: "center 24%",
  },
  {
    number: "03",
    label: "Minimal luxury",
    title: "Less But",
    highlightedTitle: "Better",
    description:
      "Timeless essentials shaped by clean construction, neutral shades and refined details.",
    image: "/images/drop-minimal.png",
    href: "/products?collection=minimal-luxury",
    objectPosition: "center 25%",
  },
];

export default function FeaturedDrops() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-drop-panel]");

      const horizontalScroll = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel) => {
        const image = panel.querySelector("[data-drop-image]");
        const content = panel.querySelector("[data-drop-content]");
        const number = panel.querySelector("[data-drop-number]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        if (content) {
          gsap.from(content, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalScroll,
              start: "left 65%",
            },
          });
        }

        if (number) {
          gsap.from(number, {
            opacity: 0,
            scale: 0.6,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalScroll,
              start: "left 70%",
            },
          });
        }
      });

      ScrollTrigger.refresh();

      return () => {
        horizontalScroll.scrollTrigger?.kill();
        horizontalScroll.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-[#101010] text-white max-sm:h-auto max-sm:overflow-visible"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max will-change-transform max-sm:block max-sm:w-full"
      >
        {drops.map((drop) => (
          <article
            key={drop.number}
            data-drop-panel
            className="relative h-svh w-screen shrink-0 overflow-hidden max-sm:min-h-[720px]"
          >
            <div className="absolute inset-0 overflow-hidden bg-[#252525]">
              <Image
                data-drop-image
                src={"/images/hero-fashion.png"}
                alt={`${drop.title} ${drop.highlightedTitle} fashion collection`}
                fill
                sizes="100vw"
                className="object-cover will-change-transform"
                style={{
                  objectPosition: drop.objectPosition,
                }}
              />

              <div
                className="
                  absolute inset-0
                 bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.22)_40%,rgba(0,0,0,0)_75%),linear-gradient(to_top,rgba(0,0,0,0.42),transparent_50%)]
                  max-lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.25)),linear-gradient(to_top,rgba(0,0,0,0.62),transparent_55%)]
                "
              />
            </div>

            <span
              data-drop-number
              className="
                absolute right-[5vw] top-10 z-[5]
                font-display text-[clamp(7rem,15vw,17rem)]
                leading-none text-white/10
                max-lg:right-[22px] max-lg:top-20
                max-sm:right-[18px] max-sm:top-[75px] max-sm:text-8xl
              "
            >
              {drop.number}
            </span>

            <div
              data-drop-content
              className="
    absolute left-[6vw] top-1/2 z-[5]
    w-[min(900px,60vw)] -translate-y-[48%]
    max-lg:left-[22px] max-lg:w-[min(680px,calc(100vw-44px))]
    max-sm:bottom-[100px] max-sm:left-[18px] max-sm:right-[18px]
    max-sm:top-auto max-sm:w-auto max-sm:translate-y-0
  "
            >
              <p className="mb-6 text-[0.67rem] font-extrabold uppercase tracking-[0.18em] text-white/65">
                {drop.label}
              </p>

              <h2
                className="
    m-0 font-display
    text-[clamp(5.5rem,10vw,11.5rem)]
    font-normal uppercase leading-[0.76]
    tracking-[-0.045em]
    max-lg:text-[clamp(5rem,14vw,8rem)]
    max-sm:text-[clamp(4rem,18vw,6.5rem)]
  "
              >
                {drop.title}

                <span
                  className="
                    ml-[clamp(35px,5vw,90px)] mt-2 block text-accent
                    max-sm:ml-0
                  "
                >
                  {drop.highlightedTitle}
                </span>
              </h2>

              <p
                className="
    my-9 max-w-[500px]
    text-[1rem] leading-[1.8] text-white/65
    max-sm:my-6
  "
              >
                {drop.description}
              </p>

              <Link
                href={drop.href}
                className="
                  flex min-h-[58px] w-fit min-w-[245px]
                  items-center justify-between gap-[22px]
                  rounded-full border border-white/45
                  px-[6px] py-[6px] pl-[23px]
                  text-[0.66rem] font-extrabold uppercase tracking-[0.12em]
                  backdrop-blur-xl
                  max-sm:w-full
                "
              >
                <span>Explore the drop</span>

                <span
                  className="
                    grid h-[46px] w-[46px] place-items-center
                    rounded-full bg-accent
                    transition-transform duration-300
                    group-hover:rotate-45
                  "
                >
                  <ArrowUpRight size={21} strokeWidth={1.6} />
                </span>
              </Link>
            </div>

            <div
              className="
    absolute bottom-[22px] left-[5vw] right-[5vw] z-[5]
    grid grid-cols-[auto_1fr_auto] items-center gap-[18px]
    max-lg:left-[22px] max-lg:right-[22px]
    max-sm:bottom-[22px] max-sm:left-[18px] max-sm:right-[18px]
  "
            >
              <span className="text-[0.62rem] font-extrabold tracking-[0.14em]">
                {drop.number}
              </span>

              <div className="h-px bg-white/40" />

              <span className="text-[0.62rem] font-extrabold tracking-[0.14em]">
                03
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
