"use client";

import { usePeriod } from "@/contexts/PeriodContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCards } from "./StatCards";
import { ExpenseChart } from "./ExpenseChart";
import { MonthlyExpensesChart } from "./MonthlyExpensesChart";
import { ExpensesTable } from "./ExpensesTable";
import type { StatItem } from "./StatCards";

const GASTOS_ALERTA_LIMITE = 60;

export function GastosContent() {
  const { ano, mes, mode } = usePeriod();
  const data = useDashboardData(ano, mes, mode);

  const formatBrl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const maiorCategoria = data.gastosPorCategoria[0];
  const alertaGastos = data.percentualGastos > GASTOS_ALERTA_LIMITE;

  const stats: StatItem[] = [
    {
      title: "Gastos Totais",
      metric: formatBrl(data.gastosAtual),
      delta: `${data.crescimentoGastos >= 0 ? "+" : ""}${data.crescimentoGastos.toFixed(1)}%`,
      deltaType: data.crescimentoGastos <= 0 ? "moderateDecrease" : "moderateIncrease",
      color: "rose",
      tooltip: "Comparado ao período anterior",
      sparklineData: data.sparklineGastos,
    },
    {
      title: "Média Mensal",
      metric: formatBrl(
        data.resumosMensais.length
          ? data.resumoAnual.gastosTotal /
              data.resumosMensais.filter((r) => r.gastos > 0).length || 0
          : 0
      ),
      color: "amber",
      sparklineData: data.sparklineGastos,
    },
    {
      title: "% do Faturamento",
      metric: `${data.percentualGastos.toFixed(1)}%`,
      subtext: alertaGastos ? `⚠️ Acima de ${GASTOS_ALERTA_LIMITE}%` : "Dentro do esperado",
      progressValue: Math.min(100, data.percentualGastos),
      color: alertaGastos ? "rose" : "emerald",
      tooltip: `Gastos representam ${data.percentualGastos.toFixed(1)}% do faturamento. Alerta se > ${GASTOS_ALERTA_LIMITE}%.`,
    },
    {
      title: "Maior Categoria",
      metric: maiorCategoria?.nome ?? "-",
      subtext: maiorCategoria ? formatBrl(maiorCategoria.valor) : "Sem dados",
      color: "violet",
      tooltip: "Categoria com maior volume de gastos",
    },
  ];

  return (
    <>
      <StatCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <MonthlyExpensesChart resumosMensais={data.resumosMensais} transactions={data.transactions} />
        <ExpenseChart gastosPorCategoria={data.gastosPorCategoria} transactions={data.transactions} />
      </div>
      <ExpensesTable transactions={data.transactions} />
    </>
  );
}
