// Logs estruturados em JSON: a Vercel indexa cada linha, então dá pra
// filtrar por evento/nível no painel de Runtime Logs (ex.: `nivel:erro`).
type Nivel = "info" | "aviso" | "erro";

function log(nivel: Nivel, evento: string, dados: Record<string, unknown> = {}) {
  const linha = JSON.stringify({
    nivel,
    evento,
    ...dados,
    ts: new Date().toISOString(),
  });

  if (nivel === "erro") console.error(linha);
  else if (nivel === "aviso") console.warn(linha);
  else console.log(linha);
}

export const logger = {
  info: (evento: string, dados?: Record<string, unknown>) => log("info", evento, dados),
  aviso: (evento: string, dados?: Record<string, unknown>) => log("aviso", evento, dados),
  erro: (evento: string, dados?: Record<string, unknown>) => log("erro", evento, dados),
};
