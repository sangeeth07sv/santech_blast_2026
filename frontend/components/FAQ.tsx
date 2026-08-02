"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";

const FAQS: FaqItem[] = [
  {
    question: "Who can participate in BLAST 2026?",
    answer:
      "Any student currently enrolled in a recognized college or university can participate. Some events allow individual entries while others require teams — check each event's team size on the Events section.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "Most events are free to enter. A few flagship events with kits or resources may carry a nominal fee, which will be communicated after you register and select your event.",
  },
  {
    question: "Can I register for more than one event?",
    answer:
      "Yes. You can submit separate registrations for each event you want to participate in through the Register page.",
  },
  {
    question: "Will accommodation be provided for outstation participants?",
    answer:
      "Yes, on-campus accommodation is available for outstation participants on request. Details will be shared over email after registration.",
  },
  {
    question: "How do I track my registration status?",
    answer:
      "Sign in with Google and visit your Dashboard to view your registered event, registration date, and profile details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Need to know</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="focus-ring flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-ivory sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gold"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ivory/55">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
