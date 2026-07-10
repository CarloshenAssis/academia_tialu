import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

const highlights = [
  "Mini cursos práticos toda semana",
  "Comunidade exclusiva de apoio",
  "Materiais para baixar e aplicar",
];

export default function BoasVindasPage() {
  return (
    <main className="app-shell flex min-h-screen w-full flex-1 flex-col justify-between bg-navy px-6 py-10 text-cream">
      <div />

      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold">
          <span className="font-display text-2xl font-bold text-navy">TL</span>
        </div>
        <h1 className="font-display text-3xl font-bold">Academia Tia Lu</h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/80">
          Organize sua vida financeira e sua rotina com quem entende do seu
          momento.
        </p>

        <ul className="mt-8 flex flex-col gap-3 text-left">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-cream/90">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <LinkButton href="/cadastro" variant="gold">
          Começar agora
        </LinkButton>
        <Link
          href="/login"
          className="text-center text-sm font-medium text-cream/80 underline underline-offset-4"
        >
          Já tenho conta — Entrar
        </Link>
      </div>
    </main>
  );
}
