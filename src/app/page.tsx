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
];

const destaqueCursosNovos = {
  icon: Sparkles,
  titulo: "Cursos novos toda semana",
  descricao: "Conteúdo sempre atualizado, direto da experiência da Tia Lu.",
};

const publico = [
  "Tias de igreja e líderes de EBD",
  "Professoras de educação infantil e fundamental",
  "Quem cuida ou ensina crianças e quer ideias novas toda semana",
];

export default function HomeLandingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-cream text-ink">
      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden bg-navy px-6 pb-24 pt-16 text-center text-cream md:pb-32 md:pt-24">
        <div className="blob-float pointer-events-none absolute -top-16 -left-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="blob-float-slow pointer-events-none absolute top-10 right-[-4rem] h-72 w-72 rounded-full bg-navy-light/60 blur-3xl" />
        <div className="blob-float pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-gold-dark/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
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
        </div>

        <svg
          className="absolute inset-x-0 bottom-0 h-16 w-full md:h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,40 C320,100 1120,-10 1440,50 L1440,100 L0,100 Z" fill="var(--color-cream)" />
        </svg>
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
      <section className="relative overflow-hidden bg-cream-soft px-6 py-14 md:py-20">
        <div className="blob-float-slow pointer-events-none absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-bold text-ink md:text-3xl">
            O que você encontra aqui
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card destaque: EBD */}
            <div className="relative overflow-hidden rounded-[2rem] bg-navy p-7 text-cream md:p-8">
              <div className="blob-float pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                <BookOpen size={24} />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold">
                {recursos[0].titulo}
              </h3>
              <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-cream/75">
                {recursos[0].descricao}
              </p>
            </div>

            {/* Card destaque: Cursos novos */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold/25 via-gold/10 to-transparent p-7 md:p-8">
              <div className="blob-float-slow pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold/25 blur-2xl" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-gold-dark shadow-sm">
                <destaqueCursosNovos.icon size={24} />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold text-ink">
                {destaqueCursosNovos.titulo}
              </h3>
              <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                {destaqueCursosNovos.descricao}
              </p>
            </div>

            {/* Cards menores */}
            {recursos.slice(1).map(({ icon: Icon, titulo, descricao }) => (
              <div
                key={titulo}
                className="flex flex-col gap-3 rounded-[1.75rem] bg-card p-6 shadow-[0_2px_14px_rgba(22,33,62,0.06)] md:col-span-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/20 text-gold-dark">
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
      <section className="relative overflow-hidden px-6 py-14 md:py-20">
        <div className="blob-float pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-xl">
          <h2 className="text-center font-display text-2xl font-bold text-ink md:text-3xl">
            Para quem é
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {publico.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-card/70 p-4 shadow-[0_2px_10px_rgba(22,33,62,0.04)] backdrop-blur-sm"
              >
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
      <section className="px-6 py-6 md:py-10">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-navy px-7 py-12 text-cream md:px-14 md:py-16">
          <div className="blob-float pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="blob-float-slow pointer-events-none absolute bottom-[-4rem] left-[-2rem] h-56 w-56 rounded-full bg-navy-light/70 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                <Users size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold md:text-3xl">
                Uma comunidade só de tias e professoras
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/75 md:text-base">
                Troque ideias, tire dúvidas e compartilhe o que funcionou na sua
                turma com outras educadoras que entendem exatamente o seu dia a
                dia.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream/95 px-4 py-3 text-sm text-ink shadow-lg">
                Alguém tem ideia de brincadeira pra história de Davi e Golias? 👀
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gold px-4 py-3 text-sm text-navy shadow-lg">
                Tenho sim! Fiz uma &ldquo;batalha de bolinha de papel&rdquo; — bombou aqui 🙌
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream/95 px-4 py-3 text-sm text-ink shadow-lg">
                Genial, vou testar semana que vem. Obrigada! 💛
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-14 md:py-20">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] bg-cream-soft px-8 py-14 text-center">
          <div className="blob-float-slow pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
          <div className="blob-float pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold-dark/15 blur-3xl" />

          <h2 className="relative font-display text-2xl font-bold text-ink md:text-3xl">
            Pronta para começar?
          </h2>
          <div className="relative mx-auto mt-7 flex w-full max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:justify-center">
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
        </div>
      </section>

      <footer className="border-t border-ink/10 px-6 py-8 text-center text-xs text-ink-soft">
        Academia Tia Lu
      </footer>
    </main>
  );
}
