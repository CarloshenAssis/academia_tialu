"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  criarClienteAsaas,
  criarAssinaturaAsaas,
  buscarPrimeiraCobranca,
  aplicarCallbackNaCobranca,
} from "@/lib/asaas";

async function siteUrl() {
  const host = (await headers()).get("host") ?? "academiatialu.vercel.app";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

interface AssinaturaState {
  error?: string;
}

export async function iniciarAssinatura(
  _prevState: AssinaturaState,
  formData: FormData
): Promise<AssinaturaState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada. Faça login novamente." };

  const cpfCnpj = String(formData.get("cpf_cnpj") ?? "").replace(/\D/g, "");
  if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
    return { error: "Informe um CPF ou CNPJ válido." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, asaas_customer_id, asaas_subscription_id")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: "Perfil não encontrado." };

  const service = createServiceClient();
  let invoiceUrl: string | undefined;

  try {
    let customerId = profile.asaas_customer_id;
    if (!customerId) {
      const cliente = await criarClienteAsaas({
        name: profile.full_name || profile.email,
        email: profile.email,
        cpfCnpj,
      });
      customerId = cliente.id;
      await service
        .from("profiles")
        .update({ asaas_customer_id: customerId, cpf_cnpj: cpfCnpj })
        .eq("id", user.id);
    }

    const successUrl = `${await siteUrl()}/assinatura/sucesso`;

    let subscriptionId = profile.asaas_subscription_id;
    if (!subscriptionId) {
      const hoje = new Date().toISOString().slice(0, 10);
      const assinatura = await criarAssinaturaAsaas({
        customer: customerId,
        value: 29.9,
        nextDueDate: hoje,
        description: "Academia Tia Lu — assinatura mensal",
        successUrl,
      });
      subscriptionId = assinatura.id;
      await service
        .from("profiles")
        .update({ asaas_subscription_id: subscriptionId })
        .eq("id", user.id);
    }

    const cobranca = await buscarPrimeiraCobranca(subscriptionId);
    if (cobranca) {
      await aplicarCallbackNaCobranca(cobranca.id, successUrl);
      invoiceUrl = cobranca.invoiceUrl;
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao iniciar a assinatura." };
  }

  if (!invoiceUrl) {
    return { error: "Não foi possível gerar o link de pagamento. Tente novamente em instantes." };
  }

  redirect(invoiceUrl);
}
