import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentProfile } from "@/lib/queries";
import { PerfilForm } from "./PerfilForm";
import { SenhaForm } from "./SenhaForm";
import { InstalarApp } from "./InstalarApp";

export default async function ConfiguracoesPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-xl">
      <div className="flex items-center gap-3">
        <Link
          href="/perfil"
          aria-label="Voltar ao perfil"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-ink shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-xl font-bold text-ink">Configurações</h1>
      </div>

      <section className="rounded-2xl bg-card p-5 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Meus dados</h2>
        <PerfilForm profile={profile} />
      </section>

      <section className="rounded-2xl bg-card p-5 shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Alterar senha</h2>
        <SenhaForm />
      </section>

      <section
        id="instalar"
        className="rounded-2xl bg-card p-5 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
      >
        <h2 className="mb-4 font-display text-base font-bold text-ink">
          Instalar o aplicativo no celular
        </h2>
        <InstalarApp />
      </section>

      <p className="text-center text-xs text-ink-soft">
        Ao usar a Academia Tia Lu você concorda com os{" "}
        <Link href="/termos" className="underline underline-offset-4">
          Termos de uso e privacidade
        </Link>
        .
      </p>
    </div>
  );
}
