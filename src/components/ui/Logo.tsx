export function Logo({ size = 64, className = "" }: { size?: number; className?: string }) {
  const iconSize = size * 0.72;

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[22%] bg-cream ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Academia Tia Lu"
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path
          d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
          className="fill-teal"
        />
        <path
          d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
          className="stroke-teal"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path d="M22 10v5" className="stroke-teal" strokeWidth={2} strokeLinecap="round" />
        <circle cx={22} cy={16.5} r={1.8} className="fill-gold-dark" />
      </svg>
    </div>
  );
}
