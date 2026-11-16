"use client";

import { useState } from "react";
import { MONTHS } from "@/lib/watches";

const YEARS: number[] = [];
for (let y = 2020; y >= 1931; y--) YEARS.push(y);

export default function Entrance({
  onConsult,
}: {
  onConsult: (year: number, month: number | null) => void;
}) {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [yearMissing, setYearMissing] = useState(false);

  return (
    <section className="mx-auto flex max-w-xl animate-rise flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
      <p className="text-xs uppercase tracking-[0.35em] text-olive/80">
        A register of watches
      </p>
      <h2 className="mt-4 font-display text-4xl leading-snug text-ink sm:text-5xl">
        born when <span className="italic">you</span> were
      </h2>
      <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink/70">
        Every watch has a vintage, as wine does. Give the Register your birth
        year and it will produce the pieces that share it — and, on rare and
        fortunate occasions, your very month.
      </p>

      <form
        noValidate
        className="mt-12 flex w-full flex-col items-center gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!year) {
            setYearMissing(true);
            return;
          }
          onConsult(Number(year), month ? Number(month) : null);
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <label className="flex flex-col items-center gap-2">
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                yearMissing ? "text-wine" : "text-ink/50"
              }`}
            >
              {yearMissing && <span aria-hidden="true">* </span>}
              Year of birth
            </span>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setYearMissing(false);
              }}
              aria-invalid={yearMissing}
              className={`w-36 appearance-none border-b bg-transparent py-1.5 text-center font-display text-lg transition-colors focus:outline-none ${
                yearMissing
                  ? "border-wine text-wine focus:border-wine"
                  : "border-ink/40 text-ink focus:border-olive"
              }`}
            >
              <option value="" disabled>
                Select
              </option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
              Month
            </span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-36 appearance-none border-b border-ink/40 bg-transparent py-1.5 text-center font-display text-lg text-ink transition-colors focus:border-olive focus:outline-none"
            >
              <option value="">Optional</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="border border-ink/60 px-10 py-3.5 text-[11px] uppercase tracking-[0.35em] text-ink transition-colors duration-300 hover:border-olive hover:bg-olive hover:text-cream"
        >
          Consult the Register
        </button>
      </form>

      <p className="mt-14 text-[12.5px] italic text-ink/45">
        Entries are curated by hand, and grow by the year.
      </p>
    </section>
  );
}
