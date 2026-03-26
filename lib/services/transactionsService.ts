"use client";

import type { Transacao } from "../types";
import { MOCK_TRANSACOES } from "../data/mockData";

type Listener = (transactions: Transacao[]) => void;

let transactions: Transacao[] = [...MOCK_TRANSACOES];
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn([...transactions]));
}

export function getTransactions(): Transacao[] {
  return [...transactions];
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  listener([...transactions]);
  return () => listeners.delete(listener);
}

export function addTransaction(t: Omit<Transacao, "id" | "mesAno">): Transacao {
  const date = new Date(t.data);
  const mesAno = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const id = `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const nova: Transacao = { ...t, id, mesAno };
  transactions.push(nova);
  notify();
  return nova;
}

export function deleteTransaction(id: string): void {
  transactions = transactions.filter((tr) => tr.id !== id);
  notify();
}

export function updateTransaction(id: string, updates: Partial<Transacao>): Transacao | null {
  const idx = transactions.findIndex((tr) => tr.id === id);
  if (idx === -1) return null;
  const updated = { ...transactions[idx], ...updates };
  if (updates.data) {
    const date = new Date(updates.data);
    updated.mesAno = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }
  transactions[idx] = updated;
  notify();
  return updated;
}
