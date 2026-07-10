import { getAllAulasComCurso } from "@/lib/admin-queries";
import { VideoRow } from "./VideoRow";

export default async function AdminVideosPage() {
  const aulas = await getAllAulasComCurso();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Vídeos (YouTube)</h1>
        <p className="text-sm text-ink-soft">
          Cada aula usa um vídeo <strong>não listado</strong> do YouTube. Cole aqui apenas o ID do
          vídeo (o trecho depois de <code>v=</code>).
        </p>
      </div>

      {aulas.length === 0 ? (
        <p className="rounded-xl bg-card p-6 text-center text-sm text-ink-soft shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          Nenhuma aula cadastrada ainda. Crie aulas dentro de cada curso.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          {aulas.map((aula) => (
            <VideoRow
              key={aula.id}
              aulaId={aula.id}
              titulo={aula.titulo}
              cursoTitulo={aula.curso?.titulo ?? "Sem curso"}
              youtubeIdInicial={aula.youtube_video_id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
