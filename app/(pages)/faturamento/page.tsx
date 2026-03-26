import { Header } from "@/components/dashboard/Header";
import { FaturamentoContent } from "@/components/dashboard/FaturamentoContent";

export default function FaturamentoPage() {
  return (
    <>
      <Header title="Faturamento" subtitle="Acompanhe sua receita e desempenho financeiro." />
      <FaturamentoContent />
    </>
  );
}
