"use client";

import { motion } from "framer-motion";
import { Cpu, Rocket, Users, Trophy } from "lucide-react";

const STATS = [
  { icon: Users, value: "1500+", label: "Participants" },
  { icon: Cpu, value: "6", label: "Flagship Events" },
  { icon: Trophy, value: "₹3L+", label: "Prize Pool" },
  { icon: Rocket, value: "40+", label: "Colleges" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-4">About the symposium</p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Where ideas <span className="text-gradient-gold">break the ceiling</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/60 sm:text-lg">
              BLAST 2026 is the flagship technical symposium of RVS Institute
              of Technology — two days of building, competing, and learning
              at the edge of artificial intelligence and emerging tech.
              Students from across the region come together to hack, design,
              present, and compete for glory and a share of the prize pool.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ivory/60 sm:text-lg">
              Six flagship events. Industry mentors. A campus wired for one
              purpose: pushing what students can build past its limits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-5"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass flex flex-col items-start gap-3 rounded-2xl p-6"
              >
                <stat.icon size={26} className="text-gold" />
                <span className="font-display text-3xl font-bold text-ivory">
                  {stat.value}
                </span>
                <span className="text-sm text-ivory/50">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
