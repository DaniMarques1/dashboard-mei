/** Tipo da transação: entrada (receita) ou saída (gasto) */
export type TipoTransacao = "entrada" | "saida";

/** Status do pagamento */
export type StatusTransacao = "pago" | "pendente" | "vencido" | "cancelado";

/** Categorias de receita (para entradas) */
export type CategoriaReceita = "consultoria" | "produtos_digitais" | "workshops" | "outros";

/** Categorias de gasto (para saídas) */
export type CategoriaGasto = "materiais" | "servicos" | "software" | "outros";

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  data: string; // ISO date YYYY-MM-DD
  valor: number;
  categoria: CategoriaReceita | CategoriaGasto;
  descricao: string;
  status: StatusTransacao;
  /** Cliente ou fornecedor (opcional) */
  contraparte?: string;
  /** Mês/ano para agrupamento YYYY-MM */
  mesAno: string;
}

export interface ResumoMensal {
  mesAno: string;
  mes: number;
  ano: number;
  faturamento: number;
  gastos: number;
  lucro: number;
  dasPago: boolean;
  transacoes: number;
}

export interface ResumoAnual {
  ano: number;
  faturamentoTotal: number;
  gastosTotal: number;
  lucroTotal: number;
  mesesDasPagos: number;
  limiteMei: number;
  percentualLimiteUsado: number;
}

export interface ResumoPorCategoria {
  nome: string;
  valor: number;
  quantidade: number;
}

export const CATEGORIAS_RECEITA_LABELS: Record<CategoriaReceita, string> = {
  consultoria: "Consultoria",
  produtos_digitais: "Produtos Digitais",
  workshops: "Workshops",
  outros: "Outros",
};

export const CATEGORIAS_GASTO_LABELS: Record<CategoriaGasto, string> = {
  materiais: "Materiais",
  servicos: "Serviços",
  software: "Software",
  outros: "Outros",
};
