"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const words = [
  "PREMIUM",
  "STREETWEAR",
  "LUXURY",
  "DESIGNER",
  "VINTAGE",
  "HANDCRAFTED",
];

export default function FashionMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;

      if (!track) return;

      const animation = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      const handleMouseEnter = () => {
        gsap.to(animation, {
          timeScale: 0.35,
          duration: 0.5,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(animation, {
          timeScale: 1,
          duration: 0.5,
        });
      };

      const section = sectionRef.current;

      section?.addEventListener("mouseenter", handleMouseEnter);
      section?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section?.removeEventListener("mouseenter", handleMouseEnter);
        section?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    {
      scope: sectionRef,
    },
  );

  const marqueeContent = [...words, ...words];

  return (
    <section ref={sectionRef} className="fashion-marquee">
      <div ref={trackRef} className="fashion-marquee-track">
        {marqueeContent.map((word, index) => (
          <div className="fashion-marquee-item" key={`${word}-${index}`}>
            <span>{word}</span>
            <span className="fashion-marquee-dot" />
          </div>
        ))}
      </div>
    </section>
  );
}
