"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function criarPost(formData: FormData) {
  const conteudo = String(formData.get("conteudo") ?? "").trim();
  if (!conteudo) return { error: "Escreva algo antes de publicar." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("comunidade_posts")
    .insert({ user_id: user.id, conteudo });

  if (error) return { error: error.message };

  revalidatePath("/comunidade");
  return { ok: true };
}

export async function toggleCurtida(postId: string, curtido: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  if (curtido) {
    await supabase
      .from("comunidade_curtidas")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);
  } else {
    await supabase
      .from("comunidade_curtidas")
      .insert({ post_id: postId, user_id: user.id });
  }

  revalidatePath("/comunidade");
  return { ok: true };
}
