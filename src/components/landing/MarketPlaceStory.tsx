"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const collections = [
  {
    number: "01",
    label: "Summer 2026",
    title: "Minimal",
    highlightedTitle: "Essentials",
    description:
      "Clean silhouettes, soft neutrals and refined everyday pieces selected from independent fashion labels.",
    image: "/images/collection-minimal.png",
    href: "/products?collection=minimal",
    imagePosition: "center 35%",
    align: "left",
    tag: "Quiet forms",
  },
  {
    number: "02",
    label: "New drop",
    title: "Street",
    highlightedTitle: "Uniform",
    description:
      "Oversized layers, washed textures and utility-inspired clothing made for movement through the city.",
    image: "/images/collection-street.png",
    href: "/products?collection=streetwear",
    imagePosition: "center 30%",
    align: "right",
    tag: "City movement",
  },
  {
    number: "03",
    label: "Selected edit",
    title: "Modern",
    highlightedTitle: "Luxury",
    description:
      "A considered collection of modern tailoring, premium materials and timeless statement pieces.",
    image: "/images/collection-luxury.png",
    href: "/products?collection=modern-luxury",
    imagePosition: "center 28%",
    align: "left",
    tag: "Refined details",
  },
];

export default function MarketplaceStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-story-card]");
      const headingLines = gsap.utils.toArray<HTMLElement>(
        "[data-story-heading-line]",
      );

      /*
       * Header animation
       */
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      headerTimeline
        .from("[data-story-eyebrow]", {
          y: 20,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .from(
          headingLines,
          {
            yPercent: 115,
            rotate: 2,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .from(
          "[data-story-intro]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-story-header-line]",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.55",
        );

      /*
       * Individual collection animations
       */
      cards.forEach((card) => {
        const imageWrapper = card.querySelector<HTMLElement>(
          "[data-story-image-wrapper]",
        );

        const image = card.querySelector<HTMLElement>("[data-story-image]");

        const imageCover = card.querySelector<HTMLElement>(
          "[data-story-image-cover]",
        );

        const contentItems = card.querySelectorAll<HTMLElement>(
          "[data-story-content-item]",
        );

        const number = card.querySelector<HTMLElement>("[data-story-number]");

        const divider = card.querySelector<HTMLElement>("[data-story-divider]");

        const progress = card.querySelector<HTMLElement>(
          "[data-story-progress]",
        );

        const direction = card.dataset.direction === "right" ? 1 : -1;

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        cardTimeline
          .from(card, {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          })
          .fromTo(
            imageWrapper,
            {
              clipPath:
                direction === 1
                  ? "inset(0% 100% 0% 0%)"
                  : "inset(0% 0% 0% 100%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            "-=0.75",
          )
          .to(
            imageCover,
            {
              scaleX: 0,
              transformOrigin: direction === 1 ? "right center" : "left center",
              duration: 0.95,
              ease: "power4.inOut",
            },
            "-=0.95",
          )
          .from(
            image,
            {
              scale: 1.18,
              duration: 1.4,
              ease: "power3.out",
            },
            "-=1.15",
          )
          .from(
            number,
            {
              x: direction * 80,
              opacity: 0,
              duration: 0.9,
              ease: "power4.out",
            },
            "-=1",
          )
          .from(
            contentItems,
            {
              y: 42,
              opacity: 0,
              stagger: 0.09,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.65",
          )
          .from(
            divider,
            {
              scaleX: 0,
              transformOrigin: direction === 1 ? "right center" : "left center",
              duration: 0.8,
              ease: "power3.inOut",
            },
            "-=0.55",
          );

        /*
         * Continuous image parallax
         */
        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: -7,
            },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        /*
         * Large number movement
         */
        if (number) {
          gsap.fromTo(
            number,
            {
              yPercent: -15,
            },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        /*
         * Bottom progress animation
         */
        if (progress) {
          gsap.fromTo(
            progress,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                end: "bottom 35%",
                scrub: true,
              },
            },
          );
        }
      });

      /*
       * Desktop pointer image movement
       */
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const cleanups: Array<() => void> = [];

        cards.forEach((card) => {
          const image = card.querySelector<HTMLElement>("[data-story-image]");
          const arrow = card.querySelector<HTMLElement>("[data-story-arrow]");

          if (!image) return;

          const moveX = gsap.quickTo(image, "x", {
            duration: 0.8,
            ease: "power3.out",
          });

          const moveY = gsap.quickTo(image, "y", {
            duration: 0.8,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();

            const normalizedX =
              (event.clientX - bounds.left) / bounds.width - 0.5;

            const normalizedY =
              (event.clientY - bounds.top) / bounds.height - 0.5;

            moveX(normalizedX * 22);
            moveY(normalizedY * 16);
          };

          const handlePointerEnter = () => {
            gsap.to(image, {
              scale: 1.045,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(arrow, {
              rotate: 45,
              scale: 1.08,
              backgroundColor: "#ff4b2b",
              borderColor: "#ff4b2b",
              duration: 0.45,
              ease: "back.out(1.8)",
              overwrite: "auto",
            });
          };

          const handlePointerLeave = () => {
            moveX(0);
            moveY(0);

            gsap.to(image, {
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(arrow, {
              rotate: 0,
              scale: 1,
              backgroundColor: "rgba(255,255,255,0)",
              borderColor: "rgba(255,255,255,0.35)",
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("pointermove", handlePointerMove);
          card.addEventListener("pointerenter", handlePointerEnter);
          card.addEventListener("pointerleave", handlePointerLeave);

          cleanups.push(() => {
            card.removeEventListener("pointermove", handlePointerMove);
            card.removeEventListener("pointerenter", handlePointerEnter);
            card.removeEventListener("pointerleave", handlePointerLeave);
          });
        });

        return () => {
          cleanups.forEach((cleanup) => cleanup());
        };
      });

      /*
       * Magnetic buttons
       */
      const arrows = gsap.utils.toArray<HTMLElement>("[data-story-arrow]");
      const arrowCleanups: Array<() => void> = [];

      arrows.forEach((arrow) => {
        const handleMove = (event: PointerEvent) => {
          const bounds = arrow.getBoundingClientRect();

          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;

          gsap.to(arrow, {
            x: x * 0.18,
            y: y * 0.18,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleLeave = () => {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.45)",
            overwrite: "auto",
          });
        };

        arrow.addEventListener("pointermove", handleMove);
        arrow.addEventListener("pointerleave", handleLeave);

        arrowCleanups.push(() => {
          arrow.removeEventListener("pointermove", handleMove);
          arrow.removeEventListener("pointerleave", handleLeave);
        });
      });

      return () => {
        media.revert();
        arrowCleanups.forEach((cleanup) => cleanup());
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101010] px-[4vw] py-28 text-white max-md:px-5 max-md:py-20"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-full w-px bg-white/[0.035]" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-white/[0.035]" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.055] blur-[160px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_42%)]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-[1500px]">
        {/* Header */}
        <header className="mb-24 max-md:mb-16">
          <div className="mb-7 flex items-center justify-between gap-6">
            <p
              data-story-eyebrow
              className="flex items-center gap-3 text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-white/45"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              Curated collections
            </p>

            <p className="hidden text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/35 md:block">
              Independent labels · Global perspective
            </p>
          </div>

          <div className="grid grid-cols-[1fr_370px] items-end gap-12 max-lg:grid-cols-1">
            <h2 className="font-display text-[clamp(4.5rem,8vw,9rem)] uppercase leading-[0.77] tracking-[-0.045em]">
              <span className="block overflow-hidden">
                <span data-story-heading-line className="block">
                  Fashion with
                </span>
              </span>

              <span className="block overflow-hidden">
                <span data-story-heading-line className="block">
                  a distinctive
                </span>
              </span>

              <span className="block overflow-hidden">
                <span data-story-heading-line className="block text-accent">
                  point of view
                </span>
              </span>
            </h2>

            <p
              data-story-intro
              className="max-w-[370px] justify-self-end pb-2 text-sm leading-7 text-white/50 max-lg:justify-self-start max-lg:pb-0"
            >
              Discover focused edits shaped by independent sellers, contemporary
              labels and emerging creators defining what comes next.
            </p>
          </div>

          <div
            data-story-header-line
            className="mt-14 h-px w-full bg-white/15"
          />
        </header>

        {/* Collection stories */}
        <div className="space-y-28 max-md:space-y-20">
          {collections.map((collection) => {
            const isRight = collection.align === "right";

            return (
              <article
                key={collection.number}
                data-story-card
                data-direction={isRight ? "right" : "left"}
                className="group relative border-t border-white/15 pt-7"
              >
                {/* Top metadata */}
                <div className="mb-7 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <span className="font-display text-3xl leading-none text-accent">
                      {collection.number}
                    </span>

                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-white/45">
                      {collection.label}
                    </p>
                  </div>

                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/30">
                    {collection.tag}
                  </p>
                </div>

                <div
                  className={`grid min-h-[720px] grid-cols-2 overflow-hidden bg-[#181818] max-lg:min-h-0 max-lg:grid-cols-1 ${
                    isRight ? "lg:grid-cols-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    data-story-image-wrapper
                    className={`relative min-h-[720px] overflow-hidden max-lg:min-h-[620px] max-md:min-h-[500px] ${
                      isRight ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      data-story-image
                      src={collection.image}
                      alt={`${collection.title} ${collection.highlightedTitle} collection`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="scale-[1.06] object-cover will-change-transform"
                      style={{
                        objectPosition: collection.imagePosition,
                      }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_55%)]" />

                    <div
                      data-story-image-cover
                      className="absolute inset-0 z-[2] bg-accent"
                    />

                    <p className="absolute bottom-7 left-7 z-[3] text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-white/65">
                      StyleHub editorial / {collection.number}
                    </p>
                  </div>

                  {/* Content */}
                  <div
                    className={`relative flex min-h-[720px] flex-col justify-between overflow-hidden p-[clamp(28px,4vw,60px)] max-lg:min-h-[560px] max-md:min-h-[500px] ${
                      isRight ? "lg:order-1" : ""
                    }`}
                  >
                    <span
                      data-story-number
                      className={`pointer-events-none absolute -top-8 font-display text-[clamp(10rem,18vw,20rem)] leading-none text-white/[0.045] ${
                        isRight ? "-left-5" : "-right-5"
                      }`}
                    >
                      {collection.number}
                    </span>

                    <div
                      className={`relative z-[2] flex items-center gap-4 ${
                        isRight ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-accent" />

                      <p
                        data-story-content-item
                        className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-white/45"
                      >
                        Collection {collection.number}
                      </p>
                    </div>

                    <div
                      className={`relative z-[2] ${
                        isRight ? "lg:text-right" : ""
                      }`}
                    >
                      <p
                        data-story-content-item
                        className="mb-5 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-white/45"
                      >
                        {collection.label}
                      </p>

                      <h3
                        data-story-content-item
                        className="
    font-display uppercase
    text-[clamp(3.5rem,5.2vw,6.5rem)]
    leading-[0.76]
    tracking-[-0.035em]
    max-sm:text-[clamp(3.5rem,16vw,5.5rem)]
  "
                      >
                        {collection.title}

                        <span className="block text-accent">
                          {collection.highlightedTitle}
                        </span>
                      </h3>

                      <div
                        data-story-divider
                        className={`my-8 h-px w-full bg-white/20 ${
                          isRight ? "origin-right" : "origin-left"
                        }`}
                      />

                      <div
                        className={`flex items-end justify-between gap-8 max-sm:block ${
                          isRight ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <p
                          data-story-content-item
                          className={`max-w-[420px] text-sm leading-7 text-white/55 ${
                            isRight ? "lg:ml-auto" : ""
                          }`}
                        >
                          {collection.description}
                        </p>

                        <Link
                          href={collection.href}
                          aria-label={`Explore ${collection.title} ${collection.highlightedTitle}`}
                          data-story-arrow
                          className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/35 text-white will-change-transform max-sm:mt-7"
                        >
                          <ArrowUpRight size={24} strokeWidth={1.5} />
                        </Link>
                      </div>
                    </div>

                    <div className="relative z-[2] mt-14 flex items-center gap-5">
                      <p className="shrink-0 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/30">
                        Explore the edit
                      </p>

                      <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                        <div
                          data-story-progress
                          className="absolute inset-0 origin-left bg-accent"
                        />
                      </div>

                      <p className="shrink-0 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/30">
                        0{collections.length}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section ending */}
        <div className="mt-24 flex items-center gap-5 max-md:mt-16">
          <p className="shrink-0 text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-white/35">
            The StyleHub perspective
          </p>

          <div className="h-px flex-1 bg-white/15" />

          <p className="shrink-0 font-display text-3xl text-accent">01 — 03</p>
        </div>
      </div>
    </section>
  );
}
