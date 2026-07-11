import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const EVENTOS_ATIVA = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);
const EVENTOS_ATRASADA = new Set(["PAYMENT_OVERDUE"]);
const EVENTOS_CANCELADA = new Set(["PAYMENT_DELETED", "PAYMENT_REFUNDED"]);

export async function POST(request: NextRequest) {
  const token = request.headers.get("asaas-access-token");
  if (!token || token !== process.env.ASAAS_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const event = body?.event as string | undefined;
  const payment = body?.payment as { subscription?: string; dueDate?: string } | undefined;
  const subscriptionId = payment?.subscription;

  if (!event || !subscriptionId) {
    return NextResponse.json({ ok: true });
  }

  let planStatus: "ativo" | "atrasado" | "cancelado" | null = null;
  if (EVENTOS_ATIVA.has(event)) planStatus = "ativo";
  else if (EVENTOS_ATRASADA.has(event)) planStatus = "atrasado";
  else if (EVENTOS_CANCELADA.has(event)) planStatus = "cancelado";

  if (!planStatus) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createServiceClient();
  await supabase
    .from("profiles")
    .update({ plan_status: planStatus, renews_at: payment?.dueDate ?? null })
    .eq("asaas_subscription_id", subscriptionId);

  return NextResponse.json({ ok: true });
}
