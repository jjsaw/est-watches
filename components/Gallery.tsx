"use client";

import { useMemo, useState } from "react";
import WatchCard from "@/components/WatchCard";
import { WATCHES } from "@/data/watches";
import {
  isPerfectMatch,
  matchesAudience,
  MONTHS,
  numberInWords,
  toRoman,
  watchesForYear,
  type WatchAudience,
  type WatchStyle,
} from "@/lib/watches";

const STYLE_LABELS: Record<WatchStyle, string> = {
  dress: "Dress",
  diver: "Diver",
  chronograph: "Chronograph",
  pilot: "Pilot",
  sport: "Sport",
  everyday: "Everyday",
};

const AUDIENCE_OPTIONS: { value: WatchAudience | "all"; label: string }[] = [
  { value: "all", label: "Everyone" },
  { value: "women", label: "Women's" },
  { value: "men", label: "Men's" },
];

export default function Gallery({
  year,
  month,
  onReset,
}: {
  year: number;
  month: number | null;
  onReset: () => void;
}) {
  const [audience, setAudience] = useState<WatchAudience | "all">("all");
  const [filter, setFilter] = useState<WatchStyle | "all">("all");

  const matches = useMemo(() => watchesForYear(WATCHES, year, month), [year, month]);
  const byAudience = useMemo(
    () => matches.filter((w) => matchesAudience(w, audience)),
    [matches, audience]
  );
  const stylesPresent = useMemo(
    () =>
      (Object.keys(STYLE_LABELS) as WatchStyle[]).filter((s) =>
        byAudience.some((w) => w.style === s)
      ),
    [byAudience]
  );
  const effectiveStyle =
    filter !== "all" && !stylesPresent.includes(filter) ? "all" : filter;
  const visible =
    effectiveStyle === "all"
      ? byAudience
      : byAudience.filter((w) => w.style === effectiveStyle);
  const perfect = matches.find((w) => isPerfectMatch(w, year, month));

  function selectAudience(value: WatchAudience | "all") {
    setAudience(value);
    setFilter("all");
  }

  return (
    <section className="mx-auto max-w-6xl animate-rise px-6 pb-24 pt-12 sm:pt-16">
      {/* ledger headline */}
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-olive/80">
          Year
        </p>
        <h2 className="mt-3 font-display text-5xl tracking-[0.08em] text-ink sm:text-6xl">
          {year}
        </h2>
        <p className="mt-2 font-display text-sm italic tracking-[0.2em] text-ink/55">
          {toRoman(year)}
        </p>

        <div className="mx-auto mt-6 flex max-w-xl items-center gap-4">
          <span className="h-px flex-1 bg-ink/25" />
          <span className="text-brass">✶</span>
          <span className="h-px flex-1 bg-ink/25" />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink/75">
          {matches.length === 0 ? (
            <>
              The Register is thin for this year — entries are added by hand,
              year by year. Do call again.
            </>
          ) : (
            <>
              {capitalize(numberInWords(matches.length))}{" "}
              {matches.length === 1 ? "piece" : "pieces"} of the Register share
              your year.
              {month !== null &&
                (perfect ? (
                  <>
                    {" "}
                    And one — the {perfect.brand} {perfect.model} — entered the
                    world in {MONTHS[month - 1]}, your very month.
                  </>
                ) : (
                  <>
                    {" "}
                    None can be pinned to {MONTHS[month - 1]} itself — the hunt
                    for a perfect match continues.
                  </>
                ))}
            </>
          )}
        </p>
      </div>

      {/* who it's for */}
      {matches.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="inline-flex border border-ink/25">
            {AUDIENCE_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => selectAudience(opt.value)}
                className={`px-5 py-2 text-[10.5px] uppercase tracking-[0.25em] transition-colors duration-200 ${
                  i > 0 ? "border-l border-ink/25" : ""
                } ${
                  audience === opt.value
                    ? "bg-olive text-cream"
                    : "text-ink/65 hover:text-olive"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* style filters */}
      {byAudience.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <FilterChip
            label="All"
            active={effectiveStyle === "all"}
            onClick={() => setFilter("all")}
          />
          {stylesPresent.map((s) => (
            <FilterChip
              key={s}
              label={STYLE_LABELS[s]}
              active={effectiveStyle === s}
              onClick={() => setFilter(s)}
            />
          ))}
        </div>
      )}

      {/* the ledger entries */}
      {matches.length > 0 && byAudience.length === 0 ? (
        <p className="mt-12 text-center text-[15px] italic leading-relaxed text-ink/60">
          No {audience === "women" ? "women's" : "men's"} pieces are recorded for
          this year yet — the Register grows by hand. Try{" "}
          <button
            onClick={() => selectAudience("all")}
            className="underline decoration-ink/30 underline-offset-4 hover:text-olive"
          >
            Everyone
          </button>
          .
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w, i) => (
            <WatchCard key={w.id} watch={w} year={year} month={month} index={i} />
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <button
          onClick={onReset}
          className="text-[11px] uppercase tracking-[0.3em] text-ink/60 underline-offset-4 transition-colors hover:text-olive hover:underline"
        >
          ← Consult another year
        </button>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border px-4 py-2 text-[10.5px] uppercase tracking-[0.25em] transition-colors duration-200 ${
        active
          ? "border-olive bg-olive text-cream"
          : "border-ink/25 text-ink/65 hover:border-olive hover:text-olive"
      }`}
    >
      {label}
    </button>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
