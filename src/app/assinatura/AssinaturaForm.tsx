"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { iniciarAssinatura } from "./actions";

export function AssinaturaForm({ cpfInicial }: { cpfInicial: string }) {
  const [state, formAction, pending] = useActionState(iniciarAssinatura, {});

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <Input
        label="CPF ou CNPJ"
        name="cpf_cnpj"
        defaultValue={cpfInicial}
        placeholder="Só números"
        inputMode="numeric"
        autoComplete="off"
        required
      />

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" variant="gold" className="mt-2" disabled={pending}>
        {pending ? "Gerando cobrança..." : "Assinar por R$ 29,90/mês"}
      </Button>

      <p className="text-center text-xs leading-relaxed text-ink-soft">
        🔒 Pagamento processado com segurança pelo Asaas. Você escolhe Pix, boleto ou cartão na
        próxima tela.
      </p>
    </form>
  );
}
