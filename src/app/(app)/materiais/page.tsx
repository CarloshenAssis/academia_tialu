import { Download, FileText } from "lucide-react";
import { materials } from "@/lib/mock-data";

export default function MateriaisPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Materiais</h1>
        <p className="text-sm text-ink-soft">PDFs, planilhas e arquivos complementares</p>
      </div>

      <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        {materials.map((material) => (
          <li key={material.id} className="flex items-center gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <FileText size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium leading-snug text-ink">{material.title}</p>
              <p className="text-xs text-ink-soft">
                {material.courseTitle} · {material.type} · {material.size}
              </p>
            </div>
            <a
              href={material.fileUrl}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy"
              aria-label={`Baixar ${material.title}`}
            >
              <Download size={18} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
