// components/admin/TopGroupsBar.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const groupActivity = [
  { group: "GreenRide HN", members: 48, bookings: 312 },
  { group: "EcoDrive SG", members: 62, bookings: 428 },
  { group: "EVFamily DN", members: 35, bookings: 256 },
  { group: "ZeroCarbon", members: 29, bookings: 189 },
];

export function TopGroupsBar() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Top nhóm đồng sở hữu
      </h3>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={groupActivity} layout="horizontal">
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis type="number" />
          <YAxis dataKey="group" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="bookings" fill="#06b6d4" radius={[0, 12, 12, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}