"use client";

import { useAuth } from "@/lib/AuthContext";
import { LogIn, Loader2 } from "lucide-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, loginWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-obsidian px-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ivory">
          Sign in to view your dashboard
        </h1>
        <p className="max-w-sm text-ivory/60">
          Use your Google account to access your BLAST 2026 dashboard and
          registration details.
        </p>
        <button
          onClick={() => void loginWithGoogle()}
          className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-3 font-semibold text-obsidian transition-transform hover:scale-105"
        >
          <LogIn size={18} />
          Login with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
