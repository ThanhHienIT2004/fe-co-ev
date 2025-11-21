// components/admin/VehicleStatusPie.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const vehicleUsage = [
  { status: "Đang sử dụng", value: 68, color: "#14b8a6" },
  { status: "Đặt trước", value: 24, color: "#06b6d4" },
  { status: "Bảo trì", value: 8, color: "#f59e0b" },
];

export function VehicleStatusPie() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Tình trạng xe hiện tại
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={vehicleUsage}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={130}
            paddingAngle={5}
            dataKey="value"
          >
            {vehicleUsage.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}