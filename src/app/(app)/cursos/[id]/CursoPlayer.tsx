"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import type { Aula } from "@/lib/database.types";
import { Cover } from "@/components/app/Cover";
import { toggleAulaConcluida } from "./actions";

type Props = {
  curso: { id: string; titulo: string; descricao: string };
  aulas: Aula[];
  concluidasIniciais: string[];
};

export function CursoPlayer({ curso, aulas, concluidasIniciais }: Props) {
  const [concluidas, setConcluidas] = useState<Set<string>>(new Set(concluidasIniciais));
  const [aulaAtualId, setAulaAtualId] = useState<string>(() => {
    const primeiraNaoConcluida = aulas.find((a) => !concluidasIniciais.includes(a.id));
    return (primeiraNaoConcluida ?? aulas[0])?.id ?? "";
  });
  const [isPending, startTransition] = useTransition();

  const aulaAtual = aulas.find((a) => a.id === aulaAtualId);
  const indiceAtual = aulas.findIndex((a) => a.id === aulaAtualId) + 1;
  const concluidaAtual = aulaAtual ? concluidas.has(aulaAtual.id) : false;

  function handleToggle() {
    if (!aulaAtual) return;
    const novoEstado = !concluidaAtual;

    // Atualização otimista.
    setConcluidas((prev) => {
      const next = new Set(prev);
      if (novoEstado) next.add(aulaAtual.id);
      else next.delete(aulaAtual.id);
      return next;
    });

    startTransition(async () => {
      const res = await toggleAulaConcluida(aulaAtual.id, curso.id, novoEstado);
      if (res?.error) {
        // Reverte se der erro.
        setConcluidas((prev) => {
          const next = new Set(prev);
          if (novoEstado) next.delete(aulaAtual.id);
          else next.add(aulaAtual.id);
          return next;
        });
      }
    });
  }

  return (
    <div className="-mx-5 flex flex-col gap-5">
      <div className="aspect-video w-full bg-navy">
        {aulaAtual && (
          <iframe
            key={aulaAtual.id}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${aulaAtual.youtube_video_id}`}
            title={aulaAtual.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="flex flex-col gap-4 px-5">
        <div>
          <h1 className="font-display text-lg font-bold text-ink">
            {aulaAtual?.titulo ?? curso.titulo}
          </h1>
          <p className="mt-0.5 text-xs text-ink-soft">
            {curso.titulo} · Aula {indiceAtual} de {aulas.length}
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={isPending || !aulaAtual}
          className={`inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
            concluidaAtual
              ? "bg-navy text-cream"
              : "border border-navy text-navy"
          } disabled:opacity-60`}
        >
          <Check size={16} /> {concluidaAtual ? "Aula concluída" : "Marcar como concluída"}
        </button>

        {curso.descricao && (
          <p className="text-sm leading-relaxed text-ink-soft">{curso.descricao}</p>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-ink">Aulas do curso</h2>
          <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
            {aulas.map((aula, i) => {
              const feita = concluidas.has(aula.id);
              const atual = aula.id === aulaAtualId;
              return (
                <li key={aula.id}>
                  <button
                    onClick={() => setAulaAtualId(aula.id)}
                    className="flex w-full items-center gap-3 p-3.5 text-left"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        feita
                          ? "bg-navy text-cream"
                          : atual
                            ? "bg-gold text-navy"
                            : "bg-ink/10 text-ink-soft"
                      }`}
                    >
                      {feita ? <Check size={13} /> : i + 1}
                    </span>
                    {aula.capa_url && (
                      <Cover url={aula.capa_url} className="h-10 w-16 shrink-0 rounded-md" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm leading-snug ${atual ? "font-semibold text-ink" : "text-ink"}`}>
                        {aula.titulo}
                      </p>
                      <p className="text-xs text-ink-soft">{aula.duracao_min} min</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
