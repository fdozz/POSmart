import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/layout/TopBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Sidebar />
      <div className="ml-[72px] flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
