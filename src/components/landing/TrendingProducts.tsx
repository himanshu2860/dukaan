"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, ShoppingBag, Star } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
  {
    id: 1,
    brand: "Undefined",
    name: "Oversized Utility Jacket",
    price: "₹4,999",
    oldPrice: "₹6,499",
    image: "/images/product-jacket.png",
    category: "Streetwear",
    rating: "4.8",
    badge: "Best Seller",
    href: "/products/oversized-utility-jacket",
  },
  {
    id: 2,
    brand: "Maison Nine",
    name: "Relaxed Tailored Trousers",
    price: "₹3,499",
    oldPrice: "₹4,299",
    image: "/images/product-trousers.png",
    category: "Minimal",
    rating: "4.7",
    badge: "New",
    href: "/products/relaxed-tailored-trousers",
  },
  {
    id: 3,
    brand: "North Archive",
    name: "Textured Knit Polo",
    price: "₹2,899",
    oldPrice: "₹3,699",
    image: "/images/product-polo.png",
    category: "Essentials",
    rating: "4.9",
    badge: "Trending",
    href: "/products/textured-knit-polo",
  },
  {
    id: 4,
    brand: "Form Studio",
    name: "Structured Leather Bag",
    price: "₹5,999",
    oldPrice: "₹7,499",
    image: "/images/product-bag.png",
    category: "Accessories",
    rating: "4.8",
    badge: "Limited",
    href: "/products/structured-leather-bag",
  },
];

export default function TrendingProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-product-card]");

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      introTimeline
        .from("[data-products-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-products-heading]",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-products-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-products-link]",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.5",
        );

      cards.forEach((card, index) => {
        const image = card.querySelector<HTMLElement>("[data-product-image]");
        const details = card.querySelector<HTMLElement>(
          "[data-product-details]",
        );

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.08,
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

        if (details) {
          gsap.from(details, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 76%",
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

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-page px-[4vw] py-28 text-ink max-md:px-5 max-md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-14 grid grid-cols-[1fr_380px] items-end gap-10 max-lg:grid-cols-1">
          <div>
            <p
              data-products-label
              className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-muted"
            >
              Most wanted
            </p>

            <h2
              data-products-heading
              className="max-w-[900px] font-display text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em]"
            >
              Trending
              <span className="ml-4 text-accent max-sm:ml-0 max-sm:block">
                now
              </span>
            </h2>
          </div>

          <div className="justify-self-end max-lg:justify-self-start">
            <p
              data-products-description
              className="max-w-[370px] text-sm leading-7 text-muted"
            >
              Discover the pieces customers are saving, sharing and adding to
              their wardrobes right now.
            </p>

            <Link
              data-products-link
              href="/products"
              className="group mt-6 inline-flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.16em]"
            >
              View all products
              <span className="grid h-9 w-9 place-items-center rounded-full border border-black/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight size={17} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-x-5 gap-y-12 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product, index) => (
            <article
              key={product.id}
              data-product-card
              className={`group ${index % 2 === 1 ? "xl:mt-14" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e4dc]">
                <Link
                  href={product.href}
                  aria-label={`View ${product.name}`}
                  className="absolute inset-0 z-[1]"
                />

                <Image
                  data-product-image
                  src={"/images/hero-fashion-2.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-x-0 top-0 z-[2] flex items-start justify-between p-4">
                  <span className="rounded-full bg-white/90 px-3 py-2 text-[0.58rem] font-extrabold uppercase tracking-[0.13em] text-ink backdrop-blur-md">
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    aria-label={`Save ${product.name}`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-md transition-all duration-300 hover:bg-ink hover:text-white"
                  >
                    <Heart size={18} strokeWidth={1.6} />
                  </button>
                </div>

                <div className="absolute inset-x-4 bottom-4 z-[3] translate-y-24 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    className="flex min-h-14 w-full items-center justify-center gap-3 bg-ink px-5 text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-accent"
                  >
                    <ShoppingBag size={17} strokeWidth={1.7} />
                    Add to cart
                  </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div data-product-details className="pt-5">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                    {product.brand}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Star
                      size={13}
                      fill="currentColor"
                      strokeWidth={1.4}
                      className="text-accent"
                    />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <Link href={product.href}>
                  <h3 className="text-base font-semibold leading-6 transition-colors duration-300 hover:text-accent">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-1 text-xs text-muted">{product.category}</p>

                <div className="mt-4 flex items-center gap-3">
                  <strong className="text-sm font-extrabold">
                    {product.price}
                  </strong>

                  <span className="text-xs text-muted line-through">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
