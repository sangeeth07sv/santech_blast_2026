"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Code2,
  Palette,
  FileText,
  LayoutGrid,
  BrainCircuit,
} from "lucide-react";
import type { EventInfo } from "@/types";

const EVENTS: EventInfo[] = [
  {
    id: "ai-hackathon",
    name: "AI Hackathon",
    tagline: "24-hour build sprint",
    description:
      "Build a working AI product from scratch in 24 hours, judged by industry mentors.",
    teamSize: "Teams of 2–4",
    prize: "₹75,000",
    icon: "brain",
  },
  {
    id: "web-dev",
    name: "Web Development Challenge",
    tagline: "Ship it live",
    description:
      "Design and deploy a full-stack web app against a surprise brief in one day.",
    teamSize: "Teams of 1–3",
    prize: "₹50,000",
    icon: "code",
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    tagline: "Design under pressure",
    description:
      "Solve a real product problem with a polished, user-tested interface design.",
    teamSize: "Individual",
    prize: "₹30,000",
    icon: "palette",
  },
  {
    id: "paper-presentation",
    name: "Paper Presentation",
    tagline: "Research, presented",
    description:
      "Present original technical research to a panel of faculty and industry judges.",
    teamSize: "Teams of 1–2",
    prize: "₹25,000",
    icon: "file",
  },
  {
    id: "project-expo",
    name: "Project Expo",
    tagline: "Show, don't just tell",
    description:
      "Showcase a working prototype or innovation to judges and fellow attendees.",
    teamSize: "Teams of 1–4",
    prize: "₹40,000",
    icon: "grid",
  },
  {
    id: "tech-quiz",
    name: "Tech Quiz",
    tagline: "Think fast, know deep",
    description:
      "A high-speed quiz spanning computer science, AI, and internet culture.",
    teamSize: "Teams of 1–2",
    prize: "₹20,000",
    icon: "circuit",
  },
];

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  brain: Brain,
  code: Code2,
  palette: Palette,
  file: FileText,
  grid: LayoutGrid,
  circuit: BrainCircuit,
};

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Flagship events</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Six arenas. <span className="text-gradient-gold">One symposium.</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, i) => {
            const Icon = ICONS[event.icon];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass group flex flex-col rounded-2xl p-7 transition-colors hover:border-gold/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-obsidian">
                  <Icon size={22} />
                </div>
                <span className="eyebrow mb-1 text-[0.65rem]">{event.tagline}</span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  {event.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/55">
                  {event.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-gold/10 pt-4 text-sm">
                  <span className="text-ivory/50">{event.teamSize}</span>
                  <span className="font-mono font-semibold text-gold">
                    {event.prize}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/register"
            className="focus-ring inline-block rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-3.5 font-semibold text-obsidian transition-transform hover:scale-105"
          >
            Register for an Event
          </Link>
        </div>
      </div>
    </section>
  );
}
