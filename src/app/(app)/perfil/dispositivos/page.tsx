import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeviceInfo } from "./DeviceInfo";

export default async function DispositivosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sessao } = user
    ? await supabase
        .from("sessoes_dispositivo")
        .select("device_id, last_active_at")
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null };

  const activeDeviceId = (sessao as { device_id: string } | null)?.device_id ?? null;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link
          href="/perfil"
          className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-ink-soft"
        >
          <ArrowLeft size={13} /> Voltar ao perfil
        </Link>
        <h1 className="font-display text-xl font-bold text-ink">Dispositivos conectados</h1>
        <p className="text-sm text-ink-soft">
          Sua conta funciona em apenas um dispositivo por vez. Ao entrar em um novo
          aparelho, a sessão anterior é encerrada automaticamente.
        </p>
      </div>

      <DeviceInfo activeDeviceId={activeDeviceId} />
    </div>
  );
}
