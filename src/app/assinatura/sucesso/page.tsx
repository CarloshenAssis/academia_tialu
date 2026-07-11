"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";

export default function AssinaturaSucessoPage() {
  const [demorou, setDemorou] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificar() {
      try {
        const res = await fetch("/api/assinatura/status", { cache: "no-store" });
        const data = await res.json();
        if (ativo && data.status === "ativo") {
          window.location.assign("/home");
        }
      } catch {
        // tenta de novo no próximo ciclo
      }
    }

    verificar();
    const intervalo = setInterval(verificar, 3000);
    const timeout = setTimeout(() => setDemorou(true), 30000);

    return () => {
      ativo = false;
      clearInterval(intervalo);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cream px-6 py-10">
      <div className="app-shell flex w-full flex-col items-center text-center md:rounded-3xl md:bg-card md:p-10 md:shadow-xl">
        <Logo size={56} className="mb-6" />
        <h1 className="font-display text-2xl font-bold text-ink">Pagamento recebido! 🎉</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Estamos liberando o seu acesso — isso leva só alguns segundos. Você
          será levada pra dentro da Academia automaticamente.
        </p>

        {!demorou ? (
          <div className="mt-8 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        ) : (
          <div className="mt-8 flex w-full flex-col gap-3">
            <p className="text-xs text-ink-soft">
              Está demorando mais que o normal. Se você pagou por boleto, a
              confirmação pode levar até 2 dias úteis.
            </p>
            <LinkButton href="/home" variant="navy">
              Tentar entrar agora
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}
