"use client";

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, ProgressBar } from "@tremor/react";
import { DAS_VALOR } from "@/lib/data/mockData";
import type { ResumoAnual } from "@/lib/types";

interface TaxBreakdownProps {
  resumoAnual?: ResumoAnual;
}

export function TaxBreakdown({ resumoAnual }: TaxBreakdownProps) {
  const mesesPagos = resumoAnual?.mesesDasPagos ?? 0;

  const taxItems = [
    { name: "DAS (MEI)", dueDate: "20/mês", amount: `R$ ${DAS_VALOR.toFixed(2).replace(".", ",")}`, status: mesesPagos > 0 ? "Pago" : "Pendente", progress: Math.min(100, (mesesPagos / 12) * 100) },
    { name: "INSS", dueDate: "Incluso no DAS", amount: "Incluso", status: "Pago", progress: 100 },
    { name: "ISS (se aplicável)", dueDate: "Varia", amount: "R$ 0,00", status: "N/A", progress: 0 },
  ];
    return (
        <Card className="mt-8 bg-[#111827] border-gray-800">
            <Title className="text-white">Resumo de Tributos MEI</Title>
            <Text className="text-gray-400">Obrigações fiscais e prazos de pagamento</Text>
            <Table className="mt-6">
                <TableHead>
                    <TableRow className="border-gray-800">
                        <TableHeaderCell className="text-gray-400 font-medium">TRIBUTO</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">VENCIMENTO</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium text-right">VALOR</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">STATUS</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taxItems.map((item) => (
                        <TableRow key={item.name} className="border-gray-800 hover:bg-white/5 transition-colors">
                            <TableCell className="text-white font-medium">{item.name}</TableCell>
                            <TableCell className="text-gray-400">{item.dueDate}</TableCell>
                            <TableCell className="text-right text-white">{item.amount}</TableCell>
                            <TableCell>
                                {item.progress > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <ProgressBar value={item.progress} color="emerald" className="h-1.5 w-20" />
                                        <span className="text-emerald-500 text-sm">{item.status}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-sm">{item.status}</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
