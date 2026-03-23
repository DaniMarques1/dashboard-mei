"use client";

import { Card, Title, Text, BarChart } from "@tremor/react";
import { MESES } from "@/contexts/PeriodContext";
import type { ResumoMensal } from "@/lib/types";
import type { Transacao } from "@/lib/types";

interface MonthlyExpensesChartProps {
  resumosMensais?: ResumoMensal[];
  transactions?: Transacao[];
}

export function MonthlyExpensesChart({ resumosMensais = [], transactions = [] }: MonthlyExpensesChartProps) {
  const chartData = resumosMensais.map((r) => ({
    month: MESES[r.mes - 1],
    Gastos: r.gastos,
  }));

  const isEmpty = chartData.every((d) => d.Gastos === 0);

  if (isEmpty) {
    return (
      <Card className="mt-8 bg-[#111527] border-gray-800 lg:col-span-2">
        <Title className="text-white">Gastos Mensais</Title>
        <Text className="text-gray-400">Nenhum gasto neste período.</Text>
      </Card>
    );
  }

  return (
    <Card className="mt-8 bg-[#111527] border-gray-800 lg:col-span-2">
      <Title className="text-white">Gastos Mensais</Title>
      <Text className="text-gray-400">Evolução dos custos ao longo do ano</Text>
      <BarChart
        className="mt-6 h-72"
        data={chartData}
        index="month"
        categories={["Gastos"]}
        colors={["rose"]}
        showLegend={false}
        valueFormatter={(n) => `R$ ${Intl.NumberFormat("pt-BR").format(n)}`}
        yAxisWidth={60}
        showGridLines={false}
      />
    </Card>
  );
}
