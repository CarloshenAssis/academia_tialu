"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmMessage = "Tem certeza que deseja excluir?",
  label,
}: {
  action: () => Promise<{ ok?: boolean; error?: string } | void>;
  confirmMessage?: string;
  label?: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-danger hover:bg-danger/10 disabled:opacity-60"
      aria-label={label ?? "Excluir"}
    >
      <Trash2 size={14} />
      {label}
    </button>
  );
}
