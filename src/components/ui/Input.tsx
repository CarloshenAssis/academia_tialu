import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={inputId}
        className={`rounded-xl border border-ink/10 bg-card px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-ink-soft">{hint}</span>}
    </label>
  );
}
