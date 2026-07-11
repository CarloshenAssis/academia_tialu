import { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-cream md:flex-row md:gap-4 md:p-4">
      <div className="flex w-full flex-1 flex-col items-center justify-start px-6 py-10 md:w-1/2 md:flex-none md:justify-center md:px-16 md:py-0">
        <div className="app-shell flex w-full flex-1 flex-col md:flex-none">
          <Logo size={48} className="mb-6" />
          {children}
        </div>
      </div>

      <div className="relative hidden overflow-hidden md:flex md:w-1/2 md:rounded-[2rem]">
        <div className="auth-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />

        <div className="auth-orb absolute -top-10 right-10 h-40 w-40 rounded-full bg-cream/20 blur-3xl" />
        <div
          className="auth-orb absolute bottom-24 left-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-10">
          <p className="max-w-xs font-display text-2xl font-bold leading-snug text-cream">
            Ideias prontas pra encantar a criançada, toda semana.
          </p>

          <div className="max-w-sm rounded-2xl bg-card/95 p-5 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-display text-sm font-bold text-gold-dark">
                MA
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Marli Andrade</p>
                <p className="text-xs text-ink-soft">Tia de igreja, EBD</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              &ldquo;Antes eu passava a semana toda garimpando ideia. Hoje já
              chego na aula com tudo pronto — molde, jogo e história.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
