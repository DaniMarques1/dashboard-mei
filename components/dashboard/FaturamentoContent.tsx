"use client";

import { usePeriod } from "@/contexts/PeriodContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCards } from "./StatCards";
import { RevenueAnalysis } from "./RevenueAnalysis";
import { TransactionsTable } from "./TransactionsTable";
import type { StatItem } from "./StatCards";

export function FaturamentoContent() {
  const { ano, mes, mode } = usePeriod();
  const data = useDashboardData(ano, mes, mode);

  const formatBrl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const mediaMensal = data.resumosMensais.length
    ? data.resumoAnual.faturamentoTotal / data.resumosMensais.filter((r) => r.faturamento > 0).length || 0
    : 0;

  const stats: StatItem[] = [
    {
      title: "Faturamento Total",
      metric: formatBrl(data.faturamentoAtual),
      delta: `${data.crescimentoFaturamento >= 0 ? "+" : ""}${data.crescimentoFaturamento.toFixed(1)}%`,
      deltaType: data.crescimentoFaturamento >= 0 ? "moderateIncrease" : "moderateDecrease",
      color: "blue",
      tooltip: "Comparado ao período anterior",
      sparklineData: data.sparklineFaturamento,
    },
    {
      title: "Média Mensal",
      metric: formatBrl(mediaMensal),
      color: "emerald",
      tooltip: "Média do faturamento nos meses com movimentação",
      sparklineData: data.sparklineFaturamento,
    },
    {
      title: "Ticket Médio",
      metric: formatBrl(data.ticketMedio),
      subtext: "Por transação",
      color: "violet",
      tooltip: "Valor médio por venda/serviço",
    },
    {
      title: "Limite Restante",
      metric: formatBrl(data.MEI_LIMIT_ANUAL - data.resumoAnual.faturamentoTotal),
      subtext: `${(100 - data.resumoAnual.percentualLimiteUsado).toFixed(0)}% disponível`,
      progressValue: Math.min(100, data.resumoAnual.percentualLimiteUsado),
      color: data.resumoAnual.percentualLimiteUsado > 90 ? "rose" : "amber",
      tooltip: `Limite anual MEI: R$ 81.000`,
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
