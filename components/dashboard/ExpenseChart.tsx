"use client";

import { useState } from "react";
import { Card, Title, Text, DonutChart } from "@tremor/react";
import { DrillDownModal } from "./DrillDownModal";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Transacao } from "@/lib/types";
import type { ResumoPorCategoria } from "@/lib/types";

interface ExpenseChartProps {
  gastosPorCategoria?: ResumoPorCategoria[];
  transactions?: Transacao[];
}

const CAT_MAP: Record<string, string> = {
  Materiais: "materiais",
  Serviços: "servicos",
  Software: "software",
  Outros: "outros",
};

const COLORS = ["rose", "amber", "violet", "emerald"];

export function ExpenseChart({ gastosPorCategoria = [], transactions = [] }: ExpenseChartProps) {
  const [drillDown, setDrillDown] = useState<{ title: string; items: Transacao[] } | null>(null);

  const categoryData = gastosPorCategoria.map((c) => ({ name: c.nome, value: c.valor }));

  const handleCategoryClick = (name: string) => {
    const cat = CAT_MAP[name] ?? name.toLowerCase();
    const items = transactions.filter(
      (t) => t.tipo === "saida" && t.categoria === cat && t.status !== "cancelado"
    );
    setDrillDown({ title: `Gastos - ${name}`, items });
  };

  if (categoryData.length === 0) {
    return (
      <Card className="mt-8 bg-[#111827] border-gray-800">
        <Title className="text-white">Gastos por Categoria</Title>
        <EmptyState title="Sem gastos" description="Nenhum gasto neste período." />
      </Card>
    );
  }

  return (
    <>
      <Card className="mt-8 bg-[#111827] border-gray-800">
        <Title className="text-white">Gastos por Categoria</Title>
        <Text className="text-gray-400">Clique para ver transações</Text>
        <DonutChart
          className="mt-6 h-60"
          data={categoryData}
          category="value"
          index="name"
          colors={COLORS as ("rose" | "amber" | "violet" | "emerald")[]}
          valueFormatter={(n) => `R$ ${Intl.NumberFormat("pt-BR").format(n)}`}
          showAnimation
        />
        <div className="mt-6 space-y-2">
          {categoryData.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => handleCategoryClick(item.name)}
              className="flex justify-between items-center text-sm w-full py-1 rounded hover:bg-white/5 transition-colors text-left"
              title={`Ver gastos de ${item.name}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-rose-500" : idx === 1 ? "bg-amber-500" : idx === 2 ? "bg-violet-500" : "bg-emerald-500"}`}
                />
                <span className="text-gray-400">{item.name}</span>
              </div>
              <span className="text-white font-medium">R$ {Intl.NumberFormat("pt-BR").format(item.value)}</span>
            </button>
          ))}
        </div>
      </Card>

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
