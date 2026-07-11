import { ReactNode } from "react";
import { BottomNav } from "@/components/app/BottomNav";
import { DesktopSideNav } from "@/components/app/DesktopSideNav";
import { DeviceGuard } from "@/components/app/DeviceGuard";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full bg-cream">
      <DesktopSideNav />
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col md:max-w-none">
        <DeviceGuard />
        <main className="flex-1 px-5 pb-28 pt-8 md:px-10 md:pb-10 md:pt-10">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
