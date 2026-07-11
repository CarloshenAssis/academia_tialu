import Link from "next/link";
import {
  BookOpen,
  Scissors,
  FileImage,
  Gamepad2,
  Lightbulb,
  Sparkles,
  Users,
  Check,
} from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const recursos = [
  {
    icon: BookOpen,
    titulo: "Aulas de EBD prontas",
    descricao: "Conteúdo bíblico explicado de um jeito simples de aplicar com a turminha.",
  },
  {
    icon: Scissors,
    titulo: "Artesanato e atividades manuais",
    descricao: "Moldes e passo a passo de trabalhinhos que as crianças amam fazer.",
  },
  {
    icon: FileImage,
    titulo: "PDFs e imagens pra imprimir",
    descricao: "Materiais prontos pra usar na aula, sem precisar criar nada do zero.",
  },
  {
    icon: Gamepad2,
    titulo: "Jogos e brincadeiras educativas",
    descricao: "Atividades que ensinam brincando, pra sala nunca ficar parada.",
  },
  {
    icon: Lightbulb,
    titulo: "Dicas pra prender a atenção",
    descricao: "Estratégias práticas pra turma ficar engajada do início ao fim.",
  },
  {
    icon: Sparkles,
    titulo: "Cursos novos toda semana",
    descricao: "Conteúdo sempre atualizado, direto da experiência da Tia Lu.",
  },
];

const publico = [
  "Tias de igreja e líderes de EBD",
  "Professoras de educação infantil e fundamental",
  "Quem cuida ou ensina crianças e quer ideias novas toda semana",
];

export default function HomeLandingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-cream text-ink">
      {/* Hero */}
      <section className="flex flex-col items-center bg-navy px-6 py-16 text-center text-cream md:py-24">
        <Logo size={80} className="mb-6" />
        <h1 className="font-display text-3xl font-bold md:text-5xl">Academia Tia Lu</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:max-w-xl md:text-lg">
          O espaço de quem ensina, cuida e encanta crianças — feito para tias de
          igreja, professoras de EBD e educadoras que querem ideias prontas pra
          aplicar.
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:justify-center">
          <LinkButton href="/cadastro" variant="gold" className="md:w-56">
            Começar agora
          </LinkButton>
          <Link
            href="/login"
            className="text-center text-sm font-medium text-cream/80 underline underline-offset-4 md:self-center"
          >
            Já tenho conta — Entrar
          </Link>
        </div>
      </section>

      {/* Propósito */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            Por que a Academia Tia Lu existe
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
            Ensinar criança é vocação — mas também é trabalho de garimpar ideia,
            imprimir molde e pensar em brincadeira nova toda semana. A Tia Lu
            criou esse espaço pra reunir, num só lugar, tudo que uma tia de
            igreja ou professora precisa pra preparar uma aula boa sem virar a
            noite pesquisando.
          </p>
        </div>
      </section>

      {/* O que você encontra aqui */}
      <section className="bg-cream-soft px-6 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-bold text-ink md:text-3xl">
            O que você encontra aqui
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recursos.map(({ icon: Icon, titulo, descricao }) => (
              <div
                key={titulo}
                className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20 text-gold-dark">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-base font-bold text-ink">{titulo}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center font-display text-2xl font-bold text-ink md:text-3xl">
            Para quem é
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {publico.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                  <Check size={14} />
                </span>
                <span className="text-sm leading-relaxed text-ink md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comunidade */}
      <section className="bg-navy px-6 py-14 text-center text-cream md:py-20">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Users size={22} />
          </span>
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Uma comunidade só de tias e professoras
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/80 md:text-base">
            Troque ideias, tire dúvidas e compartilhe o que funcionou na sua
            turma com outras educadoras que entendem exatamente o seu dia a dia.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-14 text-center md:py-20">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          Pronta para começar?
        </h2>
        <div className="mx-auto mt-7 flex w-full max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:justify-center">
          <LinkButton href="/cadastro" variant="navy" className="md:w-56">
            Criar minha conta
          </LinkButton>
          <Link
            href="/login"
            className="text-center text-sm font-medium text-ink-soft underline underline-offset-4 md:self-center"
          >
            Já tenho conta — Entrar
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink/10 px-6 py-8 text-center text-xs text-ink-soft">
        Academia Tia Lu
      </footer>
    </main>
  );
}
