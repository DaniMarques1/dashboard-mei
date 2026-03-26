export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-[#111827] border border-gray-800 p-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-4 w-24 bg-gray-700 rounded" />
        <div className="h-5 w-12 bg-gray-700 rounded" />
      </div>
      <div className="h-8 w-32 bg-gray-700 rounded mt-4" />
      <div className="h-3 w-full bg-gray-700 rounded mt-2" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl bg-[#111827] border border-gray-800 p-6 animate-pulse">
      <div className="h-5 w-48 bg-gray-700 rounded mb-2" />
      <div className="h-4 w-64 bg-gray-700 rounded mb-8" />
      <div className="h-64 bg-gray-700/50 rounded" />
    </div>
  );
}
