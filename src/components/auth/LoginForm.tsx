"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  useGSAP(
    () => {
      gsap.from("[data-login-item]", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      const button = buttonRef.current;

      if (!button) return;

      const moveX = gsap.quickTo(button, "x", {
        duration: 0.35,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(button, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const handleMove = (event: PointerEvent) => {
        const bounds = button.getBoundingClientRect();

        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;

        moveX(x * 0.08);
        moveY(y * 0.12);
      };

      const handleLeave = () => {
        moveX(0);
        moveY(0);
      };

      button.addEventListener("pointermove", handleMove);
      button.addEventListener("pointerleave", handleLeave);

      return () => {
        button.removeEventListener("pointermove", handleMove);
        button.removeEventListener("pointerleave", handleLeave);
      };
    },
    {
      scope: formRef,
    },
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);

    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => {
        window.location.href = "/";
      },
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <div data-login-item className="mb-10">
        <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-black/45">
          Welcome back
        </p>

        <h2 className="font-display text-[clamp(3.8rem,6vw,6.5rem)] uppercase leading-[0.78] tracking-[-0.04em]">
          Sign in to
          <span className="block text-[#ff4b2b]">StyleHub</span>
        </h2>

        <p className="mt-6 max-w-md text-sm leading-7 text-black/55">
          Continue discovering curated fashion, saved pieces and independent
          labels selected around your style.
        </p>
      </div>

      <div className="space-y-6">
        <div data-login-item>
          <label
            htmlFor="email"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((previous) => ({
                ...previous,
                email: event.target.value,
              }))
            }
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-[#ff4b2b]"
          />
        </div>

        <div data-login-item>
          <label
            htmlFor="password"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  password: event.target.value,
                }))
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full border-b border-black/20 bg-transparent px-0 py-4 pr-12 text-base outline-none transition-colors placeholder:text-black/25 focus:border-[#ff4b2b]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 transition-colors hover:text-black"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <div
          data-login-item
          className="flex items-center justify-between gap-4"
        >
          <label className="flex items-center gap-3 text-xs text-black/50">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  remember: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-[#ff4b2b]"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-bold text-black underline decoration-[#ff4b2b] decoration-2 underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="border-l-2 border-[#ff4b2b] bg-[#ff4b2b]/10 px-4 py-3 text-sm text-black/70">
            {error}
          </p>
        )}

        <div data-login-item className="pt-2">
          <button
            ref={buttonRef}
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center overflow-hidden bg-[#111111] px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-0 translate-y-full bg-[#ff4b2b] transition-transform duration-500 ease-out group-hover:translate-y-0" />

            <span className="relative z-10 flex items-center gap-3">
              {loading && <LoaderCircle size={18} className="animate-spin" />}
              {loading ? "Signing in" : "Sign in"}
            </span>
          </button>
        </div>

        <div
          data-login-item
          className="flex items-center gap-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-black/30"
        >
          <span className="h-px flex-1 bg-black/10" />
          Or continue with
          <span className="h-px flex-1 bg-black/10" />
        </div>

        <div data-login-item>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-black/15 px-6 py-4 text-xs font-extrabold uppercase tracking-[0.15em] transition-all hover:border-black hover:bg-black hover:text-white"
          >
            <span className="text-base font-bold">G</span>
            Continue with Google
          </button>
        </div>

        <p data-login-item className="pt-2 text-center text-sm text-black/50">
          New to StyleHub?{" "}
          <Link
            href="/register"
            className="font-bold text-black underline decoration-[#ff4b2b] decoration-2 underline-offset-4"
          >
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
