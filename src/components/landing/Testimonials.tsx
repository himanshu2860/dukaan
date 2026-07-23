"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Customer",
    location: "Delhi",
    image: "/images/testimonial-aarav.png",
    quote:
      "StyleHub helped me discover independent brands I would never have found on traditional shopping platforms. The whole experience feels curated and premium.",
    rating: 5,
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Store Owner",
    location: "Mumbai",
    image: "/images/testimonial-riya.png",
    quote:
      "Listing my products was simple, and the dashboard makes it easy to manage orders and track sales. StyleHub gives smaller labels a real place to grow.",
    rating: 5,
  },
  {
    id: 3,
    name: "Kabir Sharma",
    role: "Customer",
    location: "Chandigarh",
    image: "/images/testimonial-kabir.png",
    quote:
      "The product selection feels different from regular marketplaces. I like that every store has its own identity while still being part of one platform.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from("[data-testimonial-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-testimonial-heading]",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-testimonial-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          cards,
          {
            y: 80,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.35",
        );

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>(
          "[data-testimonial-image]",
        );

        if (!image) return;

        gsap.from(image, {
          scale: 1.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
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

    const rotateY = (x / bounds.width - 0.5) * 4;
    const rotateX = (0.5 - y / bounds.height) * 4;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -8,
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
              data-testimonial-label
              className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white/45"
            >
              Community stories
            </p>

            <h2
              data-testimonial-heading
              className="max-w-[1000px] font-display text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em]"
            >
              Loved by
              <span className="ml-4 text-accent max-sm:ml-0 max-sm:block">
                many
              </span>
            </h2>
          </div>

          <p
            data-testimonial-description
            className="max-w-[370px] justify-self-end text-sm leading-7 text-white/55 max-lg:justify-self-start"
          >
            Customers and independent sellers share how StyleHub helps them
            discover, sell and grow through fashion.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              data-testimonial-card
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className={`group relative flex min-h-[560px] flex-col overflow-hidden border border-white/10 bg-white/[0.04] p-7 will-change-transform ${
                index === 1 ? "lg:mt-14" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <Quote size={42} strokeWidth={1.2} className="text-accent" />

                <div className="flex gap-1 text-accent">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.3}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="mt-12 flex-1 font-display text-[clamp(2.5rem,4vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.03em] text-white/95">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-800">
                    <Image
                      data-testimonial-image
                      src={"/images/hero-fashion-2.png"}
                      alt={testimonial.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.08em]">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/45">
                      {testimonial.role} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>

              <span className="pointer-events-none absolute -bottom-10 -right-2 font-display text-[11rem] leading-none text-white/[0.025]">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
