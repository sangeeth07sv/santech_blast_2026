"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-8 flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <Sparkles size={14} className="text-gold" />
          <span className="eyebrow text-[0.65rem]">
            Hosted by RVS Institute of Technology
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
        >
          <span className="text-gradient-gold">BLAST</span>
          <span className="text-ivory">2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl font-body text-lg text-ivory/70 sm:text-xl"
        >
          Beyond Limits: AI, Innovation &amp; Technology
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="eyebrow mt-2"
        >
          March 12–13, 2026 · RVS Institute of Technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/register"
            className="focus-ring group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-3.5 font-semibold text-obsidian transition-transform hover:scale-105"
          >
            Register Now
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href="#events"
            className="focus-ring rounded-full border border-gold/30 px-8 py-3.5 font-semibold text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            Explore Events
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-14"
        >
          <p className="eyebrow mb-4 text-[0.65rem]">Countdown to launch</p>
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
}
