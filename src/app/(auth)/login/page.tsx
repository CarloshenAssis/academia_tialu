import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Bem-vinda</h1>
      <p className="mt-1 text-sm text-ink-soft">Entre para continuar aprendendo</p>

      <form className="mt-8 flex flex-col gap-4">
        <Input label="E-mail" name="email" type="email" placeholder="voce@email.com" autoComplete="email" />
        <Input label="Senha" name="password" type="password" placeholder="Sua senha" autoComplete="current-password" />

        <Link href="#" className="self-end text-xs font-medium text-ink-soft underline underline-offset-4">
          Esqueci minha senha
        </Link>

        <Button type="submit" variant="navy" className="mt-2">
          Entrar
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
