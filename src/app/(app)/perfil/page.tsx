import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

const menuItems = [
  { label: "Configurações", href: "#" },
  { label: "Alterar senha", href: "#" },
  { label: "Meus dispositivos conectados", href: "#" },
  { label: "Central de ajuda", href: "#" },
  { label: "Termos e privacidade", href: "#" },
];

export default function PerfilPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-semibold text-cream">
          {currentUser.name.charAt(0)}
        </div>
        <h1 className="mt-3 font-display text-lg font-bold text-ink">{currentUser.name}</h1>
        <p className="text-sm text-ink-soft">{currentUser.email}</p>
        <span className="mt-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">
          {currentUser.plan}
        </span>
        <p className="mt-1 text-xs text-ink-soft">Renovação em {currentUser.renewsAt}</p>
      </div>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex items-center justify-between p-4 text-sm text-ink">
              {item.label}
              <ChevronRight size={16} className="text-ink-soft" />
            </Link>
          </li>
        ))}
      </ul>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-danger/30 py-3 text-sm font-semibold text-danger">
        <LogOut size={16} /> Encerrar sessão
      </button>
    </div>
  );
}
