"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getDeviceId } from "@/lib/device";
import { createClient } from "@/lib/supabase/client";
import { verificarDispositivo } from "@/app/(app)/device-actions";

const INTERVALO_MS = 30_000;

/**
 * Aplica a regra de "1 dispositivo por conta": verifica periodicamente se este
 * dispositivo ainda é o ativo. Se a conta tiver sido aberta em outro
 * dispositivo, encerra a sessão aqui e volta ao login com um aviso.
 */
export function DeviceGuard() {
  const router = useRouter();
  const encerrando = useRef(false);

  useEffect(() => {
    let cancelado = false;

    async function checar() {
      if (encerrando.current) return;
      const deviceId = getDeviceId();
      if (!deviceId) return;

      const { ativo } = await verificarDispositivo(deviceId);
      if (!ativo && !cancelado) {
        encerrando.current = true;
        const supabase = createClient();
        await supabase.auth.signOut();
        router.replace("/login?motivo=outro-dispositivo");
      }
    }

    checar();
    const id = setInterval(checar, INTERVALO_MS);
    return () => {
      cancelado = true;
      clearInterval(id);
    };
  }, [router]);

  return null;
}
