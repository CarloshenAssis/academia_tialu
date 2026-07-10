import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)] ${className}`}>
      {children}
    </div>
  );
}
