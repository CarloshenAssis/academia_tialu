import { notFound } from "next/navigation";
import { getAulas, getCurso, getProgressoDoCurso } from "@/lib/queries";
import { CursoPlayer } from "./CursoPlayer";

export default async function CursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const curso = await getCurso(id);
  if (!curso) notFound();

  const aulas = await getAulas(id);
  const concluidas = await getProgressoDoCurso(
    id,
    aulas.map((a) => a.id)
  );

  return (
    <CursoPlayer
      curso={{ id: curso.id, titulo: curso.titulo, descricao: curso.descricao }}
      aulas={aulas}
      concluidasIniciais={Array.from(concluidas)}
    />
  );
}
