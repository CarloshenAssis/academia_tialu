"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function SenhaForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setOk(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const senha = String(formData.get("nova_senha"));
    const confirmar = String(formData.get("confirmar_senha"));

    if (senha.length < 6) {
      setError("A senha precisa ter no mínimo 6 caracteres.");
      return;
    }
    if (senha !== confirmar) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password: senha });
    setLoading(false);

    if (updateError) {
      setError("Não foi possível alterar a senha. Tente novamente.");
      return;
    }

    setOk(true);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nova senha"
        name="nova_senha"
        type="password"
        placeholder="Mínimo 6 caracteres"
        autoComplete="new-password"
        required
      />
      <Input
        label="Confirmar nova senha"
        name="confirmar_senha"
        type="password"
        placeholder="Repita a senha"
        autoComplete="new-password"
        required
      />

      {error && <p className="text-sm text-danger">{error}</p>}
      {ok && <p className="text-sm text-success">Senha alterada com sucesso!</p>}

      <Button type="submit" variant="navy" disabled={loading}>
        {loading ? "Alterando..." : "Alterar senha"}
      </Button>
    </form>
  );
}
