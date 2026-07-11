"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function RedefinirSenhaPage() {
  const [pronto, setPronto] = useState(false);
  const [semSessao, setSemSessao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // O createBrowserClient troca automaticamente o código do link de
    // recuperação por uma sessão ao ser instanciado nesta página.
    const supabase = createClient();
    const timeout = setTimeout(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setPronto(true);
      } else {
        setSemSessao(true);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
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

    if (updateError) {
      setError("Não foi possível salvar a nova senha. Abra o link do e-mail novamente.");
      setLoading(false);
      return;
    }

    window.location.assign("/home");
  }

  if (semSessao) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Link expirado</h1>
        <p className="text-sm leading-relaxed text-ink-soft">
          Esse link de recuperação não é mais válido. Peça um novo pra continuar.
        </p>
        <a
          href="/recuperar-senha"
          className="mt-2 text-sm font-semibold text-navy underline underline-offset-4"
        >
          Pedir novo link
        </a>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Criar nova senha</h1>
      <p className="mt-1 text-sm text-ink-soft">Escolha uma senha nova pra sua conta.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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

        <Button type="submit" variant="navy" className="mt-2" disabled={loading || !pronto}>
          {loading ? "Salvando..." : pronto ? "Salvar nova senha" : "Verificando link..."}
        </Button>
      </form>
    </>
  );
}
