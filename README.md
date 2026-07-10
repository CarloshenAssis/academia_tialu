# Academia Tia Lu

Plataforma de membros com streaming educacional por assinatura (Next.js + Supabase + YouTube não listado).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/(auth)` — boas-vindas, cadastro, login
- `src/app/(app)` — home, cursos, materiais, comunidade, perfil (com bottom nav)
- `src/app/admin` — painel administrativo (sidebar no desktop, menu no mobile)
- `src/lib/mock-data.ts` — dados de exemplo usados antes da integração com Supabase

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deploy na Vercel, backend no Supabase.
