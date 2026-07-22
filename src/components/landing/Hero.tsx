"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-heading h1",
          {
            yPercent: 120,
            rotate: 2,
            duration: 1.1,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          mainImageRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.12,
            duration: 1.4,
          },
          "-=0.9",
        )
        .from(
          secondImageRef.current,
          {
            x: 70,
            opacity: 0,
            rotate: 8,
            duration: 1,
          },
          "-=0.9",
        )
        .from(
          ".hero-description",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6",
        )
        .from(
          ".hero-button",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.45",
        )
        .from(
          ".hero-card",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5",
        )
        .from(
          ".hero-bottom-bar",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        );

      gsap.to(".hero-rating-card", {
        y: -10,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-products-card", {
        y: 10,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-drop-card", {
        y: -8,
        rotate: 2,
        duration: 2.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const section = sectionRef.current;

      if (!section) return;

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        gsap.to(spotlightRef.current, {
          x,
          y,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });

        const normalizedX = x / bounds.width - 0.5;
        const normalizedY = y / bounds.height - 0.5;

        gsap.to(mainImageRef.current, {
          x: normalizedX * 16,
          y: normalizedY * 12,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(secondImageRef.current, {
          x: normalizedX * -22,
          y: normalizedY * -16,
          rotate: normalizedX * -4,
          duration: 1.25,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(".hero-background-text", {
          x: normalizedX * -30,
          y: normalizedY * -14,
          duration: 1.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        gsap.to([mainImageRef.current, secondImageRef.current], {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
        });
      };

      section.addEventListener("pointermove", handlePointerMove);
      section.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    {
      scope: sectionRef,
    },
  );

  const handleMagneticMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();

    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(button, {
      x: x * 0.17,
      y: y * 0.17,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <section ref={sectionRef} className="hero">
      <div ref={spotlightRef} className="hero-spotlight" />

      <div className="hero-noise" />

      <p className="hero-background-text" aria-hidden="true">
        FASHION FASHION FASHION
      </p>

      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />

            <p>Independent fashion marketplace</p>
          </div>

          <div className="hero-heading">
            <div className="hero-heading-line">
              <h1>STYLE</h1>
            </div>

            <div className="hero-heading-line">
              <h1>DOESN&apos;T LIVE</h1>
            </div>

            <div className="hero-heading-line">
              <h1>
                IN <span>ONE STORE.</span>
              </h1>
            </div>
          </div>

          <div className="hero-copy-footer">
            <p className="hero-description">
              Discover remarkable pieces from local stores, independent
              designers and emerging clothing brands in one curated marketplace.
            </p>

            <div className="hero-actions">
              <Link
                href="/products"
                className="hero-button hero-button-dark"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <span>Explore collection</span>

                <span className="hero-button-icon">
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </span>
              </Link>

              <Link
                href="/seller/register"
                className="hero-button hero-button-light"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <span>Open your store</span>

                <span className="hero-button-icon">
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div ref={mainImageRef} className="hero-main-image">
            <Image
              src="/images/hero-fashion.png"
              alt="Female fashion model wearing a modern outfit"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 45vw"
              className="hero-image hero-main-photo"
            />

            <div className="hero-image-overlay" />

            <div className="hero-image-caption">
              <div>
                <span>Featured collection</span>
                <p>Undefined / Edition 01</p>
              </div>

              <ArrowUpRight size={27} strokeWidth={1.3} />
            </div>

            <p className="hero-vertical-title">UNDEFINED</p>
          </div>

          <div ref={secondImageRef} className="hero-secondary-image">
            <Image
              src="/images/hero-fashion-2.png"
              alt="Male fashion model wearing a modern outfit"
              fill
              sizes="(max-width: 900px) 40vw, 16vw"
              className="hero-image hero-secondary-photo"
            />

            <span>02</span>
          </div>

          <div className="hero-card hero-rating-card">
            <div className="hero-stars">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>

            <strong>4.9</strong>
            <p>Trusted marketplace</p>
          </div>

          <div className="hero-card hero-products-card">
            <span>Live now</span>
            <strong>4,500+</strong>
            <p>Curated products</p>
          </div>

          <div className="hero-card hero-drop-card">
            <span className="hero-live-dot" />

            <div>
              <strong>Just dropped</strong>
              <p>Summer collection</p>
            </div>
          </div>

          <div className="hero-cities">
            <span>Delhi</span>
            <span>Mumbai</span>
            <span>Chandigarh</span>
            <span>Shimla</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <div className="hero-scroll-text">
          <ArrowDown size={16} strokeWidth={1.7} />
          <span>Scroll to explore</span>
        </div>

        <div className="hero-bottom-line" />

        <div className="hero-next">
          <span>Next</span>
          <p>Featured categories</p>
        </div>
      </div>
    </section>
  );
}
