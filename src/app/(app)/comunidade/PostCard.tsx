"use client";

import { useState, useTransition } from "react";
import { Heart, MessageCircle } from "lucide-react";
import type { PostComAutor } from "@/lib/queries";
import { tempoRelativo } from "@/lib/format";
import { toggleCurtida } from "./actions";

export function PostCard({ post }: { post: PostComAutor }) {
  const [curtido, setCurtido] = useState(post.curtido_por_mim);
  const [curtidas, setCurtidas] = useState(post.curtidas);
  const [, startTransition] = useTransition();

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
        <span className="flex items-center gap-1.5">
          <MessageCircle size={15} /> {post.respostas} respostas
        </span>
      </div>
    </li>
  );
}
