import Link from "next/link";
import { Play } from "lucide-react";
import { getCurrentProfile, getCursosComProgresso } from "@/lib/queries";
import { Cover } from "@/components/app/Cover";

export default async function HomePage() {
  const [profile, cursos] = await Promise.all([
    getCurrentProfile(),
    getCursosComProgresso(),
  ]);

  const primeiroNome = (profile?.full_name || "Aluna").split(" ")[0];
  const featured = cursos[0];
  const continuando = cursos.filter((c) => c.aulasConcluidas > 0 && c.progresso < 1);

  return (
    <div className="flex flex-col gap-7 md:mx-auto md:max-w-5xl">
      <h1 className="font-display text-xl font-bold text-ink">Bom dia, {primeiroNome} 👋</h1>

      {featured && (
        <Link href={`/cursos/${featured.id}`} className="relative block overflow-hidden rounded-2xl bg-navy">
          {featured.capa_url && (
            <>
              <Cover url={featured.capa_url} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-navy/70" />
            </>
          )}
          <div className="relative p-5 text-cream">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              Curso em destaque
            </span>
            <h2 className="mt-2 font-display text-xl font-bold leading-snug">{featured.titulo}</h2>
            <p className="mt-1 text-xs text-cream/70">{featured.totalAulas} aulas</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy">
              <Play size={14} fill="currentColor" /> Assistir agora
            </span>
          </div>
        </Link>
      )}

      {continuando.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">Continue assistindo</h3>
          <div className="flex gap-3 overflow-x-auto">
            {continuando.map((curso) => (
              <Link
                key={curso.id}
                href={`/cursos/${curso.id}`}
                className="relative w-40 shrink-0 overflow-hidden rounded-xl bg-navy"
              >
                {curso.capa_url && (
                  <>
                    <Cover url={curso.capa_url} className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 bg-navy/70" />
                  </>
                )}
                <div className="relative p-3 text-cream">
                  <div className="mb-2 h-1 w-full rounded-full bg-cream/20">
                    <div
                      className="h-1 rounded-full bg-gold"
                      style={{ width: `${curso.progresso * 100}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium leading-snug">{curso.titulo}</p>
                  <p className="mt-1 text-[11px] text-cream/60">
                    Aula {curso.aulasConcluidas} de {curso.totalAulas}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-ink">Todos os cursos</h3>
        <ul className="flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
          {cursos.map((curso) => (
            <li key={curso.id}>
              <Link
                href={`/cursos/${curso.id}`}
                className="flex h-full items-center gap-3 rounded-xl bg-card p-3 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
              >
                {curso.capa_url ? (
                  <Cover url={curso.capa_url} className="h-12 w-12 shrink-0 rounded-lg" />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Play size={14} fill="currentColor" />
                  </span>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug text-ink">{curso.titulo}</p>
                  <p className="text-xs text-ink-soft">
                    {curso.categoria?.nome ?? "Curso"} · {curso.totalAulas} aulas
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
