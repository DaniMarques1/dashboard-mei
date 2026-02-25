"use client";

import { LayoutDashboard, ReceiptText, WalletCards, PieChart, Settings, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: ReceiptText, label: 'Invoices', href: '/invoices' },
    { icon: WalletCards, label: 'Expenses', href: '/expenses' },
    { icon: PieChart, label: 'Tax Reports', href: '/tax-reports' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d121f] border-r border-gray-800 flex flex-col p-6 text-gray-400">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    E
                </div>
                <span className="text-white font-semibold text-lg">MEI Manager</span>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                            pathname === item.href
                                ? "bg-blue-600/10 text-blue-500"
                                : "hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-800 space-y-6">
                <div className="bg-[#111827] rounded-xl p-4 border border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Annual Limit Status</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-400">R$ 58.320 / R$ 81.000</span>
                    </div>
                </div>

                <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </button>
            </div>
        </aside>
    );
}
