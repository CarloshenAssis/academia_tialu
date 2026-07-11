export function Logo({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Academia Tia Lu"
    >
      <defs>
        <linearGradient id="tialu-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbb877" />
          <stop offset="100%" stopColor="#b08a45" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="url(#tialu-gold)" />
      <circle cx="32" cy="32" r="30.25" fill="none" stroke="#16213e" strokeOpacity="0.12" />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontWeight="700"
        fontSize="23"
        fill="#16213e"
      >
        TL
      </text>
      <path
        d="M46 17.5 L47.3 20.5 L50.3 21.8 L47.3 23.1 L46 26.1 L44.7 23.1 L41.7 21.8 L44.7 20.5 Z"
        fill="#f7f1e6"
        opacity="0.9"
      />
    </svg>
  );
}
