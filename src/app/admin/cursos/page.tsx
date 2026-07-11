import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategorias, getCursos } from "@/lib/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { criarCurso, excluirCurso } from "../actions";

export default async function AdminCursosPage() {
  const [categorias, cursos] = await Promise.all([getCategorias(), getCursos()]);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Cursos</h1>
        <p className="text-sm text-ink-soft">Crie e organize os cursos da plataforma.</p>
      </div>

      <AdminForm action={criarCurso} submitLabel="Criar curso">
        <input
          name="titulo"
          placeholder="Título do curso"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <textarea
          name="descricao"
          rows={2}
          placeholder="Descrição"
          className="resize-none rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <select
          name="categoria_id"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        >
          <option value="">Sem categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
        <label className="flex flex-col gap-1 text-xs text-ink-soft">
          Capa do curso (opcional)
          <input
            name="capa"
            type="file"
            accept="image/*"
            className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-cream"
          />
        </label>
      </AdminForm>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {cursos.map((curso) => (
          <li key={curso.id} className="flex items-center justify-between gap-2 p-4">
            <Link href={`/admin/cursos/${curso.id}`} className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{curso.titulo}</p>
              <p className="text-xs text-ink-soft">{curso.categoria?.nome ?? "Sem categoria"}</p>
            </Link>
            <DeleteButton
              action={excluirCurso.bind(null, curso.id)}
              confirmMessage={`Excluir "${curso.titulo}" e todas as suas aulas?`}
            />
            <Link href={`/admin/cursos/${curso.id}`} className="text-ink-soft">
              <ChevronRight size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
