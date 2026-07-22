"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const benefits = [
  "Create your own storefront",
  "Manage products and orders",
  "Reach fashion-focused buyers",
  "Track sales from one dashboard",
];

export default function SellerCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;

      if (!section || !image) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from("[data-seller-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-seller-heading]",
          {
            y: 110,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-seller-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-seller-benefit]",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          "[data-seller-button]",
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          image,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.12,
            duration: 1.3,
            ease: "power4.out",
          },
          "-=1.1",
        );

      gsap.fromTo(
        image.querySelector("[data-seller-image]"),
        {
          yPercent: -6,
          scale: 1.08,
        },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      ScrollTrigger.refresh();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-accent px-[4vw] py-28 text-white max-md:px-5 max-md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-white/10"
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-[0.9fr_1.1fr] items-center gap-16 max-lg:grid-cols-1">
        <div>
          <p
            data-seller-label
            className="mb-5 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white/65"
          >
            Sell on StyleHub
          </p>

          <h2
            data-seller-heading
            className="font-display text-[clamp(4.8rem,9vw,10rem)] uppercase leading-[0.78] tracking-[-0.045em]"
          >
            Turn your
            <span className="block text-black">brand into</span>
            the next
            <span className="block text-black">big thing.</span>
          </h2>

          <p
            data-seller-description
            className="mt-8 max-w-[560px] text-sm leading-7 text-white/75"
          >
            Join a marketplace built for independent labels, emerging designers
            and local fashion stores. Create your storefront, upload products
            and start reaching new customers.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 max-sm:grid-cols-1">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                data-seller-benefit
                className="flex items-center gap-3"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-accent">
                  <Check size={15} strokeWidth={2.2} />
                </span>

                <span className="text-sm font-semibold text-white/90">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <Link
            data-seller-button
            href="/seller/register"
            className="group mt-10 inline-flex min-h-16 items-center gap-6 rounded-full bg-black py-2 pl-7 pr-2 text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:-translate-y-1"
          >
            Start selling
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={20} strokeWidth={1.7} />
            </span>
          </Link>
        </div>

        <div className="relative min-h-[720px] max-lg:min-h-[650px] max-md:min-h-[520px]">
          <div
            ref={imageRef}
            className="absolute inset-0 overflow-hidden bg-black will-change-transform"
          >
            <Image
              data-seller-image
              src="/images/seller-cta.png"
              alt="Independent fashion seller preparing clothing products"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover will-change-transform"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-8 max-md:p-5">
              <div>
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/55">
                  Seller spotlight
                </p>

                <h3 className="mt-2 font-display text-5xl uppercase leading-none">
                  Build your audience
                </h3>
              </div>

              <ArrowUpRight size={30} strokeWidth={1.3} />
            </div>
          </div>

          <div className="absolute -left-10 top-12 z-10 rounded-2xl bg-white p-5 text-black shadow-2xl max-md:-left-2 max-md:top-6">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-black/50">
              Active sellers
            </p>

            <strong className="mt-2 block font-display text-5xl font-normal">
              320+
            </strong>
          </div>

          <div className="absolute -bottom-8 right-10 z-10 rounded-2xl bg-black p-5 text-white shadow-2xl max-md:bottom-[-20px] max-md:right-2">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-white/50">
              Monthly buyers
            </p>

            <strong className="mt-2 block font-display text-5xl font-normal text-accent">
              42K+
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
