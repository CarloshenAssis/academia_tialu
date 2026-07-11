import { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-cream px-6 py-10 md:items-center">
      <div className="app-shell flex w-full flex-1 flex-col md:flex-none md:rounded-3xl md:bg-card md:p-10 md:shadow-xl">
        <Logo size={48} className="mb-6" />
        {children}
      </div>
    </div>
  );
}
