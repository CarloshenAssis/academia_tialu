"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Verifica se `deviceId` (o dispositivo local desta aba) ainda é o dispositivo
 * ativo da conta. Se outro dispositivo fez login depois, o registro em
 * sessoes_dispositivo terá outro device_id e esta função retorna ativo=false,
 * sinalizando ao cliente que deve encerrar a sessão.
 */
export async function verificarDispositivo(
  deviceId: string
): Promise<{ ativo: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ativo: false };

  const { data } = await supabase
    .from("sessoes_dispositivo")
    .select("device_id")
    .eq("user_id", user.id)
    .maybeSingle();

  // Sem registro ainda: trata como ativo (será criado no próximo login/registro).
  if (!data) return { ativo: true };

  const ativo = (data as { device_id: string }).device_id === deviceId;

  if (ativo) {
    await supabase
      .from("sessoes_dispositivo")
      .update({ last_active_at: new Date().toISOString() })
      .eq("user_id", user.id);
  }

  return { ativo };
}
