import { ReactNode } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/app/AdminSidebar";
import { adminNavItems } from "@/lib/mock-data";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-1 bg-cream">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-ink/10 bg-navy px-5 py-4 text-cream md:hidden">
          <span className="font-display text-lg font-bold">Painel da Tia Lu</span>
          <nav className="mt-3 flex gap-2 overflow-x-auto">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
