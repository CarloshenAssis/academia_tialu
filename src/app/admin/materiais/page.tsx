import { FileText } from "lucide-react";
import { getCursos, getMateriais } from "@/lib/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { criarMaterial, excluirMaterial } from "../actions";

export default async function AdminMateriaisPage() {
  const [cursos, materiais] = await Promise.all([getCursos(), getMateriais()]);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">PDFs e materiais</h1>
        <p className="text-sm text-ink-soft">Materiais complementares das aulas.</p>
      </div>

      <AdminForm action={criarMaterial} submitLabel="Adicionar material">
        <input
          name="titulo"
          placeholder="Título do material"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <select
          name="tipo"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        >
          {["PDF", "Planilha", "Checklist", "Mapa"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          name="curso_id"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        >
          <option value="">Sem curso vinculado</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.titulo}
            </option>
          ))}
        </select>
        <label className="flex flex-col gap-1 text-xs text-ink-soft">
          Arquivo (PDF, imagem, planilha...)
          <input
            name="arquivo"
            type="file"
            required
            className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-cream"
          />
        </label>
      </AdminForm>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {materiais.map((material) => (
          <li key={material.id} className="flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <FileText size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{material.titulo}</p>
              <p className="truncate text-xs text-ink-soft">
                {material.tipo}
                {material.curso?.titulo ? ` · ${material.curso.titulo}` : ""}
              </p>
            </div>
            <DeleteButton
              action={excluirMaterial.bind(null, material.id)}
              confirmMessage={`Excluir "${material.titulo}"?`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
