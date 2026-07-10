import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell flex min-h-screen w-full flex-1 flex-col bg-cream px-6 py-10">
      {children}
    </main>
  );
}
