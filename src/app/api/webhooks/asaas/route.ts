import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { statusParaEvento } from "@/lib/asaas-webhook";
import { logger } from "@/lib/log";

// Alguns painéis (Asaas incluído) fazem uma checagem de conectividade na URL
// antes de ativar/reativar o webhook. Sem isso, essa checagem batia 405 e o
// webhook nunca saía do estado "Interrompido".
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("asaas-access-token");
  if (!token || token !== process.env.ASAAS_WEBHOOK_TOKEN) {
    logger.aviso("webhook_asaas_token_invalido", {
      origem: request.headers.get("x-forwarded-for") ?? "desconhecida",
    });
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // O Asaas manda uma chamada de teste (corpo vazio/sem JSON) ao ativar o
  // webhook, só pra checar token + conectividade — sem isso, request.json()
  // lançava e o handler devolvia 500, e a ativação nunca vingava.
  let body: { event?: string; payment?: { subscription?: string; dueDate?: string } } = {};
  try {
    const texto = await request.text();
    if (texto) body = JSON.parse(texto);
  } catch {
    logger.info("webhook_asaas_corpo_vazio_ou_invalido", {});
  }

  const event = body?.event as string | undefined;
  const payment = body?.payment as { subscription?: string; dueDate?: string } | undefined;
  const subscriptionId = payment?.subscription;

  const planStatus = statusParaEvento(event);

  if (!planStatus || !subscriptionId) {
    logger.info("webhook_asaas_ignorado", { event, temAssinatura: Boolean(subscriptionId) });
    return NextResponse.json({ ok: true });
  }

  const supabase = createServiceClient();
  const { error, count } = await supabase
    .from("profiles")
    .update(
      { plan_status: planStatus, renews_at: payment?.dueDate ?? null },
      { count: "exact" }
    )
    .eq("asaas_subscription_id", subscriptionId);

  if (error) {
    logger.erro("webhook_asaas_update_falhou", {
      event,
      subscriptionId,
      erro: error.message,
    });
    // 500 faz o Asaas reenviar o evento depois — não perde a atualização.
    return NextResponse.json({ error: "update failed" }, { status: 500 });
  }

  logger.info("webhook_asaas_processado", {
    event,
    subscriptionId,
    planStatus,
    perfisAtualizados: count,
  });

  return NextResponse.json({ ok: true });
}
