import { Header } from "@/components/dashboard/Header";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral das suas finanças." />
      <DashboardContent />
    </>
  );
}
