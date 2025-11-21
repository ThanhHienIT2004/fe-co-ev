// components/admin/VehicleStatusPie.tsx
import { useVehicles } from "@/libs/hooks/useVehicles";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#14b8a6", "#f59e0b"]; // Xanh = đang hoạt động, Cam = tạm ngưng

export function VehicleStatusPie() {
  const { data: vehicles = [], isLoading } = useVehicles();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 h-full flex items-center justify-center">
        <div className="text-gray-500">Đang tải dữ liệu xe...</div>
      </div>
    );
  }

  const total = vehicles.length;
  if (total === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border p-8 text-center">
        <p className="text-gray-500">Chưa có xe nào trong hệ thống</p>
      </div>
    );
  }

  const activeCount = vehicles.filter(v => v.is_active).length;
  const inactiveCount = total - activeCount;

  const data = [
    { status: "Đang hoạt động", value: activeCount, color: COLORS[0] },
    ...(inactiveCount > 0 ? [{ status: "Tạm ngưng", value: inactiveCount, color: COLORS[1] }] : [])
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Tình trạng xe hiện tại
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={130}
            paddingAngle={5}
            dataKey="value"
            label={({ status, value }) => `${status}: ${value}`}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} xe`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Tổng cộng: <span className="font-bold text-lg">{total}</span> xe
      </div>
    </div>
  );
}