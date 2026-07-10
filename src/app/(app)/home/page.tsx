import Link from "next/link";
import { Play } from "lucide-react";
import { currentUser, courses, recentVideos } from "@/lib/mock-data";

export default function HomePage() {
  const featured = courses[0];
  const continuing = courses.filter((c) => c.progress !== undefined);

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-display text-xl font-bold text-ink">
        Bom dia, {currentUser.name.split(" ")[0]} 👋
      </h1>

      <Link
        href={`/cursos/${featured.id}`}
        className="block rounded-2xl bg-navy p-5 text-cream"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
          Curso em destaque
        </span>
        <h2 className="mt-2 font-display text-xl font-bold leading-snug">
          {featured.title}
        </h2>
        <p className="mt-1 text-xs text-cream/70">
          {featured.lessonsCount} aulas · {featured.duration}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy">
          <Play size={14} fill="currentColor" /> Assistir agora
        </span>
      </Link>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-ink">Continue assistindo</h3>
        <div className="flex gap-3 overflow-x-auto">
          {continuing.map((course) => (
            <Link
              key={course.id}
              href={`/cursos/${course.id}`}
              className="w-40 shrink-0 rounded-xl bg-navy p-3 text-cream"
            >
              <div className="mb-2 h-1 w-full rounded-full bg-cream/20">
                <div
                  className="h-1 rounded-full bg-gold"
                  style={{ width: `${(course.progress ?? 0) * 100}%` }}
                />
              </div>
              <p className="text-xs font-medium leading-snug">{course.title}</p>
              <p className="mt-1 text-[11px] text-cream/60">
                Aula {Math.round((course.progress ?? 0) * course.lessonsCount)} de{" "}
                {course.lessonsCount}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-ink">Últimos vídeos publicados</h3>
        <ul className="flex flex-col gap-2.5">
          {recentVideos.map((video) => (
            <li
              key={video.id}
              className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Play size={14} fill="currentColor" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-snug text-ink">{video.title}</p>
                <p className="text-xs text-ink-soft">{video.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
