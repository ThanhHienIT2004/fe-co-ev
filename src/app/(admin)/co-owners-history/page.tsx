"use client";

import React, { useState, useEffect } from "react";
import { useAdminUsage } from "@/libs/hooks/useAdminUsage";
import { UsageRecord } from "@/types/usage.type";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminUsagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  

  const { usages, fetchUsages, isLoading, updateUsage, deleteUsage } = useAdminUsage();

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
    const matchesSearch = u.booking_id
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Quản lý Usage</h1>

      {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
                <p className="mt-3 text-sm text-gray-600">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-teal-500 to-cyan-500">
                  <tr>
                    {[
                      "Usage ID",
                      "Booking ID",
                      "Ngày bắt đầu",
                      "Ngày kết thúc",
                      "Check-in",
                      "Check-out",
                      "Tình trạng",
                      "Quãng đường",
                      "Ghi nhận",
                      "Hành động",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {uniqueHistory.length > 0 ? (
                    uniqueHistory.map((u, idx) => (
                      <motion.tr
                        key={u.usage_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-teal-50 transition"
                      >
                        <td className="px-4 py-3 text-xs font-mono text-teal-700 whitespace-nowrap">
                          {u.usage_id}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-teal-700 whitespace-nowrap">
                          {u.booking_id}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                          {u.start_date
                            ? new Date(u.start_date).toLocaleDateString("vi-VN")
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                          {u.end_date
                            ? new Date(u.end_date).toLocaleDateString("vi-VN")
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700">
                          {u.check_in_time || "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700">
                          {u.check_out_time || "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700 max-w-[120px] truncate">
                          {u.vehicle_condition || "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                          {u.distance ? `${u.distance} km` : "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                          {u.record_time
                            ? new Date(u.record_time).toLocaleString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-1.5 justify-center">
                            <button
                              onClick={() => openEditModal(u)}
                              className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105"
                            >
                              Cập nhật
                            </button>
                            <button
                              onClick={() => deleteUsage(u.usage_id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-12 text-gray-500 text-sm font-medium"
                      >
                        Không có dữ liệu phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && editingUsage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-teal-700 text-center mb-5 tracking-tight">
                Cập nhật Usage
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1.5">
                    Check-in (giờ)
                  </label>
                  <input
                    type="time"
                    value={formCheckIn}
                    onChange={(e) => setFormCheckIn(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1.5">
                    Check-out (giờ)
                  </label>
                  <input
                    type="time"
                    value={formCheckOut}
                    onChange={(e) => setFormCheckOut(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1.5">
                    Tình trạng xe
                  </label>
                  <input
                    type="text"
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="VD: Tốt, trầy xước nhẹ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1.5">
                    Quãng đường (km)
                  </label>
                  <input
                    type="number"
                    value={formDistance}
                    onChange={(e) => setFormDistance(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Lưu thay đổi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>  
    </main>
  );
}
