"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useAuth } from "@/lib/AuthContext";
import { submitRegistration } from "@/lib/api";
import type { EventName, RegistrationPayload } from "@/types";

const EVENTS: EventName[] = [
  "AI Hackathon",
  "Web Development Challenge",
  "UI/UX Design",
  "Paper Presentation",
  "Project Expo",
  "Tech Quiz",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  event: EventName | "";
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  college: "",
  department: "",
  year: "",
  event: "",
};

export default function RegisterPage() {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (form.college.trim().length < 2) {
      nextErrors.college = "Enter your college name.";
    }
    if (form.department.trim().length < 2) {
      nextErrors.department = "Enter your department.";
    }
    if (!form.year) {
      nextErrors.year = "Select your year of study.";
    }
    if (!form.event) {
      nextErrors.event = "Select an event.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const payload: RegistrationPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      college: form.college.trim(),
      department: form.department.trim(),
      year: form.year,
      event: form.event as EventName,
      uid: user?.uid ?? null,
    };

    const result = await submitRegistration(payload);

    if (result.success) {
      setStatus("success");
      setStatusMessage(result.message);
      setForm(INITIAL_STATE);
    } else {
      setStatus("error");
      setStatusMessage(result.message);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative px-6 pb-24 pt-32">
        <AnimatedBackground />

        <div className="relative z-10 mx-auto max-w-2xl">
          <Link
            href="/"
            className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-10 text-center">
            <p className="eyebrow mb-4">Secure your spot</p>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Register for <span className="text-gradient-gold">BLAST 2026</span>
            </h1>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong flex flex-col items-center gap-4 rounded-2xl px-8 py-14 text-center"
            >
              <CheckCircle2 size={48} className="text-gold" />
              <h2 className="font-display text-2xl font-bold text-ivory">
                You&apos;re registered!
              </h2>
              <p className="text-ivory/60">{statusMessage}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setStatus("idle")}
                  className="focus-ring rounded-full border border-gold/30 px-6 py-2.5 text-sm text-ivory/80 hover:border-gold hover:text-gold"
                >
                  Register another event
                </button>
                <Link
                  href="/dashboard"
                  className="focus-ring rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-2.5 text-sm font-semibold text-obsidian"
                >
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="glass-strong space-y-5 rounded-2xl px-6 py-8 sm:px-10 sm:py-10"
            >
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Sangeeth Kumar"
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className={inputClass(!!errors.phone)}
                />
              </Field>

              <Field label="College Name" error={errors.college}>
                <input
                  type="text"
                  value={form.college}
                  onChange={(e) => updateField("college", e.target.value)}
                  placeholder="RVS Institute of Technology"
                  className={inputClass(!!errors.college)}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Department" error={errors.department}>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => updateField("department", e.target.value)}
                    placeholder="AI & Data Science"
                    className={inputClass(!!errors.department)}
                  />
                </Field>

                <Field label="Year of Study" error={errors.year}>
                  <select
                    value={form.year}
                    onChange={(e) => updateField("year", e.target.value)}
                    className={inputClass(!!errors.year)}
                  >
                    <option value="" disabled className="bg-obsidian">
                      Select year
                    </option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-obsidian">
                        {y}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Select Event" error={errors.event}>
                <select
                  value={form.event}
                  onChange={(e) => updateField("event", e.target.value as EventName)}
                  className={inputClass(!!errors.event)}
                >
                  <option value="" disabled className="bg-obsidian">
                    Choose an event
                  </option>
                  {EVENTS.map((ev) => (
                    <option key={ev} value={ev} className="bg-obsidian">
                      {ev}
                    </option>
                  ))}
                </select>
              </Field>

              {status === "error" ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {statusMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold py-3.5 font-semibold text-obsidian transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full rounded-xl border bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus-ring transition-colors ${
    hasError ? "border-red-500/60" : "border-gold/20 focus:border-gold"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ivory/70">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
