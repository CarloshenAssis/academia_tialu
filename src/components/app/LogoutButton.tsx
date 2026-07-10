"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 rounded-xl border border-danger/30 py-3 text-sm font-semibold text-danger"
    >
      <LogOut size={16} /> Encerrar sessão
    </button>
  );
}
