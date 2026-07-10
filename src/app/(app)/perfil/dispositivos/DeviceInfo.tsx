"use client";

import { useSyncExternalStore } from "react";
import { Smartphone } from "lucide-react";
import { getDeviceId } from "@/lib/device";

const subscribe = () => () => {};

export function DeviceInfo({ activeDeviceId }: { activeDeviceId: string | null }) {
  const localId = useSyncExternalStore(
    subscribe,
    () => getDeviceId(),
    () => ""
  );

  const esteEhAtivo = activeDeviceId !== null && localId !== "" && activeDeviceId === localId;

  return (
    <div className="rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
          <Smartphone size={18} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">Este dispositivo</p>
          <p className="text-xs text-ink-soft">
            {esteEhAtivo ? "Sessão ativa agora" : "Verificando..."}
          </p>
        </div>
        {esteEhAtivo && (
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
            Ativo
          </span>
        )}
      </div>
    </div>
  );
}
