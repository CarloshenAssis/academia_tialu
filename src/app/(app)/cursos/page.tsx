import Link from "next/link";
import { Search } from "lucide-react";
import { courses } from "@/lib/mock-data";

export default function CursosPage() {
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-xl font-bold text-ink">Cursos</h1>

      <label className="flex items-center gap-2 rounded-xl border border-ink/10 bg-card px-4 py-3">
        <Search size={18} className="text-ink-soft" />
        <input
          type="search"
          placeholder="Buscar curso..."
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
        />
      </label>

      {categories.map((category) => (
        <section key={category} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-ink">{category}</h2>
          <div className="flex flex-col gap-3">
            {courses
              .filter((c) => c.category === category)
              .map((course) => (
                <Link
                  key={course.id}
                  href={`/cursos/${course.id}`}
                  className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
                >
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-navy" />
                  <div>
                    <p className="text-sm font-medium leading-snug text-ink">{course.title}</p>
                    <p className="text-xs text-ink-soft">
                      {course.lessonsCount} aulas · {course.duration}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
