import { createClient } from "@/lib/supabase/server";
import type { Aula, Curso, Profile } from "@/lib/database.types";

export type AulaComCurso = Aula & { curso: Pick<Curso, "titulo"> | null };

export async function getAllAulasComCurso(): Promise<AulaComCurso[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("aulas")
    .select("*, curso:cursos(titulo)")
    .order("created_at", { ascending: false });
  return (data as AulaComCurso[]) ?? [];
}

export type AdminStats = {
  assinantesAtivos: number;
  novosEsteMes: number;
  cursosPublicados: number;
  postsComunidade: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const [assinantes, novos, cursos, posts] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("plan_status", "ativo"),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", inicioMes.toISOString()),
    supabase.from("cursos").select("id", { count: "exact", head: true }).eq("publicado", true),
    supabase.from("comunidade_posts").select("id", { count: "exact", head: true }),
  ]);

  return {
    assinantesAtivos: assinantes.count ?? 0,
    novosEsteMes: novos.count ?? 0,
    cursosPublicados: cursos.count ?? 0,
    postsComunidade: posts.count ?? 0,
  };
}

export async function getAllProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Profile[]) ?? [];
}

export type PostModeracao = {
  id: string;
  conteudo: string;
  created_at: string;
  autor_nome: string;
  autor_email: string;
};

export async function getPostsParaModeracao(): Promise<PostModeracao[]> {
  const supabase = await createClient();
  // O hint !comunidade_posts_user_id_fkey é obrigatório: sem ele o PostgREST
  // encontra dois caminhos até profiles (direto e via curtidas) e falha com
  // PGRST201 — foi por isso que a moderação aparecia vazia.
  const { data, error } = await supabase
    .from("comunidade_posts")
    .select("id, conteudo, created_at, autor:profiles!comunidade_posts_user_id_fkey(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("getPostsParaModeracao:", error.message);
    return [];
  }

  type Row = {
    id: string;
    conteudo: string;
    created_at: string;
    autor: { full_name: string; email: string } | null;
  };

  return ((data as unknown as Row[]) ?? []).map((row) => ({
    id: row.id,
    conteudo: row.conteudo,
    created_at: row.created_at,
    autor_nome: row.autor?.full_name || "Aluna",
    autor_email: row.autor?.email || "",
  }));
}

export type EstatisticasDetalhadas = AdminStats & {
  totalUsuarios: number;
  totalAulas: number;
  totalMateriais: number;
  totalCategorias: number;
  planoMensal: number;
  planoAnual: number;
};

export async function getEstatisticasDetalhadas(): Promise<EstatisticasDetalhadas> {
  const supabase = await createClient();
  const base = await getAdminStats();

  const [usuarios, aulas, materiais, categorias, mensal, anual] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("aulas").select("id", { count: "exact", head: true }),
    supabase.from("materiais").select("id", { count: "exact", head: true }),
    supabase.from("categorias").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("plan", "mensal"),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("plan", "anual"),
  ]);

  return {
    ...base,
    totalUsuarios: usuarios.count ?? 0,
    totalAulas: aulas.count ?? 0,
    totalMateriais: materiais.count ?? 0,
    totalCategorias: categorias.count ?? 0,
    planoMensal: mensal.count ?? 0,
    planoAnual: anual.count ?? 0,
  };
}
