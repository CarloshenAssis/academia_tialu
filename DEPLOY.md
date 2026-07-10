# Deploy — Academia Tia Lu

O app é um Next.js (App Router) pronto para a Vercel. O código já builda limpo
(`npm run build`).

## 1. Importar o repositório na Vercel

1. Acesse https://vercel.com/new
2. Selecione o time **Carlos' projects**
3. Importe o repositório `CarloshenAssis/academia_tialu`
4. Branch de produção: `main` (ou a branch que você preferir)
5. Framework: **Next.js** (detectado automaticamente)

> Importar o repositório é o que liga o deploy automático: cada `git push`
> gera um preview, e o push na branch de produção publica.

## 2. Variáveis de ambiente

Na tela de import (ou em Project Settings → Environment Variables), adicione:

| Nome | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wubmxdbpgpjqlqwyekfz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_sE8Mr3Tks-IFHEuwAu-PIg_MvpRm-be` |

Estas duas chaves são **públicas por design** (a `publishable`/anon key é
exposta no navegador; o acesso aos dados é protegido pelas políticas RLS do
banco). Não coloque aqui a `service_role` key.

## 3. Configurar o Supabase Auth para o domínio da Vercel

Depois do primeiro deploy você terá uma URL (ex:
`https://academia-tialu.vercel.app`). No painel do Supabase
(Authentication → URL Configuration):

- **Site URL:** a URL de produção da Vercel
- **Redirect URLs:** adicione a URL de produção e a de preview
  (`https://*.vercel.app` ajuda nos previews)

Isso garante que os links de confirmação de e-mail e recuperação de senha
apontem para o domínio certo.

## 4. Contas de teste já criadas

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
