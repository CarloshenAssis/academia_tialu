"use client";

import { useState, useTransition } from "react";
import { Check, Video } from "lucide-react";
import { atualizarVideoAula } from "../actions";

export function VideoRow({
  aulaId,
  titulo,
  cursoTitulo,
  youtubeIdInicial,
}: {
  aulaId: string;
  titulo: string;
  cursoTitulo: string;
  youtubeIdInicial: string;
}) {
  const [valor, setValor] = useState(youtubeIdInicial);
  const [salvo, setSalvo] = useState(false);
  const [isPending, startTransition] = useTransition();

  const alterado = valor.trim() !== youtubeIdInicial;

  function handleSalvar() {
    startTransition(async () => {
      const res = await atualizarVideoAula(aulaId, valor);
      if (!res?.error) {
        setSalvo(true);
        setTimeout(() => setSalvo(false), 1500);
      }
    });
  }

  return (
    <li className="flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
        <Video size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{titulo}</p>
        <p className="truncate text-xs text-ink-soft">{cursoTitulo}</p>
      </div>
      <input
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="w-32 rounded-lg border border-ink/10 bg-cream px-2.5 py-1.5 text-xs outline-none focus:border-gold sm:w-40"
      />
      <button
        onClick={handleSalvar}
        disabled={!alterado || isPending}
        className="inline-flex items-center gap-1 rounded-lg bg-navy px-2.5 py-1.5 text-xs font-semibold text-cream disabled:opacity-40"
      >
        <Check size={13} /> {salvo ? "Salvo" : "Salvar"}
      </button>
    </li>
  );
}
