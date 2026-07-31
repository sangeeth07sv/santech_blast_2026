"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LogOut, Mail, User as UserIcon, CalendarClock, Ticket, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { fetchRegistrationByUid } from "@/lib/api";

interface RegistrationSummary {
  event: string;
  createdAt: string;
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [registration, setRegistration] = useState<RegistrationSummary | null>(null);
  const [loadingReg, setLoadingReg] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user) return;
      const result = await fetchRegistrationByUid(user.uid);
      if (!active) return;
      if (result.success && result.data.length > 0) {
        const latest = result.data[0] as Record<string, unknown>;
        setRegistration({
          event: String(latest.event ?? "—"),
          createdAt: String(latest.createdAt ?? latest.created_at ?? "—"),
        });
      }
      setLoadingReg(false);
    }
    void load();
    return () => {
      active = false;
    };
  }, [user]);

  if (!user) return null;

  return (
    <section className="relative px-6 pb-24 pt-32">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl px-6 py-10 sm:px-12 sm:py-14"
        >
          <div className="flex flex-col items-center text-center">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName ?? "Profile photo"}
                width={96}
                height={96}
                className="rounded-full border-2 border-gold/40"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10 text-gold">
                <UserIcon size={36} />
              </div>
            )}
            <h1 className="mt-5 font-display text-3xl font-bold text-ivory">
              {user.displayName ?? "Participant"}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-ivory/50">
              <Mail size={14} /> {user.email}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-2 text-gold">
                <Ticket size={18} />
                <span className="eyebrow text-[0.65rem]">Registered Event</span>
              </div>
              {loadingReg ? (
                <Loader2 size={18} className="animate-spin text-ivory/40" />
              ) : (
                <p className="font-display text-lg font-semibold text-ivory">
                  {registration?.event ?? "No registration yet"}
                </p>
              )}
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-2 text-gold">
                <CalendarClock size={18} />
                <span className="eyebrow text-[0.65rem]">Registration Date</span>
              </div>
              {loadingReg ? (
                <Loader2 size={18} className="animate-spin text-ivory/40" />
              ) : (
                <p className="font-display text-lg font-semibold text-ivory">
                  {registration?.createdAt ?? "—"}
                </p>
              )}
            </div>
          </div>

          {!loadingReg && !registration ? (
            <p className="mt-6 text-center text-sm text-ivory/50">
              You haven&apos;t registered for an event yet. Head to the Register page to secure your spot.
            </p>
          ) : null}

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => void logout()}
              className="focus-ring flex items-center gap-2 rounded-full border border-gold/30 px-6 py-2.5 text-sm font-semibold text-ivory/80 transition-colors hover:border-gold hover:text-gold"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
      <Footer />
    </main>
  );
}
