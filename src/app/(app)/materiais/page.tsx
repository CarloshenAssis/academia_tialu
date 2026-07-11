import { Download, FileText } from "lucide-react";
import { getMateriais } from "@/lib/queries";

function formatTamanho(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export default async function MateriaisPage() {
  const materiais = await getMateriais();

  return (
    <div className="flex flex-col gap-5 md:mx-auto md:max-w-2xl">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Materiais</h1>
        <p className="text-sm text-ink-soft">PDFs, planilhas e arquivos complementares</p>
      </div>

      {materiais.length === 0 ? (
        <p className="rounded-xl bg-card p-6 text-center text-sm text-ink-soft shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          Nenhum material disponível ainda.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-ink/10 rounded-xl bg-card shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          {materiais.map((material) => (
            <li key={material.id} className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold">
                <FileText size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-snug text-ink">{material.titulo}</p>
                <p className="text-xs text-ink-soft">
                  {material.curso?.titulo ? `${material.curso.titulo} · ` : ""}
                  {material.tipo} · {formatTamanho(material.tamanho_kb)}
                </p>
              </div>
              <a
                href={material.arquivo_url}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy"
                aria-label={`Baixar ${material.titulo}`}
              >
                <Download size={18} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
