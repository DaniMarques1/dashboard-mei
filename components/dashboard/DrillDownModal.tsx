"use client";

import { X } from "lucide-react";
import type { Transacao } from "@/lib/types";

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  transactions: Transacao[];
}

export function DrillDownModal({ isOpen, onClose, title, transactions }: DrillDownModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="drilldown-title">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-xl shadow-xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 id="drilldown-title" className="text-xl font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nenhuma transação encontrada.</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between py-3 px-4 rounded-lg bg-[#0d121f] border border-gray-800"
                >
                  <div>
                    <p className="text-white font-medium">{t.descricao}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(t.data).toLocaleDateString("pt-BR")}
                      {t.contraparte && ` • ${t.contraparte}`}
                    </p>
                  </div>
                  <span className={t.tipo === "entrada" ? "text-emerald-500 font-semibold" : "text-rose-500 font-semibold"}>
                    {t.tipo === "entrada" ? "+" : "-"} R$ {t.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
