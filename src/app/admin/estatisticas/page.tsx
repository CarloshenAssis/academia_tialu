import { getEstatisticasDetalhadas } from "@/lib/admin-queries";
import { StatCard } from "@/components/app/StatCard";

export default async function AdminEstatisticasPage() {
  const stats = await getEstatisticasDetalhadas();

  const totalPlanos = stats.planoMensal + stats.planoAnual || 1;
  const pctAnual = Math.round((stats.planoAnual / totalPlanos) * 100);
  const pctMensal = 100 - pctAnual;

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Estatísticas</h1>
        <p className="text-sm text-ink-soft">Panorama geral da plataforma.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Usuários totais" value={stats.totalUsuarios} />
        <StatCard label="Assinantes ativos" value={stats.assinantesAtivos} />
        <StatCard label="Novos este mês" value={stats.novosEsteMes} />
        <StatCard label="Posts na comunidade" value={stats.postsComunidade} />
        <StatCard label="Cursos publicados" value={stats.cursosPublicados} />
        <StatCard label="Aulas cadastradas" value={stats.totalAulas} />
        <StatCard label="Materiais" value={stats.totalMateriais} />
        <StatCard label="Categorias" value={stats.totalCategorias} />
      </div>

      <div className="rounded-xl bg-card p-5 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        <h2 className="text-sm font-semibold text-ink">Distribuição de planos</h2>
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-ink/10">
          <div className="bg-gold" style={{ width: `${pctAnual}%` }} />
          <div className="bg-navy" style={{ width: `${pctMensal}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-xs text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" /> Anual: {stats.planoAnual} ({pctAnual}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-navy" /> Mensal: {stats.planoMensal} ({pctMensal}%)
          </span>
        </div>
      </div>
    </div>
  );
}
