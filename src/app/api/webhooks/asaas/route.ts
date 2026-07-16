import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { statusParaEvento } from "@/lib/asaas-webhook";
import { logger } from "@/lib/log";

export async function POST(request: NextRequest) {
  const token = request.headers.get("asaas-access-token");
  if (!token || token !== process.env.ASAAS_WEBHOOK_TOKEN) {
    logger.aviso("webhook_asaas_token_invalido", {
      origem: request.headers.get("x-forwarded-for") ?? "desconhecida",
    });
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
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
