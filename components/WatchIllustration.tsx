import { useId } from "react";
import type { WatchStyle } from "@/lib/watches";

/**
 * Engraved line-art illustrations, one per watch style — drawn in the
 * manner of an old ledger plate. Stroke-only, inherits currentColor.
 */
export default function WatchIllustration({
  style,
  className,
}: {
  style: WatchStyle;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 220 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={className}
      aria-hidden="true"
    >
      {style === "everyday" ? <Digital /> : <Round style={style} clipId={id} />}
    </svg>
  );
}

function StrapHatch({ x1, x2, ys }: { x1: number; x2: number; ys: number[] }) {
  return (
    <>
      {ys.map((y) => (
        <line key={y} x1={x1} y1={y} x2={x2} y2={y} strokeWidth="0.8" opacity="0.55" />
      ))}
    </>
  );
}

function Round({ style, clipId }: { style: WatchStyle; clipId: string }) {
  const sport = style === "sport";
  const diver = style === "diver";
  const chrono = style === "chronograph";
  const pilot = style === "pilot";
  const dress = style === "dress";

  const dialR = diver ? 42 : dress ? 50 : 46;

  return (
    <>
      {/* straps / bracelet */}
      {sport ? (
        <>
          <path d="M80 6 H140 L132 62 H88 Z" />
          <line x1="96" y1="8" x2="92" y2="60" strokeWidth="0.8" opacity="0.55" />
          <line x1="124" y1="8" x2="128" y2="60" strokeWidth="0.8" opacity="0.55" />
          <StrapHatch x1={86} x2={134} ys={[18, 30, 42, 54]} />
          <path d="M88 178 L132 178 L140 234 H80 Z" />
          <line x1="92" y1="180" x2="96" y2="232" strokeWidth="0.8" opacity="0.55" />
          <line x1="128" y1="180" x2="124" y2="232" strokeWidth="0.8" opacity="0.55" />
          <StrapHatch x1={86} x2={134} ys={[190, 202, 214, 226]} />
        </>
      ) : (
        <>
          <path d="M90 6 H130 L128 62 H92 Z" />
          <StrapHatch x1={93} x2={127} ys={[16, 27, 38, 49]} />
          <path d="M92 178 H128 L130 234 H90 Z" />
          <StrapHatch x1={93} x2={127} ys={[190, 201, 212, 223]} />
        </>
      )}

      {/* crown & pushers */}
      {pilot ? (
        <circle cx="172" cy="120" r="6" />
      ) : (
        <rect x="167" y="114" width="8" height="12" rx="2" />
      )}
      {chrono && (
        <>
          <rect x="162" y="88" width="9" height="9" rx="2" transform="rotate(25 166 92)" />
          <rect x="162" y="143" width="9" height="9" rx="2" transform="rotate(-25 166 147)" />
        </>
      )}

      {/* case */}
      {sport ? (
        <>
          <polygon
            points="110,62 151,79 168,120 151,161 110,178 69,161 52,120 69,79"
            fill="currentColor"
            fillOpacity="0.05"
          />
          {[
            [110, 70],
            [145, 85],
            [160, 120],
            [145, 155],
            [110, 170],
            [75, 155],
            [60, 120],
            [75, 85],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" strokeWidth="0.9" />
          ))}
        </>
      ) : (
        <circle cx="110" cy="120" r="58" fill="currentColor" fillOpacity="0.05" />
      )}

      {/* diver bezel */}
      {diver && (
        <>
          <circle cx="110" cy="120" r="50" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = 110 + 51 * Math.sin(a);
            const y1 = 120 - 51 * Math.cos(a);
            const x2 = 110 + 57 * Math.sin(a);
            const y2 = 120 - 57 * Math.cos(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.6" />;
          })}
          <polygon points="110,72 106,79 114,79" fill="currentColor" />
        </>
      )}

      {/* dial */}
      <circle cx="110" cy="120" r={dialR} />

      {/* sport tapisserie crosshatch */}
      {sport && (
        <>
          <clipPath id={clipId}>
            <circle cx="110" cy="120" r={dialR - 2} />
          </clipPath>
          <g clipPath={`url(#${clipId})`} strokeWidth="0.5" opacity="0.4">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`a${i}`} x1={40 + i * 12} y1="60" x2={70 + i * 12} y2="180" />
            ))}
          </g>
        </>
      )}

      {/* markers */}
      {dress
        ? [0, 90, 180, 270].map((deg) => {
            const a = (deg * Math.PI) / 180;
            const x1 = 110 + (dialR - 9) * Math.sin(a);
            const y1 = 120 - (dialR - 9) * Math.cos(a);
            const x2 = 110 + (dialR - 3) * Math.sin(a);
            const y2 = 120 - (dialR - 3) * Math.cos(a);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })
        : Array.from({ length: 12 }).map((_, i) => {
            if (pilot && i === 0) return null;
            const a = (i * Math.PI) / 6;
            const x1 = 110 + (dialR - 8) * Math.sin(a);
            const y1 = 120 - (dialR - 8) * Math.cos(a);
            const x2 = 110 + (dialR - 3) * Math.sin(a);
            const y2 = 120 - (dialR - 3) * Math.cos(a);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={diver || pilot ? 1.8 : 1.1}
              />
            );
          })}

      {/* pilot triangle at 12 */}
      {pilot && (
        <polygon
          points={`110,${120 - dialR + 4} 105,${120 - dialR + 13} 115,${120 - dialR + 13}`}
          fill="currentColor"
        />
      )}

      {/* chronograph subdials */}
      {chrono && (
        <>
          <circle cx="84" cy="120" r="10" strokeWidth="0.9" />
          <line x1="84" y1="113" x2="84" y2="120" strokeWidth="0.9" />
          <circle cx="136" cy="120" r="10" strokeWidth="0.9" />
          <line x1="136" y1="120" x2="141" y2="115" strokeWidth="0.9" />
          <circle cx="110" cy="148" r="9" strokeWidth="0.9" />
          <line x1="110" y1="148" x2="110" y2="142" strokeWidth="0.9" />
        </>
      )}

      {/* hands at ten past ten */}
      <line x1="110" y1="120" x2="86" y2="106" strokeWidth="2" />
      <line x1="110" y1="120" x2="141" y2="102" strokeWidth="1.6" />
      <circle cx="110" cy="120" r="2.5" fill="currentColor" />
    </>
  );
}

