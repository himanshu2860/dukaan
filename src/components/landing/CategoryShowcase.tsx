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
    subtitle: "Modern silhouettes",
    image: "/images/category-women.png",
    href: "/products?category=women",
  },
  {
    number: "02",
    title: "Men",
    subtitle: "Street and essentials",
    image: "/images/category-men.png",
    href: "/products?category=men",
  },
  {
    number: "03",
    title: "Accessories",
    subtitle: "Details that define",
    image: "/images/category-accessories.png",
    href: "/products?category=accessories",
  },
];

export default function CategoryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".category-heading-line", {
        yPercent: 110,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".category-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".category-grid",
          start: "top 78%",
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section ref={sectionRef} className="category-section">
      <div className="category-header">
        <div>
          <p className="category-eyebrow">Explore the marketplace</p>

          <div className="category-title">
            <div className="category-title-mask">
              <h2 className="category-heading-line">SHOP BY</h2>
            </div>

            <div className="category-title-mask">
              <h2 className="category-heading-line category-heading-offset">
                CATEGORY
              </h2>
            </div>
          </div>
        </div>

        <p className="category-introduction">
          Discover clothing, accessories and independent labels selected from
          stores across the country.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="category-card"
          >
            <div className="category-image-wrapper">
              <Image
                src={category.image}
                alt={`${category.title} fashion category`}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className="category-image"
              />

              <div className="category-image-overlay" />

              <span className="category-number">{category.number}</span>

              <span className="category-arrow">
                <ArrowUpRight size={21} strokeWidth={1.6} />
              </span>
            </div>

            <div className="category-card-content">
              <div>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
              </div>

              <span>Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
