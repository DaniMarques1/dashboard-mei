"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Transacao, TipoTransacao, CategoriaReceita, CategoriaGasto } from "@/lib/types";
import { CATEGORIAS_RECEITA_LABELS, CATEGORIAS_GASTO_LABELS } from "@/lib/types";
import { addTransaction } from "@/lib/services/transactionsService";

const CATEGORIAS_ENTRADA = Object.entries(CATEGORIAS_RECEITA_LABELS).map(([k, v]) => ({ value: k, label: v }));
const CATEGORIAS_SAIDA = Object.entries(CATEGORIAS_GASTO_LABELS).map(([k, v]) => ({ value: k, label: v }));

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const [tipo, setTipo] = useState<TipoTransacao>("entrada");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState<string>("consultoria");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<"pago" | "pendente">("pago");

  const categorias = tipo === "entrada" ? CATEGORIAS_ENTRADA : CATEGORIAS_SAIDA;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = parseFloat(valor.replace(",", "."));
    if (isNaN(v) || v <= 0) return;
    addTransaction({
      tipo,
      data,
      valor: v,
      categoria: categoria as CategoriaReceita | CategoriaGasto,
      descricao: descricao || "Sem descrição",
      status,
    });
    setValor("");
    setDescricao("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md bg-[#111827] border border-gray-800 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 id="modal-title" className="text-xl font-semibold text-white">
            Nova Transação
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tipo</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTipo("entrada")}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${tipo === "entrada" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-[#0d121f] border-gray-700 text-gray-400 hover:text-white"}`}
              >
                Entrada
              </button>
              <button
                type="button"
                onClick={() => setTipo("saida")}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${tipo === "saida" ? "bg-rose-500/10 border-rose-500/30 text-rose-500" : "bg-[#0d121f] border-gray-700 text-gray-400 hover:text-white"}`}
              >
                Saída
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="tx-data" className="block text-sm font-medium text-gray-400 mb-2">Data</label>
            <input
              id="tx-data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d121f] border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="tx-valor" className="block text-sm font-medium text-gray-400 mb-2">Valor (R$)</label>
            <input
              id="tx-valor"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^\d,]/g, ""))}
              className="w-full px-4 py-2 rounded-lg bg-[#0d121f] border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="tx-categoria" className="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
            <select
              id="tx-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d121f] border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tx-descricao" className="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
            <input
              id="tx-descricao"
              type="text"
              placeholder="Ex: Consultoria Cloud"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d121f] border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label htmlFor="tx-status" className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              id="tx-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "pago" | "pendente")}
              className="w-full px-4 py-2 rounded-lg bg-[#0d121f] border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
