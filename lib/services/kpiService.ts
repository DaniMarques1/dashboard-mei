import type { Transacao, ResumoMensal, ResumoAnual, ResumoPorCategoria } from "../types";
import { MEI_LIMIT_ANUAL, DAS_VALOR } from "../data/mockData";
import { CATEGORIAS_RECEITA_LABELS, CATEGORIAS_GASTO_LABELS } from "../types";

/** Filtra transações por ano e opcionalmente por mês (1-12) */
export function filterByPeriod(
  transactions: Transacao[],
  ano: number,
  mes?: number
): Transacao[] {
  return transactions.filter((t) => {
    const [y, m] = t.mesAno.split("-").map(Number);
    if (mes !== undefined) return y === ano && m === mes;
    return y === ano;
  });
}

/** Retorna entradas filtradas */
export function getEntradas(transactions: Transacao[], ano: number, mes?: number): Transacao[] {
  return filterByPeriod(transactions, ano, mes).filter((t) => t.tipo === "entrada" && t.status !== "cancelado");
}

/** Retorna saídas filtradas (excluindo DAS para análise de gastos operacionais quando necessário) */
export function getSaidas(transactions: Transacao[], ano: number, mes?: number, incluirDas = true): Transacao[] {
  const saidas = filterByPeriod(transactions, ano, mes).filter((t) => t.tipo === "saida" && t.status !== "cancelado");
  if (!incluirDas) return saidas.filter((t) => !t.descricao.toLowerCase().includes("das"));
  return saidas;
}

/** Resumo mensal para um ano */
export function getResumosMensais(transactions: Transacao[], ano: number): ResumoMensal[] {
  const meses: ResumoMensal[] = [];
  for (let m = 1; m <= 12; m++) {
    const entradas = getEntradas(transactions, ano, m);
    const saidas = getSaidas(transactions, ano, m);
    const faturamento = entradas.reduce((s, t) => s + t.valor, 0);
    const gastos = saidas.reduce((s, t) => s + t.valor, 0);
    const dasPago = saidas.some((t) => t.descricao.toLowerCase().includes("das") && t.status === "pago");
    meses.push({
      mesAno: `${ano}-${String(m).padStart(2, "0")}`,
      mes: m,
      ano,
      faturamento,
      gastos,
      lucro: faturamento - gastos,
      dasPago,
      transacoes: entradas.length + saidas.length,
    });
  }
  return meses;
}

/** Resumo anual */
export function getResumoAnual(transactions: Transacao[], ano: number): ResumoAnual {
  const entradas = getEntradas(transactions, ano);
  const saidas = getSaidas(transactions, ano);
  const faturamentoTotal = entradas.reduce((s, t) => s + t.valor, 0);
  const gastosTotal = saidas.reduce((s, t) => s + t.valor, 0);
  const mesesDasPagos = saidas.filter((t) => t.descricao.toLowerCase().includes("das") && t.status === "pago").length;
  const percentualLimiteUsado = (faturamentoTotal / MEI_LIMIT_ANUAL) * 100;

  return {
    ano,
    faturamentoTotal,
    gastosTotal,
    lucroTotal: faturamentoTotal - gastosTotal,
    mesesDasPagos,
    limiteMei: MEI_LIMIT_ANUAL,
    percentualLimiteUsado,
  };
}

/** Resumo por categoria (receita ou gasto) */
export function getResumoPorCategoria(
  transactions: Transacao[],
  tipo: "entrada" | "saida",
  ano: number,
  mes?: number
): ResumoPorCategoria[] {
  const filtered = filterByPeriod(transactions, ano, mes).filter((t) => t.tipo === tipo && t.status !== "cancelado");
  const map = new Map<string, { valor: number; quantidade: number }>();
  const labels = tipo === "entrada" ? CATEGORIAS_RECEITA_LABELS : CATEGORIAS_GASTO_LABELS;

  for (const t of filtered) {
    const cat = t.categoria as keyof typeof labels;
    const label = labels[cat] ?? t.categoria;
    const curr = map.get(label) ?? { valor: 0, quantidade: 0 };
    curr.valor += t.valor;
    curr.quantidade += 1;
    map.set(label, curr);
  }

  return Array.from(map.entries()).map(([nome, data]) => ({ nome, valor: data.valor, quantidade: data.quantidade }));
}

/** Lucro líquido para período */
export function getLucroLiquido(transactions: Transacao[], ano: number, mes?: number): number {
  const entradas = getEntradas(transactions, ano, mes).reduce((s, t) => s + t.valor, 0);
  const saidas = getSaidas(transactions, ano, mes).reduce((s, t) => s + t.valor, 0);
  return entradas - saidas;
}

/** % de crescimento do período atual vs mesmo período ano anterior */
export function getPercentualCrescimento(
  transactions: Transacao[],
  ano: number,
  mes: number,
  campo: "faturamento" | "gastos" | "lucro"
): number {
  const resumosAtual = getResumosMensais(transactions, ano);
  const resumosAnterior = getResumosMensais(transactions, ano - 1);
  const rAtual = resumosAtual.find((x) => x.mes === mes)!;
  const rAnterior = resumosAnterior.find((x) => x.mes === mes)!;

  const current = campo === "lucro" ? (rAtual?.lucro ?? 0) : campo === "faturamento" ? (rAtual?.faturamento ?? 0) : (rAtual?.gastos ?? 0);
  const previous = campo === "lucro" ? (rAnterior?.lucro ?? 0) : campo === "faturamento" ? (rAnterior?.faturamento ?? 0) : (rAnterior?.gastos ?? 0);

  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/** % de crescimento anual (ano atual vs ano anterior) */
export function getPercentualCrescimentoAnual(
  transactions: Transacao[],
  ano: number,
  campo: "faturamento" | "gastos" | "lucro"
): number {
  const rAtual = getResumoAnual(transactions, ano);
  const rAnterior = getResumoAnual(transactions, ano - 1);
  const current = campo === "lucro" ? rAtual.lucroTotal : campo === "faturamento" ? rAtual.faturamentoTotal : rAtual.gastosTotal;
  const previous = campo === "lucro" ? rAnterior.lucroTotal : campo === "faturamento" ? rAnterior.faturamentoTotal : rAnterior.gastosTotal;
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/** Ticket médio (faturamento / quantidade de entradas) */
export function getTicketMedio(transactions: Transacao[], ano: number, mes?: number): number {
  const entradas = getEntradas(transactions, ano, mes);
  const total = entradas.reduce((s, t) => s + t.valor, 0);
  return entradas.length > 0 ? total / entradas.length : 0;
}

/** % gastos em relação ao faturamento */
export function getPercentualGastosFaturamento(transactions: Transacao[], ano: number, mes?: number): number {
  const fat = getEntradas(transactions, ano, mes).reduce((s, t) => s + t.valor, 0);
  const gast = getSaidas(transactions, ano, mes).reduce((s, t) => s + t.valor, 0);
  if (fat === 0) return 0;
  return (gast / fat) * 100;
}

export { MEI_LIMIT_ANUAL, DAS_VALOR };
