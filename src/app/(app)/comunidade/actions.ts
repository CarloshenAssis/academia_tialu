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

export type RespostaComAutor = {
  id: string;
  conteudo: string;
  created_at: string;
  autor_nome: string;
  autor_role: string;
};

export async function listarRespostas(postId: string): Promise<RespostaComAutor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comunidade_respostas")
    .select(
      "id, conteudo, created_at, autor:profiles_publicas!comunidade_respostas_user_id_fkey(full_name, role)"
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("listarRespostas:", error.message);
    return [];
  }

  type Row = {
    id: string;
    conteudo: string;
    created_at: string;
    autor: { full_name: string; role: string } | null;
  };

  return ((data as unknown as Row[]) ?? []).map((row) => ({
    id: row.id,
    conteudo: row.conteudo,
    created_at: row.created_at,
    autor_nome: row.autor?.full_name || "Aluna",
    autor_role: row.autor?.role || "aluno",
  }));
}

export async function criarResposta(postId: string, formData: FormData) {
  const conteudo = String(formData.get("conteudo") ?? "").trim();
  if (!conteudo) return { error: "Escreva algo antes de responder." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("comunidade_respostas")
    .insert({ post_id: postId, user_id: user.id, conteudo });

  if (error) return { error: error.message };

  revalidatePath("/comunidade");
  return { ok: true };
}
