"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const CONTACTS = [
  { icon: Mail, label: "Email", value: "blast2026@rvsit.edu.in" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Venue", value: "RVS Institute of Technology, Coimbatore, Tamil Nadu" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
        >
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Questions about <span className="text-gradient-gold">BLAST 2026?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/60">
            Reach out to the organizing committee — we usually respond within
            24 hours.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {CONTACTS.map((contact) => (
              <div key={contact.label} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <contact.icon size={20} />
                </div>
                <span className="eyebrow text-[0.6rem]">{contact.label}</span>
                <span className="text-sm text-ivory/70">{contact.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
