"use client";

import { usePeriod, MESES } from "@/contexts/PeriodContext";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function PeriodFilter() {
  const { ano, mes, mode, compareWithPrevious, setAno, setMes, setMode, setCompareWithPrevious } = usePeriod();
  const [openMes, setOpenMes] = useState(false);
  const [openAno, setOpenAno] = useState(false);
  const refMes = useRef<HTMLDivElement>(null);
  const refAno = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (refMes.current && !refMes.current.contains(e.target as Node)) setOpenMes(false);
      if (refAno.current && !refAno.current.contains(e.target as Node)) setOpenAno(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const currentYear = new Date().getFullYear();
  const anos = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <div className="flex flex-wrap items-center gap-3" title="Filtre os dados por mês e ano">
      <div className="flex items-center gap-2">
        <div className="relative" ref={refMes}>
          <button
            onClick={() => setOpenMes(!openMes)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111827] border border-gray-800 text-gray-300 hover:bg-[#1a2332] transition-colors text-sm min-w-[100px] justify-between"
            aria-label="Selecionar mês"
          >
            <span>{MESES[mes - 1]}</span>
            <ChevronDown size={16} className={openMes ? "rotate-180" : ""} />
          </button>
          {openMes && (
            <div className="absolute top-full left-0 mt-1 py-1 rounded-lg bg-[#111827] border border-gray-800 shadow-xl z-50 max-h-48 overflow-y-auto">
              {MESES.map((m, i) => (
                <button
                  key={m}
                  onClick={() => {
                    setMes(i + 1);
                    setOpenMes(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${mes === i + 1 ? "text-blue-500 bg-blue-500/10" : "text-gray-300"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={refAno}>
          <button
            onClick={() => setOpenAno(!openAno)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111827] border border-gray-800 text-gray-300 hover:bg-[#1a2332] transition-colors text-sm min-w-[90px] justify-between"
            aria-label="Selecionar ano"
          >
            <span>{ano}</span>
            <ChevronDown size={16} className={openAno ? "rotate-180" : ""} />
          </button>
          {openAno && (
            <div className="absolute top-full left-0 mt-1 py-1 rounded-lg bg-[#111827] border border-gray-800 shadow-xl z-50">
              {anos.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAno(a);
                    setOpenAno(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${ano === a ? "text-blue-500 bg-blue-500/10" : "text-gray-300"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <label
        className="flex items-center gap-2 cursor-pointer"
        title="Comparar com ano anterior"
      >
        <input
          type="checkbox"
          checked={compareWithPrevious}
          onChange={(e) => setCompareWithPrevious(e.target.checked)}
          className="rounded border-gray-600 bg-[#111827] text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-400">Comparar com ano anterior</span>
      </label>

      <div className="flex rounded-lg overflow-hidden border border-gray-800">
        <button
          onClick={() => setMode("month")}
          className={`px-3 py-2 text-sm ${mode === "month" ? "bg-blue-600 text-white" : "bg-[#111827] text-gray-400 hover:text-white"}`}
        >
          Mensal
        </button>
        <button
          onClick={() => setMode("year")}
          className={`px-3 py-2 text-sm ${mode === "year" ? "bg-blue-600 text-white" : "bg-[#111827] text-gray-400 hover:text-white"}`}
        >
          Anual
        </button>
      </div>
    </div>
  );
}
