"use client";

import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Badge, Title, Flex } from "@tremor/react";
import { MoreHorizontal } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Transacao } from "@/lib/types";

const CAT_LABELS: Record<string, string> = {
  materiais: "Materiais",
  servicos: "Serviços",
  software: "Software",
  outros: "Outros",
};

interface ExpensesTableProps {
  transactions?: Transacao[];
}

export function ExpensesTable({ transactions = [] }: ExpensesTableProps) {
  const expenses = transactions
    .filter((t) => t.tipo === "saida" && t.status !== "cancelado")
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 10);

  if (expenses.length === 0) {
    return (
      <Card className="mt-8 bg-[#111827] border-gray-800">
        <Title className="text-white mb-4">Últimos Gastos</Title>
        <EmptyState title="Nenhum gasto" description="Adicione transações de saída para visualizar." />
      </Card>
    );
  }

  return (
    <Card className="mt-8 bg-[#111827] border-gray-800">
      <Flex alignItems="center" justifyContent="between" className="mb-4">
        <Title className="text-white">Últimos Gastos</Title>
        <button className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1">
          Ver todos →
        </button>
      </Flex>
      <div className="overflow-x-auto">
        <Table className="mt-5">
          <TableHead>
            <TableRow className="border-gray-800">
              <TableHeaderCell className="text-gray-400 font-medium">ID</TableHeaderCell>
              <TableHeaderCell className="text-gray-400 font-medium">DESCRIÇÃO / CATEGORIA</TableHeaderCell>
              <TableHeaderCell className="text-gray-400 font-medium">DATA</TableHeaderCell>
              <TableHeaderCell className="text-gray-400 font-medium text-right">VALOR</TableHeaderCell>
              <TableHeaderCell className="text-gray-400 font-medium">STATUS</TableHeaderCell>
              <TableHeaderCell className="text-gray-400 font-medium">AÇÕES</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((item) => (
              <TableRow key={item.id} className="border-gray-800 hover:bg-white/5 transition-colors">
                <TableCell className="text-gray-400 text-sm">{item.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Text className="text-white font-medium">{item.descricao}</Text>
                    <Text className="text-gray-500 text-xs">{CAT_LABELS[item.categoria] ?? item.categoria}</Text>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 text-sm">
                  {new Date(item.data).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">
                  <Text className="text-rose-400 font-medium">
                    -R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge
                    color={item.status === "pago" ? "emerald" : "amber"}
                    className={
                      item.status === "pago"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }
                  >
                    {item.status === "pago" ? "Pago" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
