export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
