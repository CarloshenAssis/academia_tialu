"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { registerDevice } from "@/lib/device";

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const passwordConfirm = String(formData.get("passwordConfirm"));

    if (password.length < 6) {
      setError("A senha precisa ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "Este e-mail já tem uma conta."
          : "Não foi possível criar a conta. Tente novamente."
      );
      setLoading(false);
      return;
    }

    if (!data.session) {
      setConfirmEmailSent(true);
      setLoading(false);
      return;
    }

    if (data.user) {
      await registerDevice(supabase, data.user.id);
    }

    router.push("/home");
    router.refresh();
  }

  if (confirmEmailSent) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Quase lá!</h1>
        <p className="text-sm text-ink-soft">
          Enviamos um link de confirmação para o seu e-mail. Clique nele para
          ativar sua conta e depois faça login.
        </p>
        <Link href="/login" className="mt-2 text-sm font-semibold text-navy underline underline-offset-4">
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Criar conta</h1>
      <p className="mt-1 text-sm text-ink-soft">Comece sua jornada com a Tia Lu</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input label="Nome completo" name="name" placeholder="Como podemos te chamar?" autoComplete="name" required />
        <Input label="E-mail" name="email" type="email" placeholder="voce@email.com" autoComplete="email" required />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirmar senha"
          name="passwordConfirm"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <p className="text-xs leading-relaxed text-ink-soft">
          🔒 Sua conta é pessoal e pode ser usada em apenas um dispositivo por
          vez.
        </p>

        <Button type="submit" variant="navy" className="mt-2" disabled={loading}>
          {loading ? "Criando conta..." : "Criar minha conta"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-navy underline underline-offset-4">
          Entrar
        </Link>
      </p>
    </>
  );
}
