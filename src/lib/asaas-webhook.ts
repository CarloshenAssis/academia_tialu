// Regra central do webhook: qual evento do Asaas leva a qual status de
// plano. Isolada aqui pra ser testável sem servidor/banco.
export type PlanStatusWebhook = "ativo" | "atrasado" | "cancelado";

const EVENTOS_ATIVA = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);
const EVENTOS_ATRASADA = new Set(["PAYMENT_OVERDUE"]);
const EVENTOS_CANCELADA = new Set(["PAYMENT_DELETED", "PAYMENT_REFUNDED"]);

export function statusParaEvento(evento: string | undefined): PlanStatusWebhook | null {
  if (!evento) return null;
  if (EVENTOS_ATIVA.has(evento)) return "ativo";
  if (EVENTOS_ATRASADA.has(evento)) return "atrasado";
  if (EVENTOS_CANCELADA.has(evento)) return "cancelado";
  return null;
}

export function validarCpfCnpj(valor: string): string | null {
  const numeros = valor.replace(/\D/g, "");
  return numeros.length === 11 || numeros.length === 14 ? numeros : null;
}
