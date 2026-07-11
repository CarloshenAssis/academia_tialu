"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { salvarPerfil, type PerfilFormState } from "./actions";
import type { Profile } from "@/lib/database.types";

export function PerfilForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState<PerfilFormState, FormData>(salvarPerfil, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Nome completo"
        name="full_name"
        defaultValue={profile.full_name}
        autoComplete="name"
        required
      />
      <Input
        label="Data de nascimento"
        name="data_nascimento"
        type="date"
        defaultValue={profile.data_nascimento ?? ""}
      />
      <Input
        label="Telefone (com DDD)"
        name="telefone"
        type="tel"
        inputMode="tel"
        placeholder="(11) 99999-9999"
        defaultValue={profile.telefone ?? ""}
        hint="Usado como contato de apoio caso você perca o acesso ao e-mail."
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Foto de perfil</span>
        <input
          type="file"
          name="foto"
          accept="image/*"
          className="rounded-xl border border-ink/10 bg-card px-4 py-3 text-sm text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gold-dark"
        />
        <span className="text-xs text-ink-soft">JPG ou PNG, até 3 MB.</span>
      </label>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}
      {state.ok && <p className="text-sm text-success">Dados salvos com sucesso!</p>}

      <Button type="submit" variant="navy" disabled={pending}>
        {pending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}
