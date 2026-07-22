"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  {
    number: "01",
    title: "Women",
    subtitle:
      "Modern silhouettes, elevated essentials and expressive pieces for every mood.",
    image: "/images/category-women.png",
    href: "/products?category=women",
    position: "68% center",
  },
  {
    number: "02",
    title: "Men",
    subtitle:
      "Contemporary tailoring, streetwear and everyday staples built around modern life.",
    image: "/images/category-men.png",
    href: "/products?category=men",
    position: "62% center",
  },
  {
    number: "03",
    title: "Accessories",
    subtitle:
      "Statement details and finishing pieces designed to transform the complete look.",
    image: "/images/category-accessories.png",
    href: "/products?category=accessories",
    position: "center center",
  },
];

export default function CategoryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-category-card]");

      /*
       * Section heading reveal
       */
      const headingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      headingTimeline
        .from("[data-category-eyebrow]", {
          y: 20,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .from(
          "[data-category-heading-line]",
          {
            yPercent: 110,
            rotate: 2,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .from(
          "[data-category-description]",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-category-header-line]",
          {
            scaleX: 0,
            duration: 0.9,
            transformOrigin: "left center",
            ease: "power3.inOut",
          },
          "-=0.55",
        );

      /*
       * Card entrance animations
       */
      cards.forEach((card, index) => {
        const imageWrapper = card.querySelector<HTMLElement>(
          "[data-image-wrapper]",
        );

        const image = card.querySelector<HTMLElement>("[data-category-image]");

        const content = card.querySelector<HTMLElement>(
          "[data-category-content]",
        );

        const number = card.querySelector<HTMLElement>(
          "[data-category-number]",
        );

        const divider = card.querySelector<HTMLElement>("[data-card-divider]");

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        cardTimeline
          .fromTo(
            imageWrapper,
            {
              clipPath: "inset(100% 0% 0% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.15,
              delay: index * 0.08,
              ease: "power4.inOut",
            },
          )
          .from(
            image,
            {
              scale: 1.22,
              duration: 1.4,
              ease: "power3.out",
            },
            "-=0.95",
          )
          .from(
            number,
            {
              y: -20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.75",
          )
          .from(
            content,
            {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.55",
          )
          .from(
            divider,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.75,
              ease: "power3.inOut",
            },
            "-=0.55",
          );

        /*
         * Subtle image parallax
         */
        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: -5,
            },
            {
              yPercent: 5,
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
      });

      /*
       * Desktop interactive card expansion
       */
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        cards.forEach((card) => {
          const image = card.querySelector<HTMLElement>(
            "[data-category-image]",
          );

          const title = card.querySelector<HTMLElement>(
            "[data-category-title]",
          );

          const description = card.querySelector<HTMLElement>(
            "[data-category-card-description]",
          );

          const arrow = card.querySelector<HTMLElement>(
            "[data-category-arrow]",
          );

          const handleMouseEnter = () => {
            cards.forEach((otherCard) => {
              gsap.to(otherCard, {
                flexGrow: otherCard === card ? 1.65 : 0.78,
                opacity: otherCard === card ? 1 : 0.62,
                duration: 0.65,
                ease: "power3.inOut",
                overwrite: "auto",
              });
            });

            gsap.to(image, {
              scale: 1.07,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(title, {
              y: -8,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(description, {
              y: -5,
              opacity: 1,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(arrow, {
              rotate: 45,
              scale: 1.08,
              backgroundColor: "#ff4b2b",
              borderColor: "#ff4b2b",
              duration: 0.4,
              ease: "back.out(1.8)",
              overwrite: "auto",
            });
          };

          const handleMouseLeave = () => {
            cards.forEach((otherCard) => {
              gsap.to(otherCard, {
                flexGrow: 1,
                opacity: 1,
                duration: 0.65,
                ease: "power3.inOut",
                overwrite: "auto",
              });
            });

            gsap.to(image, {
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(title, {
              y: 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(description, {
              y: 0,
              opacity: 0.72,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(arrow, {
              rotate: 0,
              scale: 1,
              backgroundColor: "rgba(255,255,255,0)",
              borderColor: "rgba(255,255,255,0.45)",
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        });
      });

      /*
       * Magnetic arrow buttons
       */
      const arrows = gsap.utils.toArray<HTMLElement>("[data-category-arrow]");

      arrows.forEach((arrow) => {
        const handleMouseMove = (event: MouseEvent) => {
          const bounds = arrow.getBoundingClientRect();

          const x = event.clientX - bounds.left - bounds.width / 2;

          const y = event.clientY - bounds.top - bounds.height / 2;

          gsap.to(arrow, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        };

        arrow.addEventListener("mousemove", handleMouseMove);
        arrow.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          arrow.removeEventListener("mousemove", handleMouseMove);
          arrow.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      return () => {
        media.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-page px-[4vw] py-28 text-ink max-md:px-5 max-md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section heading */}
        <header className="mb-14">
          <div className="mb-7 flex items-center justify-between gap-6">
            <p
              data-category-eyebrow
              className="flex items-center gap-3 text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-muted"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              Shop the edit
            </p>

            <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted md:block">
              Three worlds · One destination
            </p>
          </div>

          <div className="grid grid-cols-[1fr_360px] items-end gap-10 max-lg:grid-cols-1">
            <h2 className="max-w-[900px] overflow-hidden font-display text-[clamp(4.5rem,8vw,9rem)] uppercase leading-[0.78] tracking-[-0.045em]">
              <span className="block overflow-hidden">
                <span data-category-heading-line className="block">
                  Find your
                </span>
              </span>

              <span className="block overflow-hidden">
                <span data-category-heading-line className="block text-accent">
                  signature
                </span>
              </span>
            </h2>

            <p
              data-category-description
              className="max-w-[350px] justify-self-end pb-2 text-sm leading-7 text-muted max-lg:justify-self-start max-lg:pb-0"
            >
              Explore curated fashion across distinct categories, each shaped
              around individual expression and contemporary culture.
            </p>
          </div>

          <div
            data-category-header-line
            className="mt-12 h-px w-full bg-black/15"
          />
        </header>

        {/* Category gallery */}
        <div className="flex min-h-[720px] gap-4 max-lg:min-h-0 max-lg:flex-col max-md:gap-5">
          {categories.map((category) => (
            <article
              key={category.number}
              data-category-card
              className="group relative min-w-0 flex-1 overflow-hidden bg-[#171717] max-lg:min-h-[680px] max-md:min-h-[580px]"
            >
              <Link
                href={category.href}
                aria-label={`Shop ${category.title}`}
                className="absolute inset-0 z-10"
              />

              <div
                data-image-wrapper
                className="absolute inset-0 overflow-hidden"
              >
                <Image
                  data-category-image
                  src={category.image}
                  alt={`${category.title} fashion category`}
                  fill
                  priority={category.number === "01"}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover will-change-transform"
                  style={{
                    objectPosition: category.position,
                  }}
                />
              </div>

              {/* Image overlays */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.54)_35%,rgba(0,0,0,0.08)_72%)]" />

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.2),transparent_45%)]" />

              {/* Top information */}
              <div className="absolute left-0 right-0 top-0 z-[3] flex items-start justify-between p-7 text-white max-md:p-5">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-white/65">
                  StyleHub / Category
                </p>

                <span
                  data-category-number
                  className="font-display text-5xl leading-none text-white/80"
                >
                  {category.number}
                </span>
              </div>

              {/* Bottom content */}
              <div
                data-category-content
                className="absolute bottom-0 left-0 right-0 z-[3] p-8 text-white max-md:p-6"
              >
                <p className="mb-4 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-white/55">
                  Explore collection
                </p>

                <h3
                  data-category-title
                  className="font-display text-[clamp(4.5rem,7vw,8rem)] uppercase leading-[0.76] tracking-[-0.045em]"
                >
                  {category.title}
                </h3>

                <div
                  data-card-divider
                  className="my-6 h-px w-full bg-white/25"
                />

                <div className="flex items-end justify-between gap-6">
                  <p
                    data-category-card-description
                    className="max-w-[330px] text-sm leading-7 text-white/70"
                  >
                    {category.subtitle}
                  </p>

                  <div
                    data-category-arrow
                    className="relative z-20 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/45 text-white will-change-transform"
                  >
                    <ArrowUpRight size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Vertical edge label */}
              <p className="absolute right-5 top-1/2 z-[3] hidden -translate-y-1/2 rotate-90 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-white/35 xl:block">
                Curated for individuality
              </p>
            </article>
          ))}
        </div>

        {/* Bottom editorial detail */}
        <div className="mt-8 flex items-center gap-5">
          <p className="shrink-0 text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-muted">
            Style starts here
          </p>

          <div className="h-px flex-1 bg-black/15" />

          <p className="shrink-0 text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-muted">
            01 — 03
          </p>
        </div>
      </div>
    </section>
  );
}
