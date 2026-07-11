# Deploy — Academia Tia Lu

O app está publicado em: **https://academiatialu.vercel.app**

Time Vercel: `carlos-projectsassis` · Projeto: `academiatialu` · Repositório:
`CarloshenAssis/academia_tialu`, branch `main` (deploy automático a cada push).

## Variáveis de ambiente

Em Project Settings → Environment Variables, marcadas para **Production,
Preview e Development**:

| Nome | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wubmxdbpgpjqlqwyekfz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_sE8Mr3Tks-IFHEuwAu-PIg_MvpRm-be` |

Estas duas chaves são **públicas por design** (a `publishable`/anon key é
exposta no navegador; o acesso aos dados é protegido pelas políticas RLS do
banco). Não coloque aqui a `service_role` key.

⚠️ Como são variáveis `NEXT_PUBLIC_*`, elas são compiladas dentro do código no
momento do build. Se precisar alterá-las, sempre force um build novo **sem**
reaproveitar o cache (Deployments → "..." → Redeploy → desmarcar "Use existing
Build Cache").

## Configurar o Supabase Auth para o domínio

No painel do Supabase (Authentication → URL Configuration):

- **Site URL:** `https://academiatialu.vercel.app`
- **Redirect URLs:** adicione `https://academiatialu.vercel.app/**` e
  `https://*.vercel.app/**` (esta última cobre os deploys de preview)

Isso garante que os links de confirmação de e-mail e recuperação de senha
apontem para o domínio certo.

## Contas de teste já criadas

| Papel | E-mail | Senha |
| --- | --- | --- |
| Admin (Tia Lu) | `tialu.mentora@gmail.com` | `TiaLu@2026Segura` |
| Aluna | `marta.silva.tialu@gmail.com` | `Aluna@2026Segura` |
| Aluna | `renata.costa.tialu@gmail.com` | `Aluna@2026Segura` |

> Troque essas senhas antes de abrir a plataforma ao público.

## Observações

- O painel admin (`/admin`) só abre para contas com `role = 'admin'`.
- Confirmação de e-mail está ligada no Supabase: novas contas recebem um link
  antes de conseguir logar. Para um MVP fechado, dá para desligar em
  Authentication → Providers → Email → "Confirm email".
- Stack: **Next.js 15.5.20** (não 16.x — ver nota abaixo), TypeScript,
  Tailwind v4, Supabase (Auth + Postgres + Storage).

## Nota técnica: por que Next.js 15, não 16

O projeto foi iniciado com Next.js 16.2.10, mas todo deploy na Vercel — mesmo
com build 100% limpo — retornava 404 em toda rota da aplicação. Depois de
eliminar middleware/proxy, versão do Node, Turbopack vs Webpack e
configuração de domínio como causas, o downgrade para 15.5.20 (release madura,
testada há muito tempo na Vercel) resolveu. Se algum dia quiser tentar o
Next.js 16 de novo, vale checar primeiro se a Vercel já anunciou suporte
completo para builds de produção nessa versão.

Separadamente, o projeto Vercel original (`academia-tialu`) ficou com algum
estado interno travado que nem recriá-lo do zero (mesmo nome) resolvia — só
foi resolvido criando um projeto novo com nome diferente (`academiatialu`).
