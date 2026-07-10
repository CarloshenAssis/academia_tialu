"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { registerDevice } from "@/lib/device";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    if (data.user) {
      await registerDevice(supabase, data.user.id);
    }

    router.push("/home");
    router.refresh();
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Bem-vinda</h1>
      <p className="mt-1 text-sm text-ink-soft">Entre para continuar aprendendo</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input label="E-mail" name="email" type="email" placeholder="voce@email.com" autoComplete="email" required />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Sua senha"
          autoComplete="current-password"
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Link href="#" className="self-end text-xs font-medium text-ink-soft underline underline-offset-4">
          Esqueci minha senha
        </Link>

        <Button type="submit" variant="navy" className="mt-2" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-xs leading-relaxed text-ink-soft">
          🔒 Cada conta funciona em apenas um dispositivo por vez.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Não tem conta?{" "}
        <Link href="/cadastro" className="font-semibold text-navy underline underline-offset-4">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
