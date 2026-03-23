"use client";

import { useState, useEffect } from "react";
import { getTransactions, subscribe } from "@/lib/services/transactionsService";
import {
  getResumoAnual,
  getResumosMensais,
  getResumoPorCategoria,
  getLucroLiquido,
  getPercentualCrescimento,
  getPercentualCrescimentoAnual,
  getTicketMedio,
  getPercentualGastosFaturamento,
  MEI_LIMIT_ANUAL,
  DAS_VALOR,
} from "@/lib/services/kpiService";
import type { Transacao } from "@/lib/types";

export function useDashboardData(ano: number, mes: number, mode: "month" | "year") {
  const [transactions, setTransactions] = useState<Transacao[]>(getTransactions);

  useEffect(() => {
    return subscribe(setTransactions);
  }, []);

  const resumoAnual = getResumoAnual(transactions, ano);
  const resumosMensais = getResumosMensais(transactions, ano);
  const resumoAnterior = getResumoAnual(transactions, ano - 1);

  const faturamentoAtual = mode === "year"
    ? resumoAnual.faturamentoTotal
    : resumosMensais.find((r) => r.mes === mes)?.faturamento ?? 0;

  const gastosAtual = mode === "year"
    ? resumoAnual.gastosTotal
    : resumosMensais.find((r) => r.mes === mes)?.gastos ?? 0;

  const lucroAtual = mode === "year"
    ? resumoAnual.lucroTotal
    : getLucroLiquido(transactions, ano, mes);

  const crescimentoFaturamento = mode === "year"
    ? getPercentualCrescimentoAnual(transactions, ano, "faturamento")
    : getPercentualCrescimento(transactions, ano, mes, "faturamento");

  const crescimentoGastos = mode === "year"
    ? getPercentualCrescimentoAnual(transactions, ano, "gastos")
    : getPercentualCrescimento(transactions, ano, mes, "gastos");

  const ticketMedio = getTicketMedio(transactions, ano, mode === "year" ? undefined : mes);
  const percentualGastos = getPercentualGastosFaturamento(transactions, ano, mode === "year" ? undefined : mes);

  const receitaPorCategoria = getResumoPorCategoria(transactions, "entrada", ano, mode === "year" ? undefined : mes);
  const gastosPorCategoria = getResumoPorCategoria(transactions, "saida", ano, mode === "year" ? undefined : mes);

  const sparklineFaturamento = resumosMensais.map((r) => r.faturamento);
  const sparklineGastos = resumosMensais.map((r) => r.gastos);

  return {
    transactions,
    resumoAnual,
    resumosMensais,
    resumoAnterior,
    faturamentoAtual,
    gastosAtual,
    lucroAtual,
    crescimentoFaturamento,
    crescimentoGastos,
    ticketMedio,
    percentualGastos,
    receitaPorCategoria,
    gastosPorCategoria,
    sparklineFaturamento,
    sparklineGastos,
    MEI_LIMIT_ANUAL,
    DAS_VALOR,
  };
}
