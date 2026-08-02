import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-obsidian-100 px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <span className="font-display text-xl font-bold text-ivory">
            BLAST<span className="text-gold">2026</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed text-ivory/50">
            Beyond Limits: AI, Innovation &amp; Technology — the annual
            technical symposium hosted by RVS Institute of Technology.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-ivory/60">
            <li><Link href="/#about" className="hover:text-gold">About</Link></li>
            <li><Link href="/#events" className="hover:text-gold">Events</Link></li>
            <li><Link href="/#schedule" className="hover:text-gold">Schedule</Link></li>
            <li><Link href="/register" className="hover:text-gold">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-ivory/60">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" /> blast2026@rvsit.edu.in
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-gold" />
              RVS Institute of Technology, Coimbatore, Tamil Nadu
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Follow</h4>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gold/10 pt-6 text-center text-xs text-ivory/40">
        © 2026 RVS Institute of Technology. All rights reserved. Built for BLAST 2026.
      </div>
    </footer>
  );
}
