import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/app/LogoutButton";

const menuItems = [
  { label: "Configurações", href: "#" },
  { label: "Alterar senha", href: "#" },
  { label: "Meus dispositivos conectados", href: "#" },
  { label: "Central de ajuda", href: "#" },
  { label: "Termos e privacidade", href: "#" },
];

const planLabel = { mensal: "Plano Mensal", anual: "Plano Anual" } as const;

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name, email, plan, renews_at")
        .eq("id", user.id)
        .single()
    : { data: null };

  const name = profile?.full_name || user?.email?.split("@")[0] || "Aluna";
  const email = profile?.email ?? user?.email ?? "";
  const plan = planLabel[(profile?.plan as "mensal" | "anual") ?? "mensal"];
  const renewsAt = profile?.renews_at
    ? new Date(profile.renews_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-semibold text-cream">
          {name.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-3 font-display text-lg font-bold text-ink">{name}</h1>
        <p className="text-sm text-ink-soft">{email}</p>
        <span className="mt-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">
          {plan}
        </span>
        {renewsAt && <p className="mt-1 text-xs text-ink-soft">Renovação em {renewsAt}</p>}
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

      <LogoutButton />
    </div>
  );
}
