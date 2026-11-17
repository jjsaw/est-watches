export type WatchStyle =
  | "dress"
  | "diver"
  | "chronograph"
  | "pilot"
  | "sport"
  | "everyday";

export type PriceTier = "$" | "$$" | "$$$";

export type WatchAudience = "men" | "women" | "unisex";

export interface Watch {
  id: string;
  brand: string;
  model: string;
  reference: string;
  /** First year of production (or introduction). */
  yearStart: number;
  /** Last year of production; null = still in production. */
  yearEnd: number | null;
  /** 1–12, only when the introduction month is genuinely documented. */
  launchMonth?: number;
  style: WatchStyle;
  priceTier: PriceTier;
  /** Who it was made for; "unisex" surfaces under both the men's and women's filters. */
  audience: WatchAudience;
  blurb: string;
  /** Path under /public, e.g. "/watches/omega-speedmaster-145022.jpg". */
  image?: string;
  /** Attribution for the photo (required by most free licenses). */
  imageCredit?: string;
}

export const STYLES: WatchStyle[] = [
  "dress",
  "diver",
  "chronograph",
  "pilot",
  "sport",
  "everyday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const THIS_YEAR = new Date().getFullYear();

export function inProductionDuring(watch: Watch, year: number): boolean {
  const end = watch.yearEnd ?? THIS_YEAR;
  return watch.yearStart <= year && year <= end;
}

/** "women" also matches unisex; "men" also matches unisex; "all" matches everything. */
export function matchesAudience(
  watch: Watch,
  audience: WatchAudience | "all"
): boolean {
  if (audience === "all") return true;
  return watch.audience === audience || watch.audience === "unisex";
}

/** Introduced in the visitor's exact birth year. */
export function bornSameYear(watch: Watch, year: number): boolean {
  return watch.yearStart === year;
}

/** Introduced in the visitor's exact birth month AND year — the wax seal. */
export function isPerfectMatch(
  watch: Watch,
  year: number,
  month: number | null
): boolean {
  return (
    month !== null &&
    watch.yearStart === year &&
    watch.launchMonth !== undefined &&
    watch.launchMonth === month
  );
}

export function watchesForYear(all: Watch[], year: number, month: number | null) {
  return all
    .filter((w) => inProductionDuring(w, year))
    .sort((a, b) => {
      const pa = isPerfectMatch(a, year, month) ? 1 : 0;
      const pb = isPerfectMatch(b, year, month) ? 1 : 0;
      if (pa !== pb) return pb - pa;
      const ba = bornSameYear(a, year) ? 1 : 0;
      const bb = bornSameYear(b, year) ? 1 : 0;
      if (ba !== bb) return bb - ba;
      return a.brand.localeCompare(b.brand) || a.yearStart - b.yearStart;
    });
}

export function findUrl(watch: Watch): string {
  const query = encodeURIComponent(`${watch.brand} ${watch.reference}`);
  return `https://www.chrono24.com/search/index.htm?query=${query}&dosearch=true`;
}

/** 1991 → MCMXCI, for the ledger headline. */
export function toRoman(num: number): string {
  const table: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [value, numeral] of table) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

const SMALL_NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

export function numberInWords(n: number): string {
  return n <= 20 ? SMALL_NUMBERS[n] : String(n);
}
