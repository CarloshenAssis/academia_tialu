import type { SupabaseClient } from "@supabase/supabase-js";

const DEVICE_ID_KEY = "tialu_device_id";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export async function registerDevice(supabase: SupabaseClient, userId: string) {
  const deviceId = getDeviceId();
  const deviceLabel =
    typeof navigator === "undefined" ? "Dispositivo" : navigator.userAgent.slice(0, 120);

  await supabase.from("sessoes_dispositivo").upsert({
    user_id: userId,
    device_id: deviceId,
    device_label: deviceLabel,
    last_active_at: new Date().toISOString(),
  });
}
