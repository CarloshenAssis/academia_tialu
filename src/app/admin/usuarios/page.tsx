import { adminStats, adminUsers } from "@/lib/mock-data";
import { StatCard } from "@/components/app/StatCard";

export default function AdminUsuariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Gestão de usuários</h1>
        <p className="text-sm text-ink-soft">
          {adminStats.activeSubscribers} assinantes ativos na plataforma
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Assinantes ativos" value={adminStats.activeSubscribers} />
        <StatCard label="Novos este mês" value={adminStats.newThisMonth} />
        <StatCard label="Cursos publicados" value={adminStats.publishedCourses} />
        <StatCard label="Posts na comunidade" value={adminStats.communityPosts} />
      </div>

      <div className="overflow-x-auto rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Plano</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {adminUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-semibold text-ink">{user.name}</td>
                <td className="px-4 py-3 text-ink-soft">{user.email}</td>
                <td className="px-4 py-3 text-ink-soft">{user.plan}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-medium ${
                      user.status === "Ativo" ? "text-success" : "text-danger"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
