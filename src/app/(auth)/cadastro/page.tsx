import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CadastroPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-ink">Criar conta</h1>
      <p className="mt-1 text-sm text-ink-soft">Comece sua jornada com a Tia Lu</p>

      <form className="mt-8 flex flex-col gap-4">
        <Input label="Nome completo" name="name" placeholder="Como podemos te chamar?" autoComplete="name" />
        <Input label="E-mail" name="email" type="email" placeholder="voce@email.com" autoComplete="email" />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
        />
        <Input
          label="Confirmar senha"
          name="passwordConfirm"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
        />

        <p className="text-xs leading-relaxed text-ink-soft">
          🔒 Sua conta é pessoal e pode ser usada em apenas um dispositivo por
          vez.
        </p>

        <Button type="submit" variant="navy" className="mt-2">
          Criar minha conta
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
