import { getAllProfiles } from "@/lib/admin-queries";

const statusLabel: Record<string, { texto: string; cor: string }> = {
  ativo: { texto: "Ativo", cor: "bg-success/15 text-success" },
  atrasado: { texto: "Atrasado", cor: "bg-danger/15 text-danger" },
  cancelado: { texto: "Cancelado", cor: "bg-ink/10 text-ink-soft" },
};

const planLabel: Record<string, string> = { mensal: "Mensal", anual: "Anual" };

export default async function AdminAssinaturasPage() {
  const profiles = await getAllProfiles();

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Assinaturas</h1>
        <p className="text-sm text-ink-soft">
          Planos e status de cobrança. A cobrança automática será integrada na próxima fase.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3 font-medium">Assinante</th>
              <th className="px-4 py-3 font-medium">Plano</th>
              <th className="px-4 py-3 font-medium">Renovação</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {profiles.map((profile) => {
              const status = statusLabel[profile.plan_status] ?? statusLabel.ativo;
              return (
                <tr key={profile.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{profile.full_name || "—"}</p>
                    <p className="text-xs text-ink-soft">{profile.email}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{planLabel[profile.plan] ?? profile.plan}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {profile.renews_at
                      ? new Date(profile.renews_at).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.cor}`}>
                      {status.texto}
                    </span>
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
