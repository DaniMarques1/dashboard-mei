"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type PeriodMode = "month" | "year";

interface PeriodState {
  ano: number;
  mes: number; // 1-12, usado quando mode === "month"
  mode: PeriodMode;
  /** Para comparação: exibir ano anterior junto */
  compareWithPrevious: boolean;
}

interface PeriodContextValue extends PeriodState {
  setAno: (ano: number) => void;
  setMes: (mes: number) => void;
  setMode: (mode: PeriodMode) => void;
  setCompareWithPrevious: (v: boolean) => void;
  setPeriod: (ano: number, mes?: number) => void;
}

// Default 2023 para compatibilidade com dados mock iniciais
const defaultState: PeriodState = {
  ano: 2023,
  mes: 10,
  mode: "month",
  compareWithPrevious: false,
};

const PeriodContext = createContext<PeriodContextValue | null>(null);

export function PeriodProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PeriodState>(defaultState);

  const setAno = useCallback((ano: number) => setState((s) => ({ ...s, ano })), []);
  const setMes = useCallback((mes: number) => setState((s) => ({ ...s, mes })), []);
  const setMode = useCallback((mode: PeriodMode) => setState((s) => ({ ...s, mode })), []);
  const setCompareWithPrevious = useCallback((compareWithPrevious: boolean) => setState((s) => ({ ...s, compareWithPrevious })), []);

  const setPeriod = useCallback((ano: number, mes?: number) => {
    setState((s) => ({
      ...s,
      ano,
      ...(mes !== undefined && { mes }),
    }));
  }, []);

  const value: PeriodContextValue = {
    ...state,
    setAno,
    setMes,
    setMode,
    setCompareWithPrevious,
    setPeriod,
  };

  return <PeriodContext.Provider value={value}>{children}</PeriodContext.Provider>;
}

export function usePeriod() {
  const ctx = useContext(PeriodContext);
  if (!ctx) throw new Error("usePeriod must be used within PeriodProvider");
  return ctx;
}

export const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
