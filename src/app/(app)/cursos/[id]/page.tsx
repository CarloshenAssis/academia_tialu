import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { courses } from "@/lib/mock-data";

export default async function CursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const currentLesson =
    course.lessons.find((lesson) => !lesson.completed) ?? course.lessons[0];
  const currentIndex = currentLesson
    ? course.lessons.findIndex((l) => l.id === currentLesson.id) + 1
    : 0;

  return (
    <div className="-mx-5 flex flex-col gap-5">
      <div className="aspect-video w-full bg-navy">
        {currentLesson && (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${currentLesson.youtubeVideoId}`}
            title={currentLesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="flex flex-col gap-4 px-5">
        <div>
          <h1 className="font-display text-lg font-bold text-ink">
            {currentLesson?.title ?? course.title}
          </h1>
          <p className="mt-0.5 text-xs text-ink-soft">
            {course.title} · Aula {currentIndex} de {course.lessonsCount}
          </p>
        </div>

        <button className="inline-flex w-fit items-center gap-2 rounded-xl border border-navy px-4 py-2 text-sm font-semibold text-navy">
          <Check size={16} /> Marcar como concluído
        </button>

        <p className="text-sm leading-relaxed text-ink-soft">{course.description}</p>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-ink">Aulas do curso</h2>
          <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
            {course.lessons.map((lesson, i) => (
              <li key={lesson.id} className="flex items-center gap-3 p-3.5">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    lesson.completed
                      ? "bg-navy text-cream"
                      : lesson.id === currentLesson?.id
                        ? "bg-gold text-navy"
                        : "bg-ink/10 text-ink-soft"
                  }`}
                >
                  {lesson.completed ? <Check size={13} /> : i + 1}
                </span>
                <div className="flex-1">
                  <p
                    className={`text-sm leading-snug ${
                      lesson.id === currentLesson?.id ? "font-semibold text-ink" : "text-ink"
                    }`}
                  >
                    {lesson.title}
                  </p>
                  <p className="text-xs text-ink-soft">{lesson.duration}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
