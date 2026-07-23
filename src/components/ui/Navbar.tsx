"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
const navLinks = [
  {
    label: "New In",
    href: "/products",
  },
  {
    label: "Men",
    href: "/products?category=men",
  },
  {
    label: "Women",
    href: "/products?category=women",
  },
  {
    label: "Stores",
    href: "/shops",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const desktopNav = desktopNavRef.current;
    const actions = actionsRef.current;

    setMenuOpen(false);
    document.body.style.overflow = "";

    if (!header) return;

    gsap.killTweensOf([header, logo, desktopNav?.children, actions?.children]);

    gsap.set(header, {
      yPercent: 0,
      opacity: 1,
      visibility: "visible",
    });

    gsap.set(logo, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      visibility: "visible",
    });

    if (desktopNav) {
      gsap.set(desktopNav.children, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        visibility: "visible",
      });
    }

    if (actions) {
      gsap.set(actions.children, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        visibility: "visible",
      });
    }
  }, [pathname]);
  /*
   * Prevent body scrolling while the mobile menu is open.
   */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /*
   * Navbar entrance animation.
   */
  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const desktopNav = desktopNavRef.current;
    const actions = actionsRef.current;

    if (!header) return;

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .fromTo(
        header,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          duration: 0.8,
        },
      )
      .fromTo(
        logo,
        {
          y: -15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
        },
        "-=0.35",
      )
      .fromTo(
        desktopNav?.children ?? [],
        {
          y: -12,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
        },
        "-=0.35",
      )
      .fromTo(
        actions?.children ?? [],
        {
          scale: 0.75,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: "back.out(1.7)",
        },
        "-=0.35",
      );

    return () => {
      timeline.kill();
    };
  }, []);

  /*
   * Hide navbar when scrolling down.
   * Show navbar when scrolling up.
   */
  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    let previousScrollY = window.scrollY;
    let ticking = false;

    const showNavbar = () => {
      gsap.to(header, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const hideNavbar = () => {
      gsap.to(header, {
        yPercent: -110,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    };

    const updateNavbar = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDifference = currentScrollY - previousScrollY;

      // Always show the navbar near the top.
      if (currentScrollY < 60 || menuOpen) {
        showNavbar();
        previousScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Small threshold prevents navbar shaking on tiny scroll movements.
      if (Math.abs(scrollDifference) < 6) {
        ticking = false;
        return;
      }

      if (scrollDifference > 0) {
        hideNavbar();
      } else {
        showNavbar();
      }

      previousScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    if (menuOpen) {
      showNavbar();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.killTweensOf(header);
    };
  }, [menuOpen, pathname]);

  /*
   * Animate the mobile menu items when it opens.
   */
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;

    if (!mobileMenu || !menuOpen) return;

    const items = mobileMenu.querySelectorAll("[data-mobile-link]");
    const accountButtons = mobileMenu.querySelectorAll("[data-mobile-account]");

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        items,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        },
      )
      .fromTo(
        accountButtons,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3",
      );

    return () => {
      timeline.kill();
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogoEnter = () => {
    const logo = logoRef.current;

    if (!logo) return;

    gsap.to(logo, {
      scale: 1.04,
      letterSpacing: "-0.01em",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLogoLeave = () => {
    const logo = logoRef.current;

    if (!logo) return;

    gsap.to(logo, {
      scale: 1,
      letterSpacing: "-0.03em",
      duration: 0.45,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  };

  const handleNavLinkEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, {
      y: -3,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleNavLinkLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, {
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  const handleIconEnter = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1.1,
      rotate: 5,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleIconLeave = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  };

  const handleMobileLinkEnter = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const title = event.currentTarget.querySelector("[data-mobile-title]");
    const arrow = event.currentTarget.querySelector("[data-mobile-arrow]");

    gsap.to(title, {
      x: 10,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      rotate: 45,
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMobileLinkLeave = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const title = event.currentTarget.querySelector("[data-mobile-title]");
    const arrow = event.currentTarget.querySelector("[data-mobile-arrow]");

    gsap.to(title, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-[60] flex h-20 items-center justify-between border-b border-black/10 bg-page/80 px-[4vw] backdrop-blur-xl will-change-transform max-md:h-16 max-md:px-5"
      >
        <Link
          ref={logoRef}
          href="/"
          className="relative z-[70] origin-left font-display text-3xl uppercase leading-none tracking-[-0.03em] text-ink max-md:text-2xl"
          onClick={closeMenu}
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
        >
          StyleHub
        </Link>

        <nav
          ref={desktopNavRef}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={handleNavLinkEnter}
              onMouseLeave={handleNavLinkLeave}
              className="group relative py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-ink"
            >
              {link.label}

              <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div
          ref={actionsRef}
          className="relative z-[70] flex shrink-0 items-center gap-3"
        >
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition-colors duration-300 hover:border-black hover:bg-ink hover:text-white lg:grid"
            aria-label="Search products"
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          <Link
            href="/login"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition-colors duration-300 hover:border-black hover:bg-ink hover:text-white lg:grid"
            aria-label="Login to your account"
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
          >
            <User size={18} strokeWidth={1.8} />
          </Link>
          <Link
            href="/register"
            className="hidden h-10 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-accent lg:inline-flex"
          >
            Register
          </Link>
          <Link
            href="/cart"
            className="relative hidden h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition-colors duration-300 hover:border-black hover:bg-ink hover:text-white lg:grid"
            aria-label="Open shopping cart"
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
          >
            <ShoppingBag size={18} strokeWidth={1.8} />

            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.58rem] font-extrabold leading-none text-white">
              0
            </span>
          </Link>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink transition-colors duration-300 hover:border-black hover:bg-ink hover:text-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <Menu size={22} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-page px-5 pb-8 pt-24 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-full opacity-0"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              data-mobile-link
              href={link.href}
              onClick={closeMenu}
              onMouseEnter={handleMobileLinkEnter}
              onMouseLeave={handleMobileLinkLeave}
              className="group flex items-center justify-between border-b border-black/10 py-5"
            >
              <div className="flex items-start gap-4">
                <span className="pt-2 text-[0.62rem] font-extrabold tracking-[0.16em] text-muted">
                  0{index + 1}
                </span>

                <span
                  data-mobile-title
                  className="font-display text-[clamp(3.6rem,15vw,6rem)] uppercase leading-[0.8] tracking-[-0.04em] text-ink"
                >
                  {link.label}
                </span>
              </div>

              <span data-mobile-arrow className="text-2xl text-ink">
                ↗
              </span>
            </Link>
          ))}

          <Link
            data-mobile-link
            href="/seller/register"
            onClick={closeMenu}
            onMouseEnter={handleMobileLinkEnter}
            onMouseLeave={handleMobileLinkLeave}
            className="group flex items-center justify-between border-b border-black/10 py-5"
          >
            <div className="flex items-start gap-4">
              <span className="pt-2 text-[0.62rem] font-extrabold tracking-[0.16em] text-muted">
                05
              </span>

              <span
                data-mobile-title
                className="font-display text-[clamp(3.6rem,15vw,6rem)] uppercase leading-[0.8] tracking-[-0.04em] text-accent"
              >
                Sell
              </span>
            </div>

            <span data-mobile-arrow className="text-2xl text-accent">
              ↗
            </span>
          </Link>
        </div>

        <div className="mt-8 grid shrink-0 grid-cols-2 gap-3 pb-4">
          <Link
            data-mobile-account
            href="/login"
            onClick={closeMenu}
            className="flex min-h-14 items-center justify-center rounded-full border border-black/15 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink"
          >
            Login
          </Link>

          <Link
            data-mobile-account
            href="/register"
            onClick={closeMenu}
            className="flex min-h-14 items-center justify-center rounded-full bg-ink text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
}
