"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-navy px-5 py-8 text-cream md:flex">
      <div className="flex items-center gap-2.5">
        <Logo size={36} />
        <div className="leading-tight">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Academia</p>
          <p className="font-display text-lg font-bold">Tia Lu</p>
        </div>
      </div>
      <nav className="mt-8 flex flex-col gap-1">
        {adminNavItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-cream/10 text-gold" : "text-cream/80 hover:bg-cream/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
