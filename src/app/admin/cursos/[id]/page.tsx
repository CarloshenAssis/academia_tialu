import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAulas, getCurso } from "@/lib/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { criarAula, excluirAula } from "../../actions";

export default async function AdminCursoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const curso = await getCurso(id);
  if (!curso) notFound();

  const aulas = await getAulas(id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href="/admin/cursos"
          className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-ink-soft"
        >
          <ArrowLeft size={13} /> Voltar aos cursos
        </Link>
        <h1 className="font-display text-xl font-bold text-ink">{curso.titulo}</h1>
        <p className="text-sm text-ink-soft">{aulas.length} aulas · {curso.categoria?.nome ?? "Sem categoria"}</p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-ink">Nova aula</h2>
        <AdminForm action={criarAula} submitLabel="Adicionar aula">
          <input type="hidden" name="curso_id" value={id} />
          <input
            name="titulo"
            placeholder="Título da aula"
            className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <input
            name="youtube_video_id"
            placeholder="ID do vídeo do YouTube (ex: dQw4w9WgXcQ)"
            className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <div className="flex gap-2">
            <input
              name="duracao_min"
              type="number"
              placeholder="Duração (min)"
              className="w-32 rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
            />
            <input
              name="ordem"
              type="number"
              defaultValue={aulas.length + 1}
              placeholder="Ordem"
              className="w-24 rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>
          <label className="flex flex-col gap-1 text-xs text-ink-soft">
            Capa da aula (opcional)
            <input
              name="capa"
              type="file"
              accept="image/*"
              className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-cream"
            />
          </label>
        </AdminForm>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-ink">Aulas</h2>
        {aulas.length === 0 ? (
          <p className="rounded-xl bg-card p-6 text-center text-sm text-ink-soft shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
            Nenhuma aula ainda. Adicione a primeira acima.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
            {aulas.map((aula, i) => (
              <li key={aula.id} className="flex items-center gap-3 p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/10 text-[11px] font-semibold text-ink-soft">
                  {i + 1}
                </span>
                {aula.capa_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={aula.capa_url}
                    alt=""
                    className="h-10 w-16 shrink-0 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{aula.titulo}</p>
                  <p className="truncate text-xs text-ink-soft">
                    YouTube: {aula.youtube_video_id} · {aula.duracao_min} min
                  </p>
                </div>
                <DeleteButton
                  action={excluirAula.bind(null, aula.id, id)}
                  confirmMessage={`Excluir a aula "${aula.titulo}"?`}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
