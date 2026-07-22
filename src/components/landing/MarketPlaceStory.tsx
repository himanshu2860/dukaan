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
    season: "Summer 2026",
    title: "Minimal Essentials",
    description:
      "Clean silhouettes, soft neutrals and everyday pieces from independent labels.",
    image: "/images/collection-minimal.png",
    href: "/products?collection=minimal",
  },
  {
    number: "02",
    season: "New Drop",
    title: "Street Uniform",
    description:
      "Oversized layers, utility details and bold streetwear selected for the new season.",
    image: "/images/collection-street.png",
    href: "/products?collection=streetwear",
  },
];

export default function MarketplaceStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".collection-card");

      cards.forEach((card) => {
        const image = card.querySelector(".collection-image");
        const content = card.querySelector(".collection-content");

        gsap.from(image, {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
          },
        });

        gsap.from(content, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 72%",
          },
        });

        gsap.to(image, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section ref={sectionRef} className="collections-section">
      <div className="collections-intro">
        <p>Curated edits</p>

        <h2>
          COLLECTIONS
          <span> WORTH DISCOVERING</span>
        </h2>
      </div>

      <div className="collections-list">
        {collections.map((collection, index) => (
          <article
            key={collection.title}
            className={`collection-card ${
              index % 2 !== 0 ? "collection-card-reverse" : ""
            }`}
          >
            <div className="collection-image-wrapper">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className="collection-image"
              />

              <span className="collection-number">{collection.number}</span>
            </div>

            <div className="collection-content">
              <p className="collection-season">{collection.season}</p>

              <h3>{collection.title}</h3>

              <p className="collection-description">{collection.description}</p>

              <Link href={collection.href} className="collection-link">
                <span>Discover collection</span>

                <span className="collection-link-icon">
                  <ArrowUpRight size={20} strokeWidth={1.6} />
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
