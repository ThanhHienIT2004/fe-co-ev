// app/admin/dashboard/_components/VehicleStatsCards.tsx
import { useVehicles } from "@/libs/hooks/useVehicles";
import { StatsCard } from "./StatsCard";

export function VehicleStatsCards() {
  const { data: vehicles = [], isLoading, error } = useVehicles();

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.is_active).length;
  const inactiveVehicles = totalVehicles - activeVehicles;

  // Tạm thời giữ số đặt xe hôm nay (sẽ thay bằng hook thật sau)
  const todayBookings = 189;
  const todayChange = "+42% so với hôm qua";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array(4).fill(null).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl h-48 animate-pulse shadow-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-3xl mb-12">
        Không thể tải dữ liệu xe. Vui lòng thử lại.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatsCard
        label="Tổng số xe trong hệ thống"
        value={totalVehicles.toString()}
        change={`${activeVehicles} xe đang hoạt động`}
        color="from-teal-500 to-teal-600"
      />

      <StatsCard
        label="Xe đang hoạt động"
        value={activeVehicles.toString()}
        change={totalVehicles > 0 ? `${Math.round((activeVehicles / totalVehicles) * 100)}% khả dụng` : "0%"}
        color="from-cyan-500 to-cyan-600"
      />

      <StatsCard
        label="Xe tạm ngưng hoạt động"
        value={inactiveVehicles.toString()}
        change="Chờ bảo trì hoặc kích hoạt"
        color="from-orange-500 to-amber-600"
      />

      <StatsCard
        label="Lượt đặt xe hôm nay"
        value={todayBookings.toString()}
        change={todayChange}
        color="from-sky-500 to-sky-600"
      />
    </div>
  );
}