"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <Link href="/" className="navbar-logo">
          STYLEHUB
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <Link href="/products">New In</Link>
          <Link href="/products?category=men">Men</Link>
          <Link href="/products?category=women">Women</Link>
          <Link href="/shops">Stores</Link>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-icon desktop-icon"
            aria-label="Search products"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          <Link
            href="/login"
            className="navbar-icon desktop-icon"
            aria-label="Login to your account"
          >
            <User size={19} strokeWidth={1.8} />
          </Link>

          <Link
            href="/cart"
            className="navbar-icon desktop-icon"
            aria-label="Open shopping cart"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            <span className="cart-count">0</span>
          </Link>

          <button
            type="button"
            className="navbar-icon mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
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

      <nav
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <Link href="/products" onClick={closeMenu}>
          New In
        </Link>

        <Link href="/products?category=men" onClick={closeMenu}>
          Men
        </Link>

        <Link href="/products?category=women" onClick={closeMenu}>
          Women
        </Link>

        <Link href="/shops" onClick={closeMenu}>
          Stores
        </Link>

        <Link href="/seller/register" onClick={closeMenu}>
          Become a Seller
        </Link>

        <div className="mobile-menu-account">
          <Link href="/login" onClick={closeMenu}>
            Login
          </Link>

          <Link href="/cart" onClick={closeMenu}>
            Cart
          </Link>
        </div>
      </nav>
    </>
  );
}
