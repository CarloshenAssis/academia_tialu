"use client";

import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function InstalarApp() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalado(true);
      return;
    }

    function onPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (instalado) {
    return (
      <p className="text-sm text-success">
        ✓ Você já está usando o aplicativo instalado. Tudo certo!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {promptEvent ? (
        <Button variant="gold" onClick={() => promptEvent.prompt()}>
          <Smartphone size={18} className="mr-2" /> Instalar aplicativo agora
        </Button>
      ) : (
        <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-soft">
          <p>
            <span className="font-semibold text-ink">No Android (Chrome):</span> toque no menu ⋮
            do navegador e escolha <span className="font-semibold text-ink">&ldquo;Instalar aplicativo&rdquo;</span>.
          </p>
          <p>
            <span className="font-semibold text-ink">No iPhone (Safari):</span> toque no botão de
            compartilhar <span aria-hidden>⎋</span> e escolha{" "}
            <span className="font-semibold text-ink">&ldquo;Adicionar à Tela de Início&rdquo;</span>.
          </p>
          <p>O ícone da Academia Tia Lu vai aparecer junto dos seus outros aplicativos.</p>
        </div>
      )}
    </div>
  );
}
