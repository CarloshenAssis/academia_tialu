"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/nav";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-navy px-5 py-8 text-cream md:flex">
      <span className="font-display text-lg font-bold">Academia Tia Lu</span>
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
