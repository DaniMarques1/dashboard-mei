"use client";

import { usePeriod } from "@/contexts/PeriodContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCards } from "./StatCards";
import { RevenueAnalysis } from "./RevenueAnalysis";
import { TransactionsTable } from "./TransactionsTable";
import type { StatItem } from "./StatCards";

export function DashboardContent() {
  const { ano, mes, mode } = usePeriod();
  const data = useDashboardData(ano, mes, mode);

  const formatBrl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const stats: StatItem[] = [
    {
      title: "Faturamento Total",
      metric: formatBrl(data.faturamentoAtual),
      delta: `${data.crescimentoFaturamento >= 0 ? "+" : ""}${data.crescimentoFaturamento.toFixed(1)}%`,
      deltaType: data.crescimentoFaturamento >= 0 ? "moderateIncrease" : "moderateDecrease",
      color: "blue",
      tooltip: `${mode === "year" ? "Total do ano" : "Total do mês"} comparado ao período anterior`,
      sparklineData: data.sparklineFaturamento,
    },
    {
      title: "Lucro Líquido",
      metric: formatBrl(data.lucroAtual),
      delta: data.lucroAtual >= 0 ? "Positivo" : "Negativo",
      deltaType: data.lucroAtual >= 0 ? "moderateIncrease" : "moderateDecrease",
      color: "emerald",
      tooltip: "Receitas menos gastos no período",
      sparklineData: data.resumosMensais.map((r) => r.lucro),
    },
    {
      title: "Ticket Médio",
      metric: formatBrl(data.ticketMedio),
      subtext: "Por transação de entrada",
      color: "violet",
      tooltip: "Valor médio por venda/serviço prestado",
    },
    {
      title: "Limite MEI",
      metric: formatBrl(data.MEI_LIMIT_ANUAL - data.resumoAnual.faturamentoTotal),
      subtext: `${(100 - data.resumoAnual.percentualLimiteUsado).toFixed(0)}% disponível`,
      progressValue: Math.min(100, data.resumoAnual.percentualLimiteUsado),
      color: data.resumoAnual.percentualLimiteUsado > 90 ? "rose" : "amber",
      tooltip: `Usado ${data.resumoAnual.percentualLimiteUsado.toFixed(1)}% do limite anual de R$ 81.000`,
    },
  ];

  return (
    <>
      <StatCards stats={stats} />
      <RevenueAnalysis
        resumosMensais={data.resumosMensais}
        receitaPorCategoria={data.receitaPorCategoria}
        transactions={data.transactions}
      />
      <TransactionsTable transactions={data.transactions} />
    </>
  );
}
