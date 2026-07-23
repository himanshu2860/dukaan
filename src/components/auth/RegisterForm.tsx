"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useGSAP(
    () => {
      gsap.from("[data-register-item]", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.25,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed.");
        return;
      }

      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          window.location.href = "/login";
        },
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <div data-register-item className="mb-10">
        <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-black/45">
          Join StyleHub
        </p>

        <h2 className="font-display text-[clamp(3.8rem,6vw,6.5rem)] uppercase leading-[0.78] tracking-[-0.04em]">
          Create your
          <span className="block text-[#ff4b2b]">account</span>
        </h2>

        <p className="mt-6 max-w-md text-sm leading-7 text-black/55">
          Discover curated fashion, save your favourite pieces and shop from
          independent labels around the world.
        </p>
      </div>

      <div className="space-y-5">
        <div data-register-item>
          <label
            htmlFor="name"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Full name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Himanshu Sharma"
            autoComplete="name"
            className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-[#ff4b2b]"
          />
        </div>

        <div data-register-item>
          <label
            htmlFor="email"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-[#ff4b2b]"
          />
        </div>

        <div data-register-item>
          <label
            htmlFor="password"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
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

          {formData.password && (
            <div className="mt-3">
              <div className="mb-2 flex gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`h-1 flex-1 transition-all duration-300 ${
                      level <= passwordStrength.level
                        ? "bg-[#ff4b2b]"
                        : "bg-black/10"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-black/40">
                Password strength: {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        <div data-register-item>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/55"
          >
            Confirm password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter password again"
              autoComplete="new-password"
              className="w-full border-b border-black/20 bg-transparent px-0 py-4 pr-12 text-base outline-none transition-colors placeholder:text-black/25 focus:border-[#ff4b2b]"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 transition-colors hover:text-black"
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <div data-register-item className="flex items-start gap-3 pt-1">
          <input
            id="terms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[#ff4b2b]"
          />

          <label htmlFor="terms" className="text-xs leading-5 text-black/50">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-black underline underline-offset-4"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-black underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {error && (
          <p
            data-register-item
            className="border-l-2 border-[#ff4b2b] bg-[#ff4b2b]/10 px-4 py-3 text-sm text-black/70"
          >
            {error}
          </p>
        )}

        <div data-register-item className="pt-2">
          <button
            ref={buttonRef}
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center overflow-hidden bg-[#111111] px-6 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-0 translate-y-full bg-[#ff4b2b] transition-transform duration-500 ease-out group-hover:translate-y-0" />

            <span className="relative z-10 flex items-center gap-3">
              {loading && <LoaderCircle size={18} className="animate-spin" />}

              {loading ? "Creating account" : "Create account"}
            </span>
          </button>
        </div>

        <div
          data-register-item
          className="flex items-center gap-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-black/30"
        >
          <span className="h-px flex-1 bg-black/10" />
          Or continue with
          <span className="h-px flex-1 bg-black/10" />
        </div>

        <div data-register-item>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-black/15 px-6 py-4 text-xs font-extrabold uppercase tracking-[0.15em] transition-all hover:border-black hover:bg-black hover:text-white"
          >
            <span className="text-base font-bold">G</span>
            Continue with Google
          </button>
        </div>

        <p
          data-register-item
          className="pt-2 text-center text-sm text-black/50"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-black underline decoration-[#ff4b2b] decoration-2 underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}

function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Weak", "Weak", "Medium", "Strong", "Very strong"];

  return {
    level: score,
    label: labels[score],
  };
}
