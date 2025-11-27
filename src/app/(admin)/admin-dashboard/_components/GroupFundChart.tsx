'use client';

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FundData {
  group: string;
  fund: number;
}

interface GroupDTO {
  groupId: number;
}

export function GroupFundChart() {
  const [data, setData] = useState<FundData[]>([]);
  const [totalFund, setTotalFund] = useState<string>("...");
  const [loading, setLoading] = useState(true);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [groups, setGroups] = useState<GroupDTO[]>([]);

  // Lấy danh sách groupId
  const fetchGroups = async () => {
    try {
      const res = await fetch("http://localhost:8082/payment/ownership/getAll");
      const list: GroupDTO[] = res.ok ? await res.json() : [];
      setGroups(list);
      if (list.length > 0) setGroupId(list[0].groupId); // mặc định chọn group đầu tiên
    } catch (err) {
      console.error(err);
    }
  };

  // Lấy fund theo groupId
  const fetchFund = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8082/payment/funds/getMoneyGroup/${id}`);
      const list: { fundName: string; totalBalance: number }[] = res.ok ? await res.json() : [];

      const formatted = list.map((item) => ({
        group: item.fundName,
        fund: Number(item.totalBalance),
      }));

      setData(formatted);

      const total = formatted.reduce((sum, i) => sum + i.fund, 0);
      setTotalFund(new Intl.NumberFormat("vi-VN").format(total) + " VND");
    } catch (err) {
      console.error(err);
      setTotalFund("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  };

  // Khi load lần đầu
  useEffect(() => {
    fetchGroups();
  }, []);

  // Khi groupId thay đổi
  useEffect(() => {
    if (groupId !== null) fetchFund(groupId);
  }, [groupId]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      
      {/* Select group ID */}
      <div className="mb-6">
        <label className="text-gray-700 dark:text-gray-300 font-semibold mr-2">
          Chọn Group:
        </label>
        <select
          value={groupId ?? ""}
          onChange={(e) => setGroupId(Number(e.target.value))}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
        >
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>
              Group {g.groupId}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
        Tổng GroupFund theo nhóm
      </h3>

      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng quỹ</p>
        <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
          {loading ? "..." : totalFund}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
          <XAxis dataKey="group" tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "12px",
              color: "white"
            }}
            formatter={(value: number) => [`${value.toLocaleString()} VND`, "Tổng quỹ"]}
          />
          <Bar dataKey="fund" fill="#3b82f6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
