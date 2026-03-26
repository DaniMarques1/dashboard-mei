"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewTransactionModal } from "./NewTransactionModal";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0f18]"
        aria-label="Nova transação"
      >
        <Plus size={24} />
      </button>
      <NewTransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
