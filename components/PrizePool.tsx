"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

const TIERS = [
  {
    icon: Trophy,
    title: "Overall Champions",
    amount: "₹1,00,000",
    detail: "Best-performing team across all flagship events",
  },
  {
    icon: Medal,
    title: "Event Winners",
    amount: "₹2,40,000",
    detail: "Cash prizes distributed across all six event categories",
  },
  {
    icon: Award,
    title: "Runner-ups & Specials",
    amount: "₹60,000",
    detail: "Runner-up awards plus best-innovation and jury specials",
  },
];

export default function PrizePool() {
  return (
    <section id="prizes" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">What&apos;s at stake</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Prize Pool of <span className="text-gradient-gold">₹4,00,000+</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass flex flex-col items-center rounded-2xl p-10 text-center"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                <tier.icon size={28} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ivory">
                {tier.title}
              </h3>
              <p className="mt-3 font-display text-3xl font-bold text-gradient-gold">
                {tier.amount}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/55">
                {tier.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
