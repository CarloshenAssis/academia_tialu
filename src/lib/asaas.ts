const ASAAS_API_URL = process.env.ASAAS_API_URL ?? "https://api-sandbox.asaas.com/v3";

function apiKey() {
  const key = process.env.ASAAS_API_KEY;
  if (!key) throw new Error("ASAAS_API_KEY não configurada.");
  return key;
}

async function asaasFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${ASAAS_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey(),
      ...init.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    const mensagem = data?.errors?.[0]?.description ?? "Erro ao comunicar com o Asaas.";
    throw new Error(mensagem);
  }
  return data as T;
}

export interface AsaasCustomer {
  id: string;
}

export async function criarClienteAsaas(params: {
  name: string;
  email: string;
  cpfCnpj: string;
}): Promise<AsaasCustomer> {
  return asaasFetch<AsaasCustomer>("/customers", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export interface AsaasSubscription {
  id: string;
}

export async function criarAssinaturaAsaas(params: {
  customer: string;
  value: number;
  nextDueDate: string;
  description: string;
  successUrl: string;
}): Promise<AsaasSubscription> {
  return asaasFetch<AsaasSubscription>("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customer,
      billingType: "UNDEFINED",
      cycle: "MONTHLY",
      value: params.value,
      nextDueDate: params.nextDueDate,
      description: params.description,
      callback: { successUrl: params.successUrl, autoRedirect: true },
    }),
  });
}

interface AsaasPayment {
  id: string;
  invoiceUrl: string;
}

// A assinatura em si não retorna o link de pagamento — é preciso buscar
// a primeira cobrança gerada por ela e usar o invoiceUrl dela.
export async function buscarPrimeiraCobranca(
  subscriptionId: string
): Promise<AsaasPayment | undefined> {
  const data = await asaasFetch<{ data: AsaasPayment[] }>(
    `/subscriptions/${subscriptionId}/payments`
  );
  return data.data?.[0];
}

// Garante o redirecionamento pós-pagamento também em cobranças criadas
// antes do callback existir na assinatura. Falha aqui não deve derrubar o
// fluxo — o pior caso é a aluna ver o comprovante do Asaas.
export async function aplicarCallbackNaCobranca(paymentId: string, successUrl: string) {
  try {
    await asaasFetch(`/payments/${paymentId}`, {
      method: "PUT",
      body: JSON.stringify({ callback: { successUrl, autoRedirect: true } }),
    });
  } catch {
    // não-fatal
  }
}
