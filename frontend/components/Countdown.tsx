"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EVENT_DATE = new Date("2026-03-12T09:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(EVENT_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: Array<{ key: keyof TimeLeft; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center gap-3 sm:gap-5"
      role="timer"
      aria-label="Countdown to BLAST 2026"
    >
      {UNITS.map((unit, i) => (
        <motion.div
          key={unit.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
          className="glass flex w-16 flex-col items-center rounded-xl py-3 sm:w-20"
        >
          <span className="font-mono text-2xl font-semibold text-gold sm:text-3xl tabular-nums">
            {timeLeft ? String(timeLeft[unit.key]).padStart(2, "0") : "00"}
          </span>
          <span className="eyebrow mt-1 text-[0.6rem] text-ivory/60">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
