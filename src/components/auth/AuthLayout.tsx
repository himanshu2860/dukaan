"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(useGSAP);

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  highlightedTitle: string;
  description: string;
};

export default function AuthLayout({
  children,
  title,
  highlightedTitle,
  description,
}: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from("[data-auth-visual]", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.3,
        })
        .from(
          imageRef.current,
          {
            scale: 1.18,
            duration: 1.5,
          },
          "-=1",
        )
        .from(
          "[data-auth-heading-line]",
          {
            yPercent: 120,
            rotate: 3,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.8",
        )
        .from(
          "[data-auth-description]",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          "[data-auth-form]",
          {
            x: 60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.8",
        )
        .from(
          "[data-auth-field]",
          {
            y: 25,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.55",
        );

      const visual =
        containerRef.current?.querySelector<HTMLElement>("[data-auth-visual]");

      if (!visual || !imageRef.current) return;

      const moveX = gsap.quickTo(imageRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(imageRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = visual.getBoundingClientRect();

        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveX(x * 24);
        moveY(y * 18);
      };

      const handlePointerLeave = () => {
        moveX(0);
        moveY(0);
      };

      visual.addEventListener("pointermove", handlePointerMove);
      visual.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        visual.removeEventListener("pointermove", handlePointerMove);
        visual.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#101010] text-white lg:grid lg:grid-cols-[1.05fr_0.95fr]"
    >
      {/* Visual side */}
      <section
        data-auth-visual
        className="relative hidden min-h-screen overflow-hidden lg:block"
      >
        <Image
          ref={imageRef}
          src="/images/hero-fashion.png"
          alt="StyleHub fashion"
          fill
          priority
          sizes="55vw"
          className="scale-[1.05] object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

        <Link
          href="/"
          className="absolute left-10 top-10 z-20 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to home
        </Link>

        <div className="absolute bottom-14 left-10 right-10 z-20">
          <p className="mb-6 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-white/60">
            StyleHub Membership
          </p>

          <h1 className="font-display text-[clamp(5rem,8vw,9rem)] uppercase leading-[0.75] tracking-[-0.04em]">
            <span className="block overflow-hidden">
              <span data-auth-heading-line className="block">
                {title}
              </span>
            </span>

            <span className="block overflow-hidden">
              <span data-auth-heading-line className="block text-[#ff4b2b]">
                {highlightedTitle}
              </span>
            </span>
          </h1>

          <p
            data-auth-description
            className="mt-7 max-w-md text-sm leading-7 text-white/65"
          >
            {description}
          </p>
        </div>

        <p className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 font-display text-[13rem] leading-none text-white/[0.05]">
          01
        </p>
      </section>

      {/* Form side */}
      <section className="relative flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5 py-16 text-[#111111] sm:px-10 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.035)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <Link
          href="/"
          className="absolute left-5 top-6 z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-black/55 lg:hidden"
        >
          <ArrowLeft size={17} />
          Home
        </Link>

        <div data-auth-form className="relative z-10 w-full max-w-[520px]">
          {children}
        </div>
      </section>
    </div>
  );
}
