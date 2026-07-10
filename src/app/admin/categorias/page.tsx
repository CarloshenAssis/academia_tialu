import { getCategorias } from "@/lib/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { criarCategoria, excluirCategoria } from "../actions";

export default async function AdminCategoriasPage() {
  const categorias = await getCategorias();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Categorias</h1>
        <p className="text-sm text-ink-soft">Organize os cursos por categoria.</p>
      </div>

      <AdminForm action={criarCategoria} submitLabel="Adicionar categoria">
        <input
          name="nome"
          placeholder="Nome da categoria"
          className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <input
          name="ordem"
          type="number"
          defaultValue={categorias.length + 1}
          placeholder="Ordem"
          className="w-28 rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
        />
      </AdminForm>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {categorias.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-ink">{cat.nome}</span>
            <DeleteButton
              action={excluirCategoria.bind(null, cat.id)}
              confirmMessage={`Excluir a categoria "${cat.nome}"? Os cursos ficarão sem categoria.`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
