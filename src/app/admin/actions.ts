"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false as const };

  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { supabase, ok: (data as { role: string } | null)?.role === "admin" };
}

// ---- Categorias ----

export async function criarCategoria(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const ordem = Number(formData.get("ordem") ?? 0);
  if (!nome) return { error: "Informe o nome da categoria." };

  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("categorias").insert({ nome, ordem });
  if (error) return { error: error.message };

  revalidatePath("/admin/categorias");
  return { ok: true };
}

export async function excluirCategoria(id: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/categorias");
  return { ok: true };
}

// ---- Cursos ----

export async function criarCurso(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const categoriaId = String(formData.get("categoria_id") ?? "");
  const capa = formData.get("capa");
  if (!titulo) return { error: "Informe o título do curso." };

  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  let capaUrl: string | null = null;
  if (capa instanceof File && capa.size > 0) {
    const path = `${crypto.randomUUID()}-${capa.name}`;
    const { error: uploadError } = await supabase.storage.from("capas").upload(path, capa);
    if (uploadError) return { error: `Falha ao enviar a capa: ${uploadError.message}` };
    capaUrl = supabase.storage.from("capas").getPublicUrl(path).data.publicUrl;
  }

  const { error } = await supabase.from("cursos").insert({
    titulo,
    descricao,
    categoria_id: categoriaId || null,
    capa_url: capaUrl,
    publicado: true,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  return { ok: true };
}

export async function togglePublicado(id: string, publicado: boolean) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("cursos").update({ publicado }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  return { ok: true };
}

export async function excluirCurso(id: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("cursos").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  return { ok: true };
}

// ---- Aulas ----

export async function criarAula(formData: FormData) {
  const cursoId = String(formData.get("curso_id") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const youtubeId = String(formData.get("youtube_video_id") ?? "").trim();
  const duracao = Number(formData.get("duracao_min") ?? 0);
  const ordem = Number(formData.get("ordem") ?? 0);
  if (!cursoId || !titulo || !youtubeId) {
    return { error: "Preencha título e ID do vídeo do YouTube." };
  }

  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("aulas").insert({
    curso_id: cursoId,
    titulo,
    youtube_video_id: youtubeId,
    duracao_min: duracao,
    ordem,
  });
  if (error) return { error: error.message };

  revalidatePath(`/admin/cursos/${cursoId}`);
  revalidatePath("/admin/videos");
  revalidatePath(`/cursos/${cursoId}`);
  return { ok: true };
}

export async function atualizarVideoAula(aulaId: string, youtubeId: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase
    .from("aulas")
    .update({ youtube_video_id: youtubeId.trim() })
    .eq("id", aulaId);
  if (error) return { error: error.message };

  revalidatePath("/admin/videos");
  return { ok: true };
}

export async function excluirAula(id: string, cursoId: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("aulas").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/cursos/${cursoId}`);
  revalidatePath("/admin/videos");
  return { ok: true };
}

// ---- Materiais ----

export async function criarMaterial(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "PDF");
  const cursoId = String(formData.get("curso_id") ?? "");
  const arquivo = formData.get("arquivo");
  if (!titulo) return { error: "Informe o título do material." };
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return { error: "Selecione um arquivo para enviar." };
  }

  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const path = `${crypto.randomUUID()}-${arquivo.name}`;
  const { error: uploadError } = await supabase.storage
    .from("materiais")
    .upload(path, arquivo);
  if (uploadError) return { error: `Falha ao enviar o arquivo: ${uploadError.message}` };

  const { error } = await supabase.from("materiais").insert({
    titulo,
    tipo,
    curso_id: cursoId || null,
    arquivo_url: path,
    tamanho_kb: Math.max(1, Math.round(arquivo.size / 1024)),
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/materiais");
  revalidatePath("/materiais");
  return { ok: true };
}

export async function excluirMaterial(id: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { data: material } = await supabase
    .from("materiais")
    .select("arquivo_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("materiais").delete().eq("id", id);
  if (error) return { error: error.message };

  if (material?.arquivo_url) {
    await supabase.storage.from("materiais").remove([material.arquivo_url]);
  }

  revalidatePath("/admin/materiais");
  revalidatePath("/materiais");
  return { ok: true };
}

// ---- Moderação ----

export async function excluirPost(id: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Sem permissão." };

  const { error } = await supabase.from("comunidade_posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/moderacao");
  revalidatePath("/comunidade");
  return { ok: true };
}
