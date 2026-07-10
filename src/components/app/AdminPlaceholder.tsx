export function AdminPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      <p className="text-sm text-ink-soft">{description}</p>
      <div className="mt-4 rounded-xl border border-dashed border-ink/20 bg-card/50 p-8 text-center text-sm text-ink-soft">
        Em construção — chega na próxima etapa.
      </div>
    </div>
  );
}
