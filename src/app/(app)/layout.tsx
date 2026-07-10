import { ReactNode } from "react";
import { BottomNav } from "@/components/app/BottomNav";
import { DeviceGuard } from "@/components/app/DeviceGuard";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell relative flex min-h-screen w-full flex-1 flex-col bg-cream">
      <DeviceGuard />
      <main className="flex-1 px-5 pb-28 pt-8">{children}</main>
      <BottomNav />
    </div>
  );
}
