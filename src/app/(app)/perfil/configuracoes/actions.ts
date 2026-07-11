"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface PerfilFormState {
  ok?: boolean;
  error?: string;
}

export async function salvarPerfil(
  _prev: PerfilFormState,
  formData: FormData
): Promise<PerfilFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada. Faça login novamente." };

  const fullName = String(formData.get("full_name") ?? "").trim();
  const dataNascimento = String(formData.get("data_nascimento") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const foto = formData.get("foto") as File | null;

  if (!fullName) return { error: "O nome não pode ficar vazio." };

  let avatarUrl: string | undefined;

  if (foto && foto.size > 0) {
    if (foto.size > 3 * 1024 * 1024) {
      return { error: "A foto precisa ter no máximo 3 MB." };
    }
    const extensao = (foto.name.split(".").pop() || "jpg").toLowerCase();
    const caminho = `${user.id}/avatar.${extensao}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(caminho, foto, { upsert: true, contentType: foto.type || undefined });

    if (uploadError) {
      return { error: "Não foi possível enviar a foto. Tente novamente." };
    }

    const { data: publica } = supabase.storage.from("avatars").getPublicUrl(caminho);
    // Query de cache-busting: o arquivo é sobrescrito no mesmo caminho.
    avatarUrl = `${publica.publicUrl}?v=${Date.now()}`;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      data_nascimento: dataNascimento || null,
      telefone: telefone || null,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq("id", user.id);

  if (updateError) {
    return { error: "Não foi possível salvar. Tente novamente." };
  }

  revalidatePath("/perfil");
  revalidatePath("/perfil/configuracoes");
  return { ok: true };
}
