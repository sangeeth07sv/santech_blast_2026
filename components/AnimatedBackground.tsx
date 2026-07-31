"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] opacity-40" />

      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-circuit/10 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-gold-dark/20 blur-[100px]"
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian" />
    </div>
  );
}
