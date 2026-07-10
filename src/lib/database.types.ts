// Tipos do banco Academia Tia Lu.
// Escritos à mão a partir do schema (migrations init_schema/seed).
// Se o schema mudar, regenerar com:
//   supabase gen types typescript --project-id wubmxdbpgpjqlqwyekfz

export type UserRole = "aluno" | "admin";
export type PlanType = "mensal" | "anual";
export type PlanStatus = "ativo" | "atrasado" | "cancelado";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  plan: PlanType;
  plan_status: PlanStatus;
  renews_at: string | null;
  created_at: string;
}

export interface Categoria {
  id: string;
  nome: string;
  ordem: number;
  created_at: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  categoria_id: string | null;
  capa_url: string | null;
  ordem: number;
  publicado: boolean;
  created_at: string;
}

export interface Aula {
  id: string;
  curso_id: string;
  titulo: string;
  descricao: string;
  youtube_video_id: string;
  duracao_min: number;
  ordem: number;
  created_at: string;
}

export interface Material {
  id: string;
  curso_id: string | null;
  aula_id: string | null;
  titulo: string;
  tipo: string;
  arquivo_url: string;
  tamanho_kb: number;
  created_at: string;
}

export interface ProgressoAula {
  user_id: string;
  aula_id: string;
  concluida: boolean;
  updated_at: string;
}

export interface ComunidadePost {
  id: string;
  user_id: string;
  conteudo: string;
  created_at: string;
}

export interface ComunidadeResposta {
  id: string;
  post_id: string;
  user_id: string;
  conteudo: string;
  created_at: string;
}

export interface ComunidadeCurtida {
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface SessaoDispositivo {
  user_id: string;
  device_id: string;
  device_label: string | null;
  last_active_at: string;
  created_at: string;
}
