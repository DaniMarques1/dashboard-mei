"use client";

import { useState } from "react";
import { Card, Title, BarChart, DonutChart, Text, Flex } from "@tremor/react";
import { MESES } from "@/contexts/PeriodContext";
import { DrillDownModal } from "./DrillDownModal";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Transacao } from "@/lib/types";
import type { ResumoMensal } from "@/lib/types";
import type { ResumoPorCategoria } from "@/lib/types";

interface RevenueAnalysisProps {
  resumosMensais?: ResumoMensal[];
  receitaPorCategoria?: ResumoPorCategoria[];
  transactions?: Transacao[];
}

export function RevenueAnalysis({
  resumosMensais = [],
  receitaPorCategoria = [],
  transactions = [],
}: RevenueAnalysisProps) {
  const [drillDown, setDrillDown] = useState<{ title: string; items: Transacao[] } | null>(null);

  const chartData = resumosMensais.map((r) => ({
    date: MESES[r.mes - 1],
    "Faturamento": r.faturamento,
    "Limite": 6750,
  }));

  const categoryData = receitaPorCategoria.map((c) => ({ name: c.nome, value: c.valor }));
  const colors = ["blue", "emerald", "violet", "amber"];

  const handleBarClick = (monthIndex: number) => {
    const r = resumosMensais[monthIndex];
    if (!r) return;
    const items = transactions.filter(
      (t) => t.tipo === "entrada" && t.mesAno === r.mesAno && t.status !== "cancelado"
    );
    setDrillDown({ title: `Transações - ${MESES[r.mes - 1]}/${r.ano}`, items });
  };

  const handleCategoryClick = (categoryName: string) => {
    const catMap: Record<string, string> = {
      Consultoria: "consultoria",
      "Produtos Digitais": "produtos_digitais",
      Workshops: "workshops",
      Outros: "outros",
    };
    const cat = catMap[categoryName] ?? categoryName.toLowerCase().replace(/\s/g, "_");
    const items = transactions.filter(
      (t) => t.tipo === "entrada" && t.categoria === cat && t.status !== "cancelado"
    );
    setDrillDown({ title: `Transações - ${categoryName}`, items });
  };

  const isEmpty = chartData.every((d) => d.Faturamento === 0) && categoryData.length === 0;

  if (isEmpty) {
    return (
      <div className="mt-8">
        <EmptyState title="Sem dados de faturamento" description="Adicione transações de entrada para visualizar os gráficos." />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2 bg-[#111527] border-gray-800">
          <div title="Clique em uma barra para ver as transações do mês">
            <Title className="text-white">Faturamento Mensal vs. Limite MEI</Title>
            <Text className="text-gray-400">Progresso em relação ao limite anual. Clique na barra para detalhes.</Text>
          </div>
          <BarChart
            className="mt-6 h-80"
            data={chartData}
            index="date"
            categories={["Faturamento"]}
            colors={["blue"]}
            showLegend={false}
            valueFormatter={(n) => `R$ ${Intl.NumberFormat("pt-BR").format(n)}`}
            yAxisWidth={60}
            showGridLines={false}
            onValueChange={(v) => {
              if (v?.date) {
                const idx = chartData.findIndex((d) => d.date === v.date);
                if (idx >= 0) handleBarClick(idx);
              }
            }}
          />
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <Title className="text-white text-center">Receita por Categoria</Title>
          <Text className="text-gray-400 text-center">Clique para ver transações da categoria</Text>
          <DonutChart
            className="mt-6 h-60"
            data={categoryData}
            category="value"
            index="name"
            colors={colors as ("blue" | "emerald" | "violet" | "amber")[]}
            valueFormatter={(n) => `R$ ${Intl.NumberFormat("pt-BR").format(n)}`}
            showAnimation
          />
          <div className="mt-6 space-y-2">
            {categoryData.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => handleCategoryClick(item.name)}
                className="flex justify-between items-center text-sm w-full py-1 rounded hover:bg-white/5 transition-colors text-left"
                title={`Ver transações de ${item.name}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-emerald-500" : idx === 2 ? "bg-violet-500" : "bg-amber-500"}`}
                  />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-white font-medium">R$ {Intl.NumberFormat("pt-BR").format(item.value)}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {drillDown && (
        <DrillDownModal
          isOpen
          onClose={() => setDrillDown(null)}
          title={drillDown.title}
          transactions={drillDown.items}
        />
      )}
    </>
  );
}
