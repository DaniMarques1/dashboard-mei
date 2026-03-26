import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = "Sem dados para este período",
  description = "Altere o filtro ou adicione transações para visualizar informações.",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 rounded-xl bg-[#111827] border border-gray-800 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
        <FileQuestion size={32} className="text-gray-500" aria-hidden />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm max-w-sm">{description}</p>
    </div>
  );
}