function Digital() {
  return (
    <>
      {/* straps */}
      <path d="M92 6 H128 L127 60 H93 Z" />
      <StrapHatch x1={94} x2={126} ys={[16, 27, 38, 49]} />
      <path d="M93 180 H127 L128 234 H92 Z" />
      <StrapHatch x1={94} x2={126} ys={[192, 203, 214, 225]} />

      {/* case */}
      <rect x="62" y="68" width="96" height="104" rx="20" fill="currentColor" fillOpacity="0.05" />
      <rect x="72" y="78" width="76" height="84" rx="12" strokeWidth="0.9" />

      {/* side buttons */}
      <rect x="56" y="90" width="6" height="12" rx="2" />
      <rect x="56" y="138" width="6" height="12" rx="2" />
      <rect x="158" y="90" width="6" height="12" rx="2" />
      <rect x="158" y="138" width="6" height="12" rx="2" />

      {/* screen */}
      <rect x="80" y="104" width="60" height="32" rx="3" />
      <line x1="80" y1="96" x2="140" y2="96" strokeWidth="0.8" opacity="0.6" />
      <line x1="84" y1="146" x2="136" y2="146" strokeWidth="0.8" opacity="0.6" />

      {/* digits */}
      <g strokeWidth="2">
        <line x1="90" y1="114" x2="90" y2="126" />
        <line x1="97" y1="114" x2="97" y2="126" />
        <circle cx="106" cy="116" r="0.8" fill="currentColor" />
        <circle cx="106" cy="124" r="0.8" fill="currentColor" />
        <line x1="114" y1="114" x2="114" y2="126" />
        <line x1="124" y1="114" x2="124" y2="126" />
        <line x1="117" y1="120" x2="121" y2="120" strokeWidth="1.4" />
      </g>
    </>
  );
}
