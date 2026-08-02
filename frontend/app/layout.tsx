import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLAST 2026 | RVS Institute of Technology",
  description:
    "BLAST 2026 — Beyond Limits: AI, Innovation & Technology. The annual technical symposium hosted by RVS Institute of Technology.",
  keywords: [
    "BLAST 2026",
    "RVS Institute of Technology",
    "symposium",
    "hackathon",
    "technical fest",
  ],
  openGraph: {
    title: "BLAST 2026 | RVS Institute of Technology",
    description: "Beyond Limits: AI, Innovation & Technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased bg-obsidian text-ivory">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
