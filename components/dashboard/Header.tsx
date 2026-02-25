import { Bell, Search, User } from 'lucide-react';
import Image from 'next/image';

export function Header() {
    return (
        <header className="flex items-center justify-between py-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">Billing Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Welcome back, your financials are looking healthy.</p>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">Lucas Silva</p>
                        <p className="text-xs text-gray-400">MEI</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-800 flex items-center justify-center">
                        <User size={22} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </header>
    );
}
