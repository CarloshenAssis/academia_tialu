"use client";

import { ReactNode, useRef, useState, useTransition } from "react";

type Result = { ok?: boolean; error?: string } | void;

export function AdminForm({
  action,
  children,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<Result>;
  children: ReactNode;
  submitLabel: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const res = await action(formData);
      if (res && "error" in res && res.error) setError(res.error);
      else formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
    >
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream disabled:opacity-60"
      >
        {isPending ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
