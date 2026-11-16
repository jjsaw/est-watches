"use client";

import { useState } from "react";
import Entrance from "@/components/Entrance";
import Gallery from "@/components/Gallery";

interface Consultation {
  year: number;
  month: number | null;
}

export default function Home() {
  const [consultation, setConsultation] = useState<Consultation | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      {/* masthead */}
      <header className="px-6 pt-12 sm:pt-16">
        <div className="mx-auto flex max-w-3xl items-center gap-6">
          <span className="h-px flex-1 bg-ink/30" />
          <h1
            className="cursor-pointer select-none text-center font-display text-5xl font-medium tracking-[0.12em] text-ink sm:text-6xl"
            onClick={() => setConsultation(null)}
            title="Est. — return to the entrance"
          >
            Est.
          </h1>
          <span className="h-px flex-1 bg-ink/30" />
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.45em] text-ink/50">
          The Birth-Year Register
        </p>
      </header>

      <main className="flex-1">
        {consultation === null ? (
          <Entrance
            onConsult={(year, month) => setConsultation({ year, month })}
          />
        ) : (
          <Gallery
            key={`${consultation.year}-${consultation.month}`}
            year={consultation.year}
            month={consultation.month}
            onReset={() => setConsultation(null)}
          />
        )}
      </main>

      <footer className="border-t border-ink/15 px-6 py-8">
        <p className="text-center text-[11.5px] italic leading-relaxed text-ink/45">
          Est. — a personal register of birth-year watches, kept by hand.
          <br />
          Production years are honest approximations; the perfect-match seal
          appears only where an introduction month is truly documented.
        </p>
      </footer>
    </div>
  );
}
