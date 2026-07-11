"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarSenhaPage() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });

    setLoading(false);

    if (resetError) {
      setError("Não foi possível enviar o e-mail. Confira o endereço e tente de novo.");
      return;
    }

    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Confira seu e-mail 💌</h1>
        <p className="text-sm leading-relaxed text-ink-soft">
          Se existir uma conta com esse endereço, enviamos um link pra você
          criar uma senha nova. Vale a pena olhar também na caixa de spam.
        </p>
        <Link
          href="/login"
          className="mt-2 text-sm font-semibold text-navy underline underline-offset-4"
        >
          Voltar para o login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Recuperar senha</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Digite o e-mail da sua conta e enviaremos um link pra criar uma senha nova.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input
          label="E-mail"
          name="email"
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" variant="navy" className="mt-2" disabled={loading}>
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Lembrou a senha?{" "}
        <Link href="/login" className="font-semibold text-navy underline underline-offset-4">
          Entrar
        </Link>
      </p>
    </>
  );
}
