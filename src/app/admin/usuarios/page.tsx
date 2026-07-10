import { getAdminStats, getAllProfiles } from "@/lib/admin-queries";
import { StatCard } from "@/components/app/StatCard";

const statusLabel: Record<string, { texto: string; cor: string }> = {
  ativo: { texto: "Ativo", cor: "text-success" },
  atrasado: { texto: "Atrasado", cor: "text-danger" },
  cancelado: { texto: "Cancelado", cor: "text-ink-soft" },
};

const planLabel: Record<string, string> = { mensal: "Mensal", anual: "Anual" };

export default async function AdminUsuariosPage() {
  const [stats, profiles] = await Promise.all([getAdminStats(), getAllProfiles()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Gestão de usuários</h1>
        <p className="text-sm text-ink-soft">
          {stats.assinantesAtivos} assinantes ativos na plataforma
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Assinantes ativos" value={stats.assinantesAtivos} />
        <StatCard label="Novos este mês" value={stats.novosEsteMes} />
        <StatCard label="Cursos publicados" value={stats.cursosPublicados} />
        <StatCard label="Posts na comunidade" value={stats.postsComunidade} />
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
            {profiles.map((profile) => {
              const status = statusLabel[profile.plan_status] ?? statusLabel.ativo;
              return (
                <tr key={profile.id}>
                  <td className="px-4 py-3 font-semibold text-ink">
                    {profile.full_name || "—"}
                    {profile.role === "admin" && (
                      <span className="ml-1.5 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold-dark">
                        admin
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{profile.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{planLabel[profile.plan] ?? profile.plan}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${status.cor}`}>{status.texto}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
