"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package, Star } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stores = [
  {
    id: 1,
    name: "Urban Republic",
    category: "Streetwear",
    description:
      "Oversized silhouettes, utility pieces and everyday street essentials.",
    rating: "4.9",
    products: 482,
    banner: "/images/store-urban.png",
    logo: "UR",
    href: "/shops/urban-republic",
    accent: "#FF4B2B",
  },
  {
    id: 2,
    name: "Maison Nine",
    category: "Minimal",
    description:
      "Refined basics, modern tailoring and neutral pieces designed to last.",
    rating: "4.8",
    products: 213,
    banner: "/images/store-maison.png",
    logo: "M9",
    href: "/shops/maison-nine",
    accent: "#111111",
  },
  {
    id: 3,
    name: "Noir Studio",
    category: "Modern Luxury",
    description:
      "Sharp tailoring, premium materials and statement pieces for modern wardrobes.",
    rating: "4.9",
    products: 157,
    banner: "/images/store-noir.png",
    logo: "NS",
    href: "/shops/noir-studio",
    accent: "#7B0F12",
  },
];

export default function FeaturedStores() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-store-card]");

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      introTimeline
        .from("[data-stores-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-stores-heading]",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-stores-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-stores-link]",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.5",
        );

      cards.forEach((card, index) => {
        const image = card.querySelector<HTMLElement>("[data-store-image]");
        const logo = card.querySelector<HTMLElement>("[data-store-logo]");
        const content = card.querySelector<HTMLElement>("[data-store-content]");

        gsap.from(card, {
          y: 90,
          opacity: 0,
          duration: 0.95,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        if (image) {
          gsap.from(image, {
            scale: 1.12,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (logo) {
          gsap.from(logo, {
            scale: 0.7,
            opacity: 0,
            rotate: -8,
            duration: 0.8,
            delay: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (content) {
          gsap.from(content, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 74%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      ScrollTrigger.refresh();
    },
    {
      scope: sectionRef,
    },
  );

  const handleCardMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const rotateY = (x / bounds.width - 0.5) * 5;
    const rotateX = (0.5 - y / bounds.height) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -10,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardLeave = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#111111] px-[4vw] py-28 text-white max-md:px-5 max-md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-16 grid grid-cols-[1fr_380px] items-end gap-10 max-lg:grid-cols-1">
          <div>
            <p
              data-stores-label
              className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white/45"
            >
              Independent labels
            </p>

            <h2
              data-stores-heading
              className="max-w-[950px] font-display text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em]"
            >
              Featured
              <span className="ml-4 text-accent max-sm:ml-0 max-sm:block">
                stores
              </span>
            </h2>
          </div>

          <div className="justify-self-end max-lg:justify-self-start">
            <p
              data-stores-description
              className="max-w-[370px] text-sm leading-7 text-white/55"
            >
              Discover independent brands shaping modern fashion through
              original design, thoughtful production and distinctive style.
            </p>

            <Link
              data-stores-link
              href="/shops"
              className="group mt-6 inline-flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.16em]"
            >
              Explore all stores
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={17} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {stores.map((store, index) => (
            <article
              key={store.id}
              data-store-card
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className={`group relative overflow-hidden border border-white/10 bg-white/[0.04] will-change-transform ${
                index === 1 ? "lg:mt-16" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <Image
                  data-store-image
                  src={store.banner}
                  alt={`${store.name} store`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <span className="rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                    {store.category}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-black">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-accent"
                    />
                    {store.rating}
                  </span>
                </div>

                <div
                  data-store-logo
                  className="absolute bottom-[-34px] left-6 z-10 grid h-[72px] w-[72px] place-items-center border-4 border-[#111111] font-display text-3xl uppercase text-white shadow-xl"
                  style={{
                    backgroundColor: store.accent,
                  }}
                >
                  {store.logo}
                </div>
              </div>

              <div data-store-content className="px-6 pb-7 pt-14">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-2 text-[0.6rem] font-extrabold uppercase tracking-[0.17em] text-white/40">
                      Verified seller
                    </p>

                    <h3 className="font-display text-[clamp(2.8rem,4vw,4.6rem)] uppercase leading-[0.82] tracking-[-0.035em]">
                      {store.name}
                    </h3>
                  </div>

                  <Link
                    href={store.href}
                    aria-label={`Visit ${store.name}`}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent"
                  >
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </Link>
                </div>

                <p className="mt-5 max-w-[380px] text-sm leading-7 text-white/50">
                  {store.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2 text-white/55">
                    <Package size={16} strokeWidth={1.6} />

                    <span className="text-xs font-semibold">
                      {store.products} products
                    </span>
                  </div>

                  <Link
                    href={store.href}
                    className="text-[0.62rem] font-extrabold uppercase tracking-[0.15em] text-white/70 transition-colors duration-300 hover:text-accent"
                  >
                    Visit store
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
