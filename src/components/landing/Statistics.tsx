"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statistics = [
  {
    value: 4500,
    suffix: "+",
    label: "Curated products",
    description: "Fashion pieces available across independent stores.",
  },
  {
    value: 320,
    suffix: "+",
    label: "Active sellers",
    description: "Independent labels and local stores growing on StyleHub.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Customer satisfaction",
    description: "Positive experiences across purchases and seller support.",
  },
  {
    value: 120,
    suffix: "K+",
    label: "Orders completed",
    description: "Products discovered, purchased and delivered to customers.",
  },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-stat-card]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from("[data-stat-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-stat-heading]",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-stat-description]",
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
            y: 70,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35",
        );

      cards.forEach((card) => {
        const number = card.querySelector<HTMLElement>("[data-stat-number]");

        if (!number) return;

        const value = Number(number.dataset.value ?? 0);

        const counter = {
          value: 0,
        };

        gsap.to(counter, {
          value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            number.textContent = Math.floor(counter.value).toLocaleString(
              "en-IN",
            );
          },
        });
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
        <header className="mb-16 grid grid-cols-[1fr_380px] items-end gap-10 max-lg:grid-cols-1">
          <div>
            <p
              data-stat-label
              className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-muted"
            >
              Growing together
            </p>

            <h2
              data-stat-heading
              className="max-w-[1000px] font-display text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em]"
            >
              Built for
              <span className="ml-4 text-accent max-sm:ml-0 max-sm:block">
                fashion
              </span>
            </h2>
          </div>

          <p
            data-stat-description
            className="max-w-[370px] justify-self-end text-sm leading-7 text-muted max-lg:justify-self-start"
          >
            A growing marketplace connecting fashion-focused customers with
            independent stores, emerging labels and modern designers.
          </p>
        </header>

        <div className="grid grid-cols-4 border-l border-t border-black/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {statistics.map((stat, index) => (
            <article
              key={stat.label}
              data-stat-card
              className={`group relative min-h-[380px] overflow-hidden border-b border-r border-black/10 p-8 transition-colors duration-500 hover:bg-ink hover:text-white max-md:min-h-[320px] max-md:p-6 ${
                index % 2 === 1 ? "lg:translate-y-12" : ""
              }`}
            >
              <span className="absolute right-6 top-5 font-display text-6xl leading-none text-black/[0.05] transition-colors duration-500 group-hover:text-white/[0.07]">
                0{index + 1}
              </span>

              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-white/45">
                    StyleHub in numbers
                  </p>

                  <div className="mt-8 flex items-start gap-1">
                    <strong
                      data-stat-number
                      data-value={stat.value}
                      className="font-display text-[clamp(5rem,8vw,9rem)] font-normal leading-[0.78] tracking-[-0.04em]"
                    >
                      0
                    </strong>

                    <span className="pt-2 font-display text-[clamp(2.2rem,4vw,4rem)] leading-none text-accent">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-6 h-px w-full bg-black/10 transition-colors duration-500 group-hover:bg-white/15" />

                  <h3 className="font-display text-4xl uppercase leading-none tracking-[-0.03em]">
                    {stat.label}
                  </h3>

                  <p className="mt-4 max-w-[290px] text-sm leading-7 text-muted transition-colors duration-500 group-hover:text-white/55">
                    {stat.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
