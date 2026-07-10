import { getPostsParaModeracao } from "@/lib/admin-queries";
import { tempoRelativo } from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { excluirPost } from "../actions";

export default async function AdminModeracaoPage() {
  const posts = await getPostsParaModeracao();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Moderação</h1>
        <p className="text-sm text-ink-soft">Revise e remova publicações da comunidade.</p>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl bg-card p-6 text-center text-sm text-ink-soft shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          Nenhuma publicação na comunidade.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{post.autor_nome}</p>
                  <p className="text-xs text-ink-soft">
                    {post.autor_email} · {tempoRelativo(post.created_at)}
                  </p>
                </div>
                <DeleteButton
                  action={excluirPost.bind(null, post.id)}
                  confirmMessage="Excluir esta publicação da comunidade?"
                  label="Remover"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink">{post.conteudo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
