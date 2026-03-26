"use client";

import { Bell, User, Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Visão Geral",
  subtitle = "Bem-vindo, suas finanças estão em ordem.",
}: HeaderProps) {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center justify-between py-4 sm:py-6 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggle}
          className="md:hidden flex-shrink-0 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-white truncate">{title}</h1>
          <p className="text-gray-400 text-sm mt-1 truncate">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
        <button className="relative text-gray-400 hover:text-white transition-colors" aria-label="Notificações">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f18]" />
        </button>

        <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Lucas Silva</p>
            <p className="text-xs text-gray-400">MEI</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-800 flex items-center justify-center">
            <User size={22} className="text-gray-300" />
          </div>
        </div>
      </div>
    </header>
    );
}
