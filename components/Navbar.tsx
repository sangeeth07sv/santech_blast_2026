"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#events", label: "Events" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#prizes", label: "Prizes" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading, loginWithGoogle } = useAuth();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-ivory">
            BLAST<span className="text-gold">2026</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring text-sm font-medium text-ivory/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {!loading && user ? (
            <Link
              href="/dashboard"
              className="focus-ring flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1.5 text-sm text-ivory/80 transition-colors hover:border-gold"
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : null}
              Dashboard
            </Link>
          ) : !loading ? (
            <button
              onClick={() => void loginWithGoogle()}
              className="focus-ring rounded-full border border-gold/30 px-4 py-1.5 text-sm text-ivory/80 transition-colors hover:border-gold hover:text-gold"
            >
              Sign in
            </button>
          ) : null}
          <Link
            href="/register"
            className="focus-ring rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-2 text-sm font-semibold text-obsidian transition-transform hover:scale-105"
          >
            Register Now
          </Link>
        </div>

        <button
          className="focus-ring text-ivory lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-strong mt-3 flex flex-col gap-4 px-6 py-6 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ivory/80"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={user ? "/dashboard" : "/register"}
            onClick={() => setOpen(false)}
            className="rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-2 text-center text-sm font-semibold text-obsidian"
          >
            {user ? "Dashboard" : "Register Now"}
          </Link>
        </motion.div>
      ) : null}
    </header>
  );
}
