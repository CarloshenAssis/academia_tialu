import { createClient } from "@supabase/supabase-js";

// Cliente com a service role key — ignora RLS. Usar só em código de
// servidor de confiança (server actions, webhooks), nunca no cliente.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
