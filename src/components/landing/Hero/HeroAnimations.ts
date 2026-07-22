"use client";

import type { MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { HeroAnimationRefs, MagneticLinkProps } from "./types";

gsap.registerPlugin(useGSAP);

export function useHeroAnimations({
  sectionRef,
  spotlightRef,
  backgroundTextRef,
  eyebrowRef,
  headingRefs,
  descriptionRef,
  buttonRefs,
  mainImageRef,
  secondaryImageRef,
  cardRefs,
  bottomBarRef,
}: HeroAnimationRefs): MagneticLinkProps {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const mainImage = mainImageRef.current;
      const secondaryImage = secondaryImageRef.current;

      if (!section || !mainImage || !secondaryImage) return;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from(eyebrowRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          headingRefs.current,
          {
            yPercent: 120,
            rotate: 2,
            duration: 1.1,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          mainImage,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.12,
            duration: 1.4,
          },
          "-=0.9",
        )
        .from(
          secondaryImage,
          {
            x: 70,
            opacity: 0,
            rotate: 8,
            duration: 1,
          },
          "-=0.9",
        )
        .from(
          descriptionRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6",
        )
        .from(
          buttonRefs.current,
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.45",
        )
        .from(
          cardRefs.current,
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5",
        )
        .from(
          bottomBarRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        );

      const floatingAnimations: gsap.core.Tween[] = [];

      if (cardRefs.current[0]) {
        floatingAnimations.push(
          gsap.to(cardRefs.current[0], {
            y: -10,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      }

      if (cardRefs.current[1]) {
        floatingAnimations.push(
          gsap.to(cardRefs.current[1], {
            y: 10,
            duration: 2.9,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      }

      if (cardRefs.current[2]) {
        floatingAnimations.push(
          gsap.to(cardRefs.current[2], {
            y: -8,
            rotate: 2,
            duration: 2.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      }

      const moveSpotlight = gsap.quickTo(spotlightRef.current, "x", {
        duration: 0.45,
        ease: "power3.out",
      });

      const moveSpotlightY = gsap.quickTo(spotlightRef.current, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        moveSpotlight(x);
        moveSpotlightY(y);

        const normalizedX = x / bounds.width - 0.5;
        const normalizedY = y / bounds.height - 0.5;

        gsap.to(mainImage, {
          x: normalizedX * 16,
          y: normalizedY * 12,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(secondaryImage, {
          x: normalizedX * -22,
          y: normalizedY * -16,
          rotate: normalizedX * -4,
          duration: 1.25,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(backgroundTextRef.current, {
          x: normalizedX * -30,
          y: normalizedY * -14,
          duration: 1.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        gsap.to([mainImage, secondaryImage], {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(backgroundTextRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      };

      section.addEventListener("pointermove", handlePointerMove);
      section.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);

        floatingAnimations.forEach((animation) => animation.kill());
      };
    },
    {
      scope: sectionRef,
    },
  );

  const handleMagneticMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();

    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(button, {
      x: x * 0.17,
      y: y * 0.17,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMagneticLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  };

  return {
    onMouseMove: handleMagneticMove,
    onMouseLeave: handleMagneticLeave,
  };
}
