"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, FileText, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const items = [
  { href: "/home", label: "Início", icon: Home },
  { href: "/cursos", label: "Cursos", icon: BookOpen },
  { href: "/comunidade", label: "Comunidade", icon: Users },
  { href: "/materiais", label: "Materiais", icon: FileText },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function DesktopSideNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-navy px-5 py-8 text-cream md:flex">
      <div className="flex items-center gap-2.5">
        <Logo size={36} />
        <div className="leading-tight">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Academia</p>
          <p className="font-display text-lg font-bold">Tia Lu</p>
        </div>
      </div>
      <nav className="mt-8 flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-cream/10 text-gold" : "text-cream/80 hover:bg-cream/5"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
