-- Índices para as consultas mais frequentes do app.
-- Sem eles, cada filtro por essas colunas varre a tabela inteira — invisível
-- com 10 usuários, doloroso com 1000.
--
-- Aplicar via painel do Supabase (SQL Editor) ou MCP quando houver acesso.

-- Webhook do Asaas localiza o perfil pela assinatura a cada pagamento
create index if not exists idx_profiles_asaas_subscription
  on public.profiles (asaas_subscription_id)
  where asaas_subscription_id is not null;

-- Listagem de aulas por curso (tela do curso, cálculo de progresso)
create index if not exists idx_aulas_curso on public.aulas (curso_id, ordem);

-- Materiais filtrados por curso/aula
create index if not exists idx_materiais_curso on public.materiais (curso_id);
create index if not exists idx_materiais_aula on public.materiais (aula_id);

-- Cursos por categoria
create index if not exists idx_cursos_categoria on public.cursos (categoria_id);

-- Feed da comunidade (ordenado por data) e junções por autor/post
create index if not exists idx_posts_created on public.comunidade_posts (created_at desc);
create index if not exists idx_posts_user on public.comunidade_posts (user_id);
create index if not exists idx_respostas_post on public.comunidade_respostas (post_id, created_at);
create index if not exists idx_respostas_user on public.comunidade_respostas (user_id);
create index if not exists idx_curtidas_user on public.comunidade_curtidas (user_id);

-- Progresso de aulas por usuário (tela home / curso)
create index if not exists idx_progresso_user on public.progresso_aulas (user_id, concluida);
