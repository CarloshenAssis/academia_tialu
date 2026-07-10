export type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  youtubeVideoId: string;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  lessonsCount: number;
  duration: string;
  progress?: number;
  description: string;
  lessons: Lesson[];
};

export type Material = {
  id: string;
  title: string;
  courseTitle: string;
  type: "PDF" | "Planilha" | "Checklist" | "Mapa";
  size: string;
  fileUrl: string;
};

export type CommunityPost = {
  id: string;
  author: string;
  role?: "Mentora";
  timeAgo: string;
  content: string;
  likes: number;
  replies: number;
};

export const currentUser = {
  name: "Marta Silva",
  email: "marta.silva@email.com",
  plan: "Plano Anual" as const,
  renewsAt: "14 ago 2026",
};

export const courses: Course[] = [
  {
    id: "financas-30-dias",
    title: "Organize suas Finanças em 30 Dias",
    category: "Finanças",
    lessonsCount: 12,
    duration: "3h45min",
    progress: 4 / 12,
    description:
      "Nessa aula, a Tia Lu mostra como usar o cartão de crédito a seu favor — sem cair em armadilhas de juros e parcelamentos que não cabem no orçamento.",
    lessons: [
      { id: "l1", title: "Boas-vindas: por que organizar suas finanças muda tudo", duration: "6 min", completed: true, youtubeVideoId: "dQw4w9WgXcQ" },
      { id: "l2", title: "Mapeando entradas e saídas sem planilha complicada", duration: "12 min", completed: true, youtubeVideoId: "dQw4w9WgXcQ" },
      { id: "l3", title: "Dívidas: por onde começar a resolver", duration: "15 min", completed: true, youtubeVideoId: "dQw4w9WgXcQ" },
      { id: "l4", title: "Cartão de crédito sem medo", duration: "10 min", completed: false, youtubeVideoId: "dQw4w9WgXcQ" },
      { id: "l5", title: "Criando sua reserva de emergência", duration: "14 min", completed: false, youtubeVideoId: "dQw4w9WgXcQ" },
      { id: "l6", title: "Metas financeiras para os próximos 90 dias", duration: "11 min", completed: false, youtubeVideoId: "dQw4w9WgXcQ" },
    ],
  },
  {
    id: "investindo-tranquilidade",
    title: "Investindo com Tranquilidade",
    category: "Finanças",
    lessonsCount: 8,
    duration: "2h20min",
    description: "Primeiros passos para investir com segurança, sem jargões e sem medo.",
    lessons: [],
  },
  {
    id: "zero-primeiro-cliente",
    title: "Do Zero ao Primeiro Cliente",
    category: "Empreendedorismo",
    lessonsCount: 10,
    duration: "3h10min",
    description: "Um passo a passo prático para conquistar seu primeiro cliente pagante.",
    lessons: [],
  },
  {
    id: "empreender-leveza",
    title: "Empreender com Leveza",
    category: "Empreendedorismo",
    lessonsCount: 9,
    duration: "2h30min",
    description: "Como tocar seu negócio sem sacrificar sua saúde mental.",
    lessons: [],
  },
  {
    id: "autoestima-proposito",
    title: "Autoestima e Propósito",
    category: "Desenvolvimento Pessoal",
    lessonsCount: 14,
    duration: "4h05min",
    description: "Reconecte-se com quem você é e com o que você quer construir.",
    lessons: [],
  },
  {
    id: "casa-em-ordem",
    title: "Casa em Ordem: Rotina que Funciona",
    category: "Organização",
    lessonsCount: 11,
    duration: "3h20min",
    description: "Rotinas simples para manter a casa organizada sem esforço sobre-humano.",
    lessons: [],
  },
];

export const recentVideos = [
  { id: "v1", title: "3 hábitos que mudaram minha relação com o dinheiro", duration: "8 min" },
  { id: "v2", title: "Como dizer não sem culpa", duration: "6 min" },
  { id: "v3", title: "Planilha de gastos: por onde começar", duration: "9 min" },
];

export const materials: Material[] = [
  { id: "m1", title: "Planilha de Controle Financeiro", courseTitle: "Organize suas Finanças em 30 Dias", type: "Planilha", size: "18 KB", fileUrl: "#" },
  { id: "m2", title: "Guia — Organize suas Finanças", courseTitle: "Organize suas Finanças em 30 Dias", type: "PDF", size: "2.1 MB", fileUrl: "#" },
  { id: "m3", title: "Modelo de Plano de Negócio", courseTitle: "Do Zero ao Primeiro Cliente", type: "PDF", size: "1.4 MB", fileUrl: "#" },
  { id: "m4", title: "Checklist de Rotina Semanal", courseTitle: "Casa em Ordem: Rotina que Funciona", type: "Checklist", size: "310 KB", fileUrl: "#" },
  { id: "m5", title: "Mapa de Metas 90 Dias", courseTitle: "Organize suas Finanças em 30 Dias", type: "Mapa", size: "1.5 MB", fileUrl: "#" },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "p1",
    author: "Tia Lu",
    role: "Mentora",
    timeAgo: "2h atrás",
    content: "Bom dia, turma! Hoje é dia de revisar o orçamento de julho — quem já fez a planilha da aula 3?",
    likes: 48,
    replies: 12,
  },
  {
    id: "p2",
    author: "Marta S.",
    timeAgo: "51 min atrás",
    content: "Consegui quitar meu cartão seguindo o passo a passo da aula 3! Obrigada, Tia Lu 💛",
    likes: 23,
    replies: 6,
  },
  {
    id: "p3",
    author: "Renata C.",
    timeAgo: "20 min atrás",
    content: "Alguém mais está seguindo o curso de Empreendedorismo? Quero trocar figurinha por aqui!",
    likes: 14,
    replies: 9,
  },
];

export const adminStats = {
  activeSubscribers: 482,
  newThisMonth: 37,
  publishedCourses: 11,
  communityPosts: 214,
};

export const adminUsers = [
  { id: "u1", name: "Marta Silva", email: "marta.silva@email.com", plan: "Anual", status: "Ativo" as const },
  { id: "u2", name: "Renata Costa", email: "renata.costa@email.com", plan: "Mensal", status: "Ativo" as const },
  { id: "u3", name: "Juliana Prado", email: "ju.prado@email.com", plan: "Mensal", status: "Atrasado" as const },
  { id: "u4", name: "Beatriz Alves", email: "bia.alves@email.com", plan: "Anual", status: "Ativo" as const },
];

export const adminNavItems = [
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/assinaturas", label: "Assinaturas" },
  { href: "/admin/videos", label: "Vídeos (YouTube)" },
  { href: "/admin/cursos", label: "Cursos" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/materiais", label: "PDFs e materiais" },
  { href: "/admin/moderacao", label: "Moderação" },
  { href: "/admin/estatisticas", label: "Estatísticas" },
];
