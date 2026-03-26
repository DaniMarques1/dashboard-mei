"use client";

import { Card, Title, Text, BarChart } from "@tremor/react";
import { MESES } from "@/contexts/PeriodContext";
import { DAS_VALOR } from "@/lib/data/mockData";
import type { ResumoAnual } from "@/lib/types";

interface TaxChartProps {
  resumoAnual?: ResumoAnual;
}

export function TaxChart({ resumoAnual }: TaxChartProps) {
  const taxData = MESES.map((m, i) => ({
    month: m,
    DAS: resumoAnual && resumoAnual.mesesDasPagos > i ? DAS_VALOR : 0,
  }));

  return (
    <Card className="mt-8 bg-[#111527] border-gray-800 lg:col-span-2">
      <Title className="text-white">Histórico DAS (MEI)</Title>
      <Text className="text-gray-400">Pagamentos mensais do carnê simplificado</Text>
      <BarChart
        className="mt-6 h-72"
        data={taxData}
        index="month"
        categories={["DAS"]}
        colors={["emerald"]}
        showLegend={false}
        valueFormatter={(n) => `R$ ${n.toFixed(2).replace(".", ",")}`}
        yAxisWidth={60}
        showGridLines={false}
      />
    </Card>
  );
}
