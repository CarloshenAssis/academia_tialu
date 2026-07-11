import { createClient } from "@/lib/supabase/server";
import type {
  Aula,
  Categoria,
  Curso,
  Material,
  Profile,
  ProgressoAula,
} from "@/lib/database.types";

export type CursoComCategoria = Curso & { categoria: Pick<Categoria, "nome"> | null };

export type CursoComProgresso = CursoComCategoria & {
  totalAulas: number;
  aulasConcluidas: number;
  progresso: number;
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("categorias").select("*").order("ordem");
  return (data as Categoria[]) ?? [];
}

export async function getCursos(): Promise<CursoComCategoria[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cursos")
    .select("*, categoria:categorias(nome)")
    .eq("publicado", true)
    .order("ordem");
  return (data as CursoComCategoria[]) ?? [];
}

export async function getCurso(id: string): Promise<CursoComCategoria | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cursos")
    .select("*, categoria:categorias(nome)")
    .eq("id", id)
    .single();
  return (data as CursoComCategoria) ?? null;
}

export async function getAulas(cursoId: string): Promise<Aula[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("aulas")
    .select("*")
    .eq("curso_id", cursoId)
    .order("ordem");
  return (data as Aula[]) ?? [];
}

export async function getProgressoDoCurso(
  cursoId: string,
  aulaIds: string[]
): Promise<Set<string>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || aulaIds.length === 0) return new Set();

  const { data } = await supabase
    .from("progresso_aulas")
    .select("aula_id, concluida")
    .eq("user_id", user.id)
    .in("aula_id", aulaIds);

  const concluidas = new Set<string>();
  ((data as Pick<ProgressoAula, "aula_id" | "concluida">[]) ?? []).forEach((p) => {
    if (p.concluida) concluidas.add(p.aula_id);
  });
  return concluidas;
}

/**
 * Cursos com o progresso do usuário logado (para "Continue assistindo" e destaque).
 * Faz uma varredura das aulas + progresso em duas queries e agrega em memória —
 * suficiente para o volume de um MVP.
 */
export async function getCursosComProgresso(): Promise<CursoComProgresso[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cursos = await getCursos();
  if (cursos.length === 0) return [];

  const { data: aulasData } = await supabase.from("aulas").select("id, curso_id");
  const aulas = (aulasData as Pick<Aula, "id" | "curso_id">[]) ?? [];

  let concluidas = new Set<string>();
  if (user) {
    const { data: progressoData } = await supabase
      .from("progresso_aulas")
      .select("aula_id, concluida")
      .eq("user_id", user.id)
      .eq("concluida", true);
    concluidas = new Set(
      ((progressoData as Pick<ProgressoAula, "aula_id">[]) ?? []).map((p) => p.aula_id)
    );
  }

  return cursos.map((curso) => {
    const aulasDoCurso = aulas.filter((a) => a.curso_id === curso.id);
    const totalAulas = aulasDoCurso.length;
    const aulasConcluidas = aulasDoCurso.filter((a) => concluidas.has(a.id)).length;
    return {
      ...curso,
      totalAulas,
      aulasConcluidas,
      progresso: totalAulas > 0 ? aulasConcluidas / totalAulas : 0,
    };
  });
}

export async function getMateriais(): Promise<(Material & { curso: Pick<Curso, "titulo"> | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("materiais")
    .select("*, curso:cursos(titulo)")
    .order("created_at");

  const materiais = (data as (Material & { curso: Pick<Curso, "titulo"> | null })[]) ?? [];

  // arquivo_url guarda o caminho no bucket privado "materiais"; geramos um
  // link assinado de curta duração na hora de exibir, em vez de expor o
  // bucket publicamente.
  return Promise.all(
    materiais.map(async (material) => {
      const { data: signed } = await supabase.storage
        .from("materiais")
        .createSignedUrl(material.arquivo_url, 60 * 10);
      return { ...material, arquivo_url: signed?.signedUrl ?? "#" };
    })
  );
}

export type PostComAutor = {
  id: string;
  conteudo: string;
  created_at: string;
  autor_nome: string;
  autor_role: string;
  curtidas: number;
  respostas: number;
  curtido_por_mim: boolean;
};

export async function getComunidadePosts(): Promise<PostComAutor[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("comunidade_posts")
    .select(
      "id, conteudo, created_at, autor:profiles_publicas!comunidade_posts_user_id_fkey(full_name, role), curtidas:comunidade_curtidas(user_id), respostas:comunidade_respostas(id)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getComunidadePosts:", error.message);
    return [];
  }

  type Row = {
    id: string;
    conteudo: string;
    created_at: string;
    autor: { full_name: string; role: string } | null;
    curtidas: { user_id: string }[];
    respostas: { id: string }[];
  };

  return ((data as unknown as Row[]) ?? []).map((row) => ({
    id: row.id,
    conteudo: row.conteudo,
    created_at: row.created_at,
    autor_nome: row.autor?.full_name || "Aluna",
    autor_role: row.autor?.role || "aluno",
    curtidas: row.curtidas.length,
    respostas: row.respostas.length,
    curtido_por_mim: user ? row.curtidas.some((c) => c.user_id === user.id) : false,
  }));
}
