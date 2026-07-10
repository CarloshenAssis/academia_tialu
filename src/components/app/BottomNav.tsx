"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, FileText, User } from "lucide-react";

const items = [
  { href: "/home", label: "Início", icon: Home },
  { href: "/cursos", label: "Cursos", icon: BookOpen },
  { href: "/comunidade", label: "Comunidade", icon: Users },
  { href: "/materiais", label: "Materiais", icon: FileText },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-[480px] items-stretch justify-between px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  active ? "text-navy" : "text-ink-soft"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
