# E-mails do Supabase — Academia Tia Lu

Onde colar: **Supabase → Authentication → Email Templates**.

- Template **"Confirm signup"**: usar o HTML da seção 1 (Assunto: `Confirme sua conta na Academia Tia Lu 💛`)
- Template **"Reset password"**: usar o HTML da seção 2 (Assunto: `Crie uma nova senha — Academia Tia Lu`)

As variáveis `{{ .ConfirmationURL }}` são preenchidas pelo próprio Supabase — não alterar.

---

## 1. Confirmação de cadastro (Confirm signup)

```html
<div style="background-color:#fefdfb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e8e4dc;">
    <p style="margin:0;font-size:11px;letter-spacing:3px;color:#b08a45;font-weight:bold;">ACADEMIA</p>
    <p style="margin:0 0 24px;font-size:22px;color:#1c2b28;font-weight:bold;">Tia Lu</p>

    <h1 style="margin:0 0 12px;font-size:20px;color:#1c2b28;">Que alegria ter você aqui! 💛</h1>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#6b7280;">
      Falta só um passo pra você entrar na Academia Tia Lu: confirme que este
      e-mail é seu clicando no botão abaixo.
    </p>

    <a href="{{ .ConfirmationURL }}"
       style="display:block;text-align:center;background:#2b6b60;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:bold;">
      Confirmar meu e-mail
    </a>

    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#6b7280;">
      Se o botão não funcionar, copie e cole este endereço no navegador:<br>
      <a href="{{ .ConfirmationURL }}" style="color:#2b6b60;word-break:break-all;">{{ .ConfirmationURL }}</a>
    </p>

    <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;">
      Você recebeu este e-mail porque alguém criou uma conta na Academia Tia Lu
      com este endereço. Se não foi você, pode ignorar esta mensagem.
    </p>
  </div>
</div>
```

## 2. Recuperação de senha (Reset password)

```html
<div style="background-color:#fefdfb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e8e4dc;">
    <p style="margin:0;font-size:11px;letter-spacing:3px;color:#b08a45;font-weight:bold;">ACADEMIA</p>
    <p style="margin:0 0 24px;font-size:22px;color:#1c2b28;font-weight:bold;">Tia Lu</p>

    <h1 style="margin:0 0 12px;font-size:20px;color:#1c2b28;">Vamos criar uma senha nova?</h1>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#6b7280;">
      Recebemos um pedido pra redefinir a senha da sua conta. Clique no botão
      abaixo pra escolher uma senha nova. O link vale por 1 hora.
    </p>

    <a href="{{ .ConfirmationURL }}"
       style="display:block;text-align:center;background:#2b6b60;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:bold;">
      Criar nova senha
    </a>

    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#6b7280;">
      Se o botão não funcionar, copie e cole este endereço no navegador:<br>
      <a href="{{ .ConfirmationURL }}" style="color:#2b6b60;word-break:break-all;">{{ .ConfirmationURL }}</a>
    </p>

    <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;">
      Se você não pediu essa alteração, ignore este e-mail — sua senha continua
      a mesma.
    </p>
  </div>
</div>
```
