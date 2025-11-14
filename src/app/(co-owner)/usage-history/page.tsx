"use client";

import React, { useState, useEffect } from "react";
import { useOwnerUsage } from "@/libs/hooks/useOwnerUsage";
import { UsageRecord } from "@/types/usage.type";

export default function UsageHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { usages, fetchUsages, isLoading, updateUsage, deleteUsage } = useOwnerUsage();

   // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUsage, setEditingUsage] = useState<UsageRecord | null>(null);
  
    // Form state
    const [formCheckIn, setFormCheckIn] = useState("");
    const [formCheckOut, setFormCheckOut] = useState("");
    const [formCondition, setFormCondition] = useState("");
    const [formDistance, setFormDistance] = useState<number | "">("");
  

  useEffect(() => {
    fetchUsages();
  }, []);

  const filteredHistory = usages?.filter(u => {
      const matchesSearch = u.booking_id?.toLowerCase().includes(searchTerm.toLowerCase());
      const recordDate = u.record_time ? new Date(u.record_time) : null;
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      const matchesDate = (!from || (recordDate && recordDate >= from)) &&
                          (!to || (recordDate && recordDate <= to));
      return matchesSearch && matchesDate;
    }) || [];
  
    const uniqueHistory = Array.from(
      new Map(filteredHistory.map(u => [u.usage_id, u])).values()
    );
  
    const openEditModal = (usage: UsageRecord) => {
      setEditingUsage(usage);
      setFormCheckIn(usage.check_in_time || "");
      setFormCheckOut(usage.check_out_time || "");
      setFormCondition(usage.vehicle_condition || "");
      setFormDistance(usage.distance || "");
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setEditingUsage(null);
    };
  
    const handleUpdate = async () => {
      if (!editingUsage) return;
  
      const updated = await updateUsage(editingUsage.usage_id, {
          check_in_time: formCheckIn || undefined,
          check_out_time: formCheckOut || undefined,
          vehicle_condition: formCondition || undefined,
          distance: formDistance !== "" ? Number(formDistance) : undefined,
      });
  
      // updated đã merge trong hook, chỉ cần đóng modal
      closeModal();
    };
    

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Lịch sử sử dụng xe
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tìm kiếm Booking ID
          </label>
          <input
            type="text"
            placeholder="Nhập Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>
      </div>
    {/* Table */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-center py-6 text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usage ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày bắt đầu</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày kết thúc</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Check-in</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Check-out</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tình trạng xe</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Quãng đường</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Thời điểm ghi nhận</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uniqueHistory.length > 0 ? uniqueHistory.map(u => (
                <tr key={u.usage_id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-700">{u.usage_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.booking_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {u.start_date ? new Date(u.start_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                    {u.end_date ? new Date(u.end_date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.check_in_time || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.check_out_time || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.vehicle_condition || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.distance ? `${u.distance} km` : "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.record_time ? new Date(u.record_time).toLocaleString() : "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => openEditModal(u)}>Cập nhật</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteUsage(u.usage_id)}>Xóa</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-6 text-sm">Không có dữ liệu phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
     {/* Modal */}
      {isModalOpen && editingUsage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Cập nhật Usage</h2>

            <div className="flex flex-col gap-3 mb-4">
              <label className="text-sm font-medium">Check-in</label>
              <input type="time" value={formCheckIn} onChange={e => setFormCheckIn(e.target.value)} />

              <label className="text-sm font-medium">Check-out</label>
              <input type="time" value={formCheckOut} onChange={e => setFormCheckOut(e.target.value)} />

              <label className="text-sm font-medium">Tình trạng xe</label>
              <input type="text" value={formCondition} onChange={e => setFormCondition(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />

              <label className="text-sm font-medium">Quãng đường (km)</label>
              <input type="number" value={formDistance} onChange={e => setFormDistance(Number(e.target.value))} className="border border-gray-300 rounded px-3 py-2" />
            </div>

            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={closeModal}>Hủy</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleUpdate}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
