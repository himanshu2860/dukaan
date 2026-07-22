import type { AnchorHTMLAttributes, MutableRefObject, RefObject } from "react";

export type ElementRef<T extends HTMLElement> = RefObject<T | null>;

export type ElementListRef<T extends HTMLElement> = MutableRefObject<T[]>;

export type MagneticLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onMouseMove" | "onMouseLeave"
>;

export type HeroContentProps = {
  eyebrowRef: ElementRef<HTMLDivElement>;
  headingRefs: ElementListRef<HTMLHeadingElement>;
  descriptionRef: ElementRef<HTMLParagraphElement>;
  buttonRefs: ElementListRef<HTMLAnchorElement>;
  magneticHandlers: MagneticLinkProps;
};

export type HeroVisualProps = {
  mainImageRef: ElementRef<HTMLDivElement>;
  secondaryImageRef: ElementRef<HTMLDivElement>;
  cardRefs: ElementListRef<HTMLDivElement>;
};

export type HeroBottomProps = {
  bottomBarRef: ElementRef<HTMLDivElement>;
};

export type HeroAnimationRefs = {
  sectionRef: ElementRef<HTMLElement>;
  spotlightRef: ElementRef<HTMLDivElement>;
  backgroundTextRef: ElementRef<HTMLParagraphElement>;
  eyebrowRef: ElementRef<HTMLDivElement>;
  headingRefs: ElementListRef<HTMLHeadingElement>;
  descriptionRef: ElementRef<HTMLParagraphElement>;
  buttonRefs: ElementListRef<HTMLAnchorElement>;
  mainImageRef: ElementRef<HTMLDivElement>;
  secondaryImageRef: ElementRef<HTMLDivElement>;
  cardRefs: ElementListRef<HTMLDivElement>;
  bottomBarRef: ElementRef<HTMLDivElement>;
};
