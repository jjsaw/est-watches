import Image from "next/image";
import WatchIllustration from "@/components/WatchIllustration";
import { findUrl, isPerfectMatch, MONTHS, type Watch } from "@/lib/watches";

export default function WatchCard({
  watch,
  year,
  month,
  index,
}: {
  watch: Watch;
  year: number;
  month: number | null;
  index: number;
}) {
  const perfect = isPerfectMatch(watch, year, month);
  const years =
    watch.yearStart === watch.yearEnd
      ? `Introduced ${watch.yearStart}, made that year only`
      : watch.yearEnd === null
        ? `Introduced ${watch.yearStart}, still made today`
        : `Introduced ${watch.yearStart}, made until ${watch.yearEnd}`;

  return (
    <article
      className="group flex animate-rise flex-col border border-ink/20 bg-linen"
      style={{ animationDelay: `${Math.min(index * 70, 560)}ms` }}
    >
      {/* plate */}
      <div className="relative border-b border-ink/15 bg-parchment text-olive">
        {watch.image ? (
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={watch.image}
              alt={`${watch.brand} ${watch.model}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="px-6 pb-2 pt-4">
            <WatchIllustration style={watch.style} className="mx-auto h-44 w-auto" />
          </div>
        )}

        {perfect && (
          <div className="absolute -right-2 -top-3 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border border-brass bg-cream text-center text-brass shadow-sm outline outline-1 outline-offset-[-5px] outline-brass/60">
            <span className="text-sm leading-none">✶</span>
            <span className="mt-1 text-[8px] font-medium uppercase leading-tight tracking-[0.18em]">
              A Perfect
              <br />
              Match
            </span>
          </div>
        )}
      </div>

      {/* entry */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
          {watch.brand}
        </p>
        <h3 className="mt-1 font-display text-[1.65rem] leading-tight text-ink">
          {watch.model}
        </h3>
        <p className="mt-1 text-[12.5px] tracking-wide text-ink/55">
          Ref. {watch.reference} · {years}
        </p>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">
          {watch.blurb}
        </p>

        {perfect && watch.launchMonth && (
          <p className="mt-3 border-t border-brass/40 pt-3 text-[13px] italic leading-snug text-brass">
            Entered the world in {MONTHS[watch.launchMonth - 1]} {year} — as did
            you. Kismet.
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
          <span
            className="text-[12px] tracking-[0.3em] text-ink/50"
            title="Rough market tier"
          >
            {watch.priceTier}
          </span>
          <a
            href={findUrl(watch)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.22em] text-olive underline-offset-4 transition-colors hover:text-brass hover:underline"
          >
            Find one ↗
          </a>
        </div>
      </div>
    </article>
  );
}
