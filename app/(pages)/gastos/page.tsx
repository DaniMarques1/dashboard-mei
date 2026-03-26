import { Header } from "@/components/dashboard/Header";
import { GastosContent } from "@/components/dashboard/GastosContent";

export default function GastosPage() {
  return (
    <>
      <Header title="Gastos" subtitle="Controle e acompanhe seus custos operacionais." />
      <GastosContent />
    </>
  );
}
