import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { adminStats, adminNavItems } from "@/lib/mock-data";
import { StatCard } from "@/components/app/StatCard";

export default function AdminDashboardPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Painel da Tia Lu</h1>
        <p className="text-sm text-ink-soft">Visão geral da plataforma</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Assinantes ativos" value={adminStats.activeSubscribers} />
        <StatCard label="Novos este mês" value={adminStats.newThisMonth} />
        <StatCard label="Cursos publicados" value={adminStats.publishedCourses} />
        <StatCard label="Posts na comunidade" value={adminStats.communityPosts} />
      </div>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {adminNavItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex items-center justify-between p-4 text-sm text-ink">
              {item.label}
              <ChevronRight size={16} className="text-ink-soft" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
