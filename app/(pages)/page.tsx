import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/dashboard/StatCards";
import { RevenueAnalysis } from "@/components/dashboard/RevenueAnalysis";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f18] flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 xl:p-12 max-w-[1600px] mx-auto overflow-y-auto">
        <Header />
        <StatCards />
        <RevenueAnalysis />
        <TransactionsTable />
      </main>
    </div>
  );
}
