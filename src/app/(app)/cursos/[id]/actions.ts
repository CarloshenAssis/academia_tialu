"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleAulaConcluida(
  aulaId: string,
  cursoId: string,
  concluida: boolean
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase.from("progresso_aulas").upsert(
    {
      user_id: user.id,
      aula_id: aulaId,
      concluida,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,aula_id" }
  );

  if (error) return { error: error.message };

  revalidatePath(`/cursos/${cursoId}`);
  revalidatePath("/home");
  return { ok: true };
}
