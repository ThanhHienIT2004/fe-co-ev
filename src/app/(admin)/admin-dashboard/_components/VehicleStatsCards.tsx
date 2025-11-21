// components/admin/VehicleStatsCards.tsx
import { useVehicles } from "@/libs/hooks/useVehicles";
import { StatsCard } from "./StatsCard";

export function VehicleStatsCards() {
  const { data: vehicles = [], isLoading, error } = useVehicles();

  // Dữ liệu từ API thực tế
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.is_active).length;
  const inactiveVehicles = totalVehicles - activeVehicles;

  // Giả lập lượt đặt xe hôm nay (sau này bạn sẽ có API riêng)
  // Hoặc có thể tạo hook useTodayBookings()
  const todayBookings = 189;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-white/70 dark:bg-gray-800 h-48" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center font-medium">Không tải được dữ liệu xe</div>;
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
        change={totalVehicles > 0 ? `${((activeVehicles / totalVehicles) * 100).toFixed(0)}% khả dụng` : "0%"}
        color="from-cyan-500 to-cyan-600"
      />

      <StatsCard
        label="Xe tạm ngưng"
        value={inactiveVehicles.toString()}
        change="Đang bảo trì hoặc chờ duyệt"
        color="from-orange-500 to-amber-600"
      />

      <StatsCard
        label="Lượt đặt xe hôm nay"
        value={todayBookings.toString()}
        change="+42% so với hôm qua"
        color="from-sky-500 to-sky-600"
      />
    </div>
  );
}