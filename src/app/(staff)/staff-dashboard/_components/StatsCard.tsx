// components/admin/StatsCard.tsx
type StatsCardProps = {
  label: string;
  value: string;
  change: string;
  color: string;
};

export function StatsCard({ label, value, change, color }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-10`} />
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-4xl font-black mt-3 bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-sm font-semibold mt-4 text-teal-600 dark:text-cyan-400">{change}</p>
    </div>
  );
}