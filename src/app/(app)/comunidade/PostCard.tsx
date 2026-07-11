"use client";

import { useRef, useState, useTransition } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import type { PostComAutor } from "@/lib/queries";
import { tempoRelativo } from "@/lib/format";
import { toggleCurtida, criarResposta, listarRespostas, type RespostaComAutor } from "./actions";

export function PostCard({ post }: { post: PostComAutor }) {
  const [curtido, setCurtido] = useState(post.curtido_por_mim);
  const [curtidas, setCurtidas] = useState(post.curtidas);
  const [, startTransition] = useTransition();

  const [expandido, setExpandido] = useState(false);
  const [respostas, setRespostas] = useState<RespostaComAutor[] | null>(null);
  const [carregandoRespostas, setCarregandoRespostas] = useState(false);
  const [qtdRespostas, setQtdRespostas] = useState(post.respostas);

  const ehMentora = post.autor_role === "admin";

  function handleCurtir() {
    const estavaCurtido = curtido;
    setCurtido(!estavaCurtido);
    setCurtidas((n) => n + (estavaCurtido ? -1 : 1));
    startTransition(async () => {
      const res = await toggleCurtida(post.id, estavaCurtido);
      if (res?.error) {
        setCurtido(estavaCurtido);
        setCurtidas((n) => n + (estavaCurtido ? 1 : -1));
      }
    });
  }

  async function handleToggleExpandir() {
    const abrindo = !expandido;
    setExpandido(abrindo);
    if (abrindo && respostas === null) {
      setCarregandoRespostas(true);
      const dados = await listarRespostas(post.id);
      setRespostas(dados);
      setCarregandoRespostas(false);
    }
  }

  return (
    <li className="rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            ehMentora ? "bg-gold text-navy" : "bg-navy text-cream"
          }`}
        >
          {post.autor_nome.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-semibold leading-snug text-ink">
            {post.autor_nome}
            {ehMentora && (
              <span className="ml-1.5 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold-dark">
                Mentora
              </span>
            )}
          </p>
          <p className="text-xs text-ink-soft">{tempoRelativo(post.created_at)}</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink">{post.conteudo}</p>

      <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
        <button onClick={handleCurtir} className="flex items-center gap-1.5">
          <Heart
            size={15}
            className={curtido ? "text-danger" : ""}
            fill={curtido ? "currentColor" : "none"}
          />
          {curtidas}
        </button>
        <button onClick={handleToggleExpandir} className="flex items-center gap-1.5">
          <MessageCircle size={15} /> {qtdRespostas} respostas
        </button>
      </div>

      {expandido && (
        <div className="mt-3 flex flex-col gap-3 border-t border-ink/10 pt-3">
          {carregandoRespostas && <p className="text-xs text-ink-soft">Carregando respostas...</p>}

          {respostas && respostas.length > 0 && (
            <ul className="flex flex-col gap-3">
              {respostas.map((resposta) => (
                <li key={resposta.id} className="flex items-start gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      resposta.autor_role === "admin" ? "bg-gold text-navy" : "bg-navy text-cream"
                    }`}
                  >
                    {resposta.autor_nome.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-1 rounded-lg bg-cream px-3 py-2">
                    <p className="text-xs font-semibold text-ink">
                      {resposta.autor_nome}
                      <span className="ml-1.5 font-normal text-ink-soft">
                        {tempoRelativo(resposta.created_at)}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-ink">{resposta.conteudo}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <RespostaForm
            postId={post.id}
            onEnviado={(nova) => {
              setRespostas((prev) => [...(prev ?? []), nova]);
              setQtdRespostas((n) => n + 1);
            }}
          />
        </div>
      )}
    </li>
  );
}

function RespostaForm({
  postId,
  onEnviado,
}: {
  postId: string;
  onEnviado: (resposta: RespostaComAutor) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const conteudo = String(formData.get("conteudo") ?? "").trim();
    if (!conteudo) return;

    startTransition(async () => {
      const res = await criarResposta(postId, formData);
      if (res?.error) {
        setError(res.error);
        return;
      }
      formRef.current?.reset();
      onEnviado({
        id: crypto.randomUUID(),
        conteudo,
        created_at: new Date().toISOString(),
        autor_nome: "Você",
        autor_role: "aluno",
      });
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        name="conteudo"
        placeholder="Escreva uma resposta..."
        className="flex-1 rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={isPending}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-cream disabled:opacity-60"
        aria-label="Enviar resposta"
      >
        <Send size={14} />
      </button>
      {error && <p className="text-xs text-danger">{error}</p>}
    </form>
  );
}
