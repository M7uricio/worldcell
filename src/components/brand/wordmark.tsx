import { cn } from "@/lib/utils";

/**
 * Vector rebuild of the store logo: gold "W" over a wireframe globe, navy
 * "ORLD / CELL" lockup. Vector so it stays crisp in the header and inverts
 * cleanly on dark sections (`tone="light"`).
 */
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const word = tone === "light" ? "#ffffff" : "#0d1240";
  const globe = tone === "light" ? "#8f97d1" : "#6b73a8";

  return (
    <svg
      viewBox="0 0 260 96"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label="World Cell"
    >
      <defs>
        <linearGradient id="wm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f6a12" />
          <stop offset="0.35" stopColor="#f2d272" />
          <stop offset="0.62" stopColor="#c9a227" />
          <stop offset="1" stopColor="#8f6a12" />
        </linearGradient>
      </defs>

      {/* Wireframe globe, tucked under the W exactly as in the printed logo */}
      <g
        fill="none"
        stroke={globe}
        strokeWidth="1.5"
        opacity="0.5"
        transform="translate(4,42)"
      >
        <circle cx="31" cy="31" r="30" />
        <ellipse cx="31" cy="31" rx="12" ry="30" />
        <ellipse cx="31" cy="31" rx="23" ry="30" />
        <line x1="1" y1="31" x2="61" y2="31" />
        <path d="M6 15h50M6 47h50" />
      </g>

      {/* Gold W */}
      <path
        d="M6 6h15l11 32L43 6h13l11 32L78 6h15L72 62H59L50 34l-9 28H28z"
        fill="url(#wm-gold)"
      />

      {/* Navy wordmark */}
      <text
        x="90"
        y="44"
        fill={word}
        fontFamily="var(--font-outfit), system-ui, sans-serif"
        fontSize="42"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        ORLD
      </text>
      <text
        x="90"
        y="88"
        fill={word}
        fontFamily="var(--font-outfit), system-ui, sans-serif"
        fontSize="42"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        CELL
      </text>
    </svg>
  );
}
