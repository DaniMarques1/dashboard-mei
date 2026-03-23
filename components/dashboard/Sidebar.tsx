"use client";

import { LayoutDashboard, ReceiptText, WalletCards, PieChart, Settings, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSidebar } from "@/contexts/SidebarContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ReceiptText, label: "Faturamento", href: "/faturamento" },
  { icon: WalletCards, label: "Gastos", href: "/gastos" },
  { icon: PieChart, label: "Taxas", href: "/taxas" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, close } = useSidebar();

  const handleNav = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-[#0d121f] border-r border-gray-800 flex flex-col p-6 text-gray-400 z-50 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="text-white font-semibold text-lg">Gestor MEI</span>
          </div>
          <button
            onClick={close}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left",
                pathname === item.href
                  ? "bg-blue-600/10 text-blue-500"
                  : "hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} aria-hidden />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800 space-y-6">
          <div className="bg-[#111827] rounded-xl p-4 border border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                Limite Anual
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: "72%" }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400">R$ 58.320 / R$ 81.000</span>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-white/5 hover:text-white transition-colors"
          >
            <Settings size={20} aria-hidden />
            <span className="font-medium">Configurações</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={close}
          aria-hidden
        />
      )}
    </>
  );
}
