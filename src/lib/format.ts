export function tempoRelativo(iso: string): string {
  const agora = Date.now();
  const then = new Date(iso).getTime();
  const diffSeg = Math.max(0, Math.floor((agora - then) / 1000));

  if (diffSeg < 60) return "agora";
  const min = Math.floor(diffSeg / 60);
  if (min < 60) return `${min} min atrás`;
  const horas = Math.floor(min / 60);
  if (horas < 24) return `${horas}h atrás`;
  const dias = Math.floor(horas / 24);
  if (dias < 30) return `${dias}d atrás`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
