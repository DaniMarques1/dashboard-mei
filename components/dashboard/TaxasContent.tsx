"use client";

import { usePeriod } from "@/contexts/PeriodContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCards } from "./StatCards";
import { TaxChart } from "./TaxChart";
import { TaxBreakdown } from "./TaxBreakdown";
import type { StatItem } from "./StatCards";

export function TaxasContent() {
  const { ano } = usePeriod();
  const data = useDashboardData(ano, 1, "year");

  const formatBrl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const proximoVencimento = new Date(ano, new Date().getMonth(), 20);
  const statusFiscal = data.resumoAnual.mesesDasPagos >= 10 ? "Em dia" : "Pendências";

  const stats: StatItem[] = [
    {
      title: "DAS Mensal",
      metric: formatBrl(data.DAS_VALOR),
      subtext: "Valor fixo MEI",
      color: "emerald",
      tooltip: "Carnê simplificado - INSS, ISS, ICMS inclusos",
    },
    {
      title: `Pago em ${ano}`,
      metric: formatBrl(data.resumoAnual.mesesDasPagos * data.DAS_VALOR),
      subtext: `${data.resumoAnual.mesesDasPagos} de 12 meses`,
      progressValue: Math.round((data.resumoAnual.mesesDasPagos / 12) * 100),
      color: "blue",
      tooltip: "Meses de DAS pagos no ano",
    },
    {
      title: "Próximo Vencimento",
      metric: proximoVencimento.toLocaleDateString("pt-BR"),
      subtext: "DAS - dia 20 de cada mês",
      color: "amber",
      tooltip: "Data limite para pagamento",
    },
    {
      title: "Status Fiscal",
      metric: statusFiscal,
      subtext: "Obrigações em dia",
      progressValue: data.resumoAnual.mesesDasPagos >= 10 ? 100 : 70,
      color: data.resumoAnual.mesesDasPagos >= 10 ? "emerald" : "amber",
      tooltip: "Situação das obrigações fiscais",
    },
  ];

  return (
    <>
      <StatCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <TaxChart resumoAnual={data.resumoAnual} />
      </div>
      <TaxBreakdown resumoAnual={data.resumoAnual} />
    </>
  );
}
