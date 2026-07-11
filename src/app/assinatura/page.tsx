import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/queries";
import { Logo } from "@/components/ui/Logo";
import { LogoutButton } from "@/components/app/LogoutButton";
import { AssinaturaForm } from "./AssinaturaForm";

export default async function AssinaturaPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.plan_status === "ativo") redirect("/home");

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-cream px-6 py-10 md:items-center">
      <div className="app-shell flex w-full flex-1 flex-col md:flex-none md:rounded-3xl md:bg-card md:p-10 md:shadow-xl">
        <Logo size={48} className="mb-6" />
        <h1 className="font-display text-2xl font-bold text-ink">Ative sua assinatura</h1>
        <p className="mt-1 text-sm text-ink-soft">
          R$ 29,90 por mês — acesso a todos os cursos, materiais e à comunidade da Academia Tia Lu.
        </p>

        <AssinaturaForm cpfInicial={profile.cpf_cnpj ?? ""} />

        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
