"use client";

import { PeriodProvider } from "@/contexts/PeriodContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PeriodFilter } from "@/components/dashboard/PeriodFilter";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PeriodProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-[#0a0f18] flex">
          <Sidebar />
          <main className="flex-1 min-w-0 ml-0 md:ml-64 p-4 sm:p-6 lg:p-8 xl:p-12 max-w-[1600px] mx-auto overflow-y-auto w-full transition-all">
            <div className="mb-4">
              <PeriodFilter />
            </div>
            {children}
          </main>
        </div>
        <FloatingActionButton />
      </SidebarProvider>
    </PeriodProvider>
  );
}
