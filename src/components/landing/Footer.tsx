"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FormEvent, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const shopLinks = [
  { label: "New In", href: "/products" },
  { label: "Men", href: "/products?category=men" },
  { label: "Women", href: "/products?category=women" },
  { label: "Accessories", href: "/products?category=accessories" },
  { label: "Stores", href: "/shops" },
];

const companyLinks = [
  { label: "About StyleHub", href: "/about" },
  { label: "Become a Seller", href: "/seller/register" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Help Centre", href: "/help" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
];
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(
    () => {
      const footer = footerRef.current;

      if (!footer) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from("[data-footer-label]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-footer-heading]",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          "[data-footer-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          "[data-footer-form]",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          "[data-footer-column]",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          "[data-footer-bottom]",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25",
        );

      ScrollTrigger.refresh();
    },
    {
      scope: footerRef,
    },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedEmail = email.trim();

    if (!cleanedEmail) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("You’re on the list.");
    setEmail("");
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0b0b0b] px-[4vw] pb-8 pt-28 text-white max-md:px-5 max-md:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[-120px] h-[520px] w-[520px] rounded-full border border-white/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[-10px] h-[320px] w-[320px] rounded-full border border-white/5"
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-16 border-b border-white/10 pb-20 max-lg:grid-cols-1 max-md:pb-14">
          <div>
            <p
              data-footer-label
              className="mb-5 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white/45"
            >
              Stay in the loop
            </p>

            <h2
              data-footer-heading
              className="max-w-[900px] font-display text-[clamp(4.8rem,9vw,10rem)] uppercase leading-[0.78] tracking-[-0.045em]"
            >
              Fashion moves
              <span className="block text-accent">fast.</span>
              Don&apos;t miss
              <span className="block text-accent">the next drop.</span>
            </h2>

            <p
              data-footer-description
              className="mt-8 max-w-[570px] text-sm leading-7 text-white/55"
            >
              Get new drops, featured stores and curated edits delivered
              directly to your inbox.
            </p>
          </div>

          <div data-footer-form className="flex flex-col justify-end">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="newsletter-email"
                className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/45"
              >
                Join our newsletter
              </label>

              <div className="mt-5 flex border-b border-white/25 pb-3">
                <div className="flex flex-1 items-center gap-3">
                  <Mail size={19} strokeWidth={1.5} className="text-white/45" />

                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-300 hover:rotate-45"
                >
                  <ArrowUpRight size={20} strokeWidth={1.7} />
                </button>
              </div>

              <p
                aria-live="polite"
                className="mt-3 min-h-5 text-xs text-white/45"
              >
                {message}
              </p>
            </form>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-5">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-white/40">
                  Curated weekly
                </p>

                <strong className="mt-3 block font-display text-4xl font-normal uppercase">
                  New drops
                </strong>
              </div>

              <div className="border border-white/10 p-5">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-white/40">
                  No spam
                </p>

                <strong className="mt-3 block font-display text-4xl font-normal uppercase">
                  Just style
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr] gap-12 py-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div data-footer-column>
            <Link
              href="/"
              className="font-display text-[clamp(4rem,7vw,8rem)] uppercase leading-none tracking-[-0.04em]"
            >
              StyleHub
            </Link>

            <p className="mt-5 max-w-[390px] text-sm leading-7 text-white/45">
              A curated multi-vendor fashion marketplace connecting customers
              with independent stores, emerging brands and modern designers.
            </p>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                <Icon size={18} />;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/65 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div data-footer-column>
            <p className="mb-6 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/35">
              Shop
            </p>

            <div className="space-y-4">
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div data-footer-column>
            <p className="mb-6 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/35">
              Company
            </p>

            <div className="space-y-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div data-footer-column>
            <p className="mb-6 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/35">
              Support
            </p>

            <div className="space-y-4">
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          data-footer-bottom
          className="flex items-center justify-between gap-6 border-t border-white/10 pt-7 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/35 max-sm:flex-col max-sm:items-start"
        >
          <p>© {new Date().getFullYear()} StyleHub. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>India</span>
            <span>INR</span>
            <span>English</span>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[3vw] mt-16 whitespace-nowrap text-center font-display text-[clamp(8rem,19vw,22rem)] uppercase leading-[0.7] tracking-[-0.05em] text-white/[0.035]"
      >
        StyleHub
      </p>
    </footer>
  );
}
