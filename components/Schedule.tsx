"use client";

import { motion } from "framer-motion";
import type { ScheduleItem } from "@/types";

const SCHEDULE: ScheduleItem[] = [
  { day: "Day 1 · Mar 12", time: "09:00 AM", title: "Inauguration Ceremony", location: "Main Auditorium" },
  { day: "Day 1 · Mar 12", time: "10:30 AM", title: "AI Hackathon Kickoff", location: "Innovation Lab" },
  { day: "Day 1 · Mar 12", time: "11:00 AM", title: "UI/UX Design Sprint", location: "Design Studio" },
  { day: "Day 1 · Mar 12", time: "02:00 PM", title: "Paper Presentation — Round 1", location: "Seminar Hall A" },
  { day: "Day 1 · Mar 12", time: "06:00 PM", title: "Day 1 Wrap & Networking", location: "Campus Lawn" },
  { day: "Day 2 · Mar 13", time: "09:00 AM", title: "Web Development Challenge", location: "Computer Lab 2" },
  { day: "Day 2 · Mar 13", time: "11:00 AM", title: "Project Expo", location: "Exhibition Hall" },
  { day: "Day 2 · Mar 13", time: "02:00 PM", title: "Tech Quiz — Finals", location: "Main Auditorium" },
  { day: "Day 2 · Mar 13", time: "05:00 PM", title: "Closing & Prize Distribution", location: "Main Auditorium" },
];

export default function Schedule() {
  return (
    <section id="schedule" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Two days, no downtime</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Event <span className="text-gradient-gold">Schedule</span>
          </h2>
        </div>

        <div className="relative border-l border-gold/20 pl-8">
          {SCHEDULE.map((item, i) => (
            <motion.div
              key={`${item.day}-${item.time}-${item.title}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(198,161,91,0.7)]" />
              <p className="eyebrow mb-1 text-[0.6rem]">{item.day} · {item.time}</p>
              <div className="glass flex flex-col justify-between gap-1 rounded-xl px-5 py-4 sm:flex-row sm:items-center">
                <h3 className="font-display text-lg font-semibold text-ivory">
                  {item.title}
                </h3>
                <span className="text-sm text-ivory/50">{item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
