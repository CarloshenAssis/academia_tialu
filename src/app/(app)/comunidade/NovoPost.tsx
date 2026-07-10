"use client";

import { useRef, useState, useTransition } from "react";
import { Send } from "lucide-react";
import { criarPost } from "./actions";

export function NovoPost() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const res = await criarPost(formData);
      if (res?.error) setError(res.error);
      else formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-xl bg-card p-3 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
    >
      <textarea
        name="conteudo"
        rows={2}
        placeholder="Compartilhe algo com a turma..."
        className="w-full resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
      />
      {error && <p className="mb-2 text-xs text-danger">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3.5 py-2 text-xs font-semibold text-cream disabled:opacity-60"
        >
          <Send size={13} /> {isPending ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </form>
  );
}
