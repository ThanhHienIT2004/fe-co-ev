"use client";

import React, { useState, useEffect } from "react";
import { useOwnerUsage } from "@/libs/hooks/useOwnerUsage";
import { UsageRecord } from "@/types/usage.type";
import SignModal from "./components/signModal";
import { SignatureType } from "@/types/digital-signature.type";


export default function UsageRecordPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [userId, setUserId] = useState<number | null>(null);

  const {
    usages,
    fetchUsages,
    isLoading,
    updateUsage,
    deleteUsage,
  } = useOwnerUsage();

   // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUsage, setEditingUsage] = useState<UsageRecord | null>(null);
  
    // Form state
    const [formCheckIn, setFormCheckIn] = useState("");
    const [formCheckOut, setFormCheckOut] = useState("");
    const [formCondition, setFormCondition] = useState("");
    const [formDistance, setFormDistance] = useState<number | "">("");
  
    // View details modal state
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [viewUsage, setViewUsage] = useState<UsageRecord | null>(null);
    // Sign modal state
    const [isSignOpen, setIsSignOpen] = useState(false);
    const [signUsage, setSignUsage] = useState<UsageRecord | null>(null);
    const [signInitialType, setSignInitialType] = useState<SignatureType | null>(null);
  

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedId = localStorage.getItem("userId");
        if (storedId) {
          setUserId(Number(storedId));
        }
      }
    }, []);

    useEffect(() => {
      if (userId !== null) fetchUsages(userId);
    }, [userId]);

  const filteredHistory = usages?.filter(u => {
      const matchesSearch = String(u.booking_id)?.toLowerCase().includes(searchTerm.toLowerCase());
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

    const openViewModal = (usage: UsageRecord) => {
      setViewUsage(usage);
      setIsViewOpen(true);
    };

    const openSignModal = (usage: UsageRecord, type: SignatureType | null = null) => {
      setSignUsage(usage);
      setSignInitialType(type);
      setIsSignOpen(true);
    };

    const closeSignModal = () => {
      setIsSignOpen(false);
      setSignUsage(null);
      setSignInitialType(null);
    };

    const closeViewModal = () => {
      setIsViewOpen(false);
      setViewUsage(null);
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">

        {/* Header – sang hơn tí */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">Bản ghi sử dụng xe</h1>
          <p className="text-slate-500 mt-2">Quản lý chi tiết check-in, check-out và tình trạng xe</p>
        </div>

        {/* Filters – gọn, đẹp, hiện đại */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Từ ngày</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Đến ngày</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tìm Booking ID</label>
              <input
                type="text"
                placeholder="VD: 1001"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Table – đẹp nhất từ trước đến nay mà vẫn nhẹ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-500">Đang tải dữ liệu...</p>
              </div>
            ) : uniqueHistory.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <p className="text-lg">Không tìm thấy bản ghi nào</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Usage ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Bắt đầu</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Kết thúc</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Check-in</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Check-out</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Tình trạng xe</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Km</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Ghi nhận</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {uniqueHistory.map((u) => (
                    <tr key={u.usage_id} className="hover:bg-indigo-50/50 transition">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-700">{u.usage_id}</td>
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-700">{u.booking_id}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {u.start_date ? new Date(u.start_date).toLocaleDateString("vi-VN") : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {u.end_date ? new Date(u.end_date).toLocaleDateString("vi-VN") : "-"}
                      </td>

                      {/* Check-in */}
                      <td className="px-6 py-4">
                        {u.check_in_time ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                            {u.check_in_time}
                          </span>
                        ) : (
                          <button
                            onClick={() => openSignModal(u, SignatureType.CHECKIN)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition shadow-sm"
                          >
                            Ký nhận xe
                          </button>
                        )}
                      </td>

                      {/* Check-out */}
                      <td className="px-6 py-4">
                        {u.check_out_time ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">
                            {u.check_out_time}
                          </span>
                        ) : (
                          <button
                            onClick={() => openSignModal(u, SignatureType.CHECKOUT)}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:from-cyan-600 hover:to-indigo-600 transition shadow-sm"
                          >
                            Ký trả xe
                          </button>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700 max-w-[200px] truncate" title={u.vehicle_condition || ""}>
                        {u.vehicle_condition || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {u.distance ? `${u.distance} km` : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {u.record_time ? new Date(u.record_time).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(u)}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                          >
                            Cập nhật
                          </button>
                          <button
                            onClick={() => deleteUsage(u.usage_id)}
                            className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal cập nhật – đẹp hơn, rộng rãi hơn */}
        {isModalOpen && editingUsage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Cập nhật bản ghi sử dụng</h2>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Check-in</label>
                  <input type="time" value={formCheckIn} onChange={e => setFormCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Check-out</label>
                  <input type="time" value={formCheckOut} onChange={e => setFormCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tình trạng xe</label>
                  <input type="text" value={formCondition} onChange={e => setFormCondition(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="VD: Tốt, có vết xước nhỏ ở cửa sau..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Quãng đường (km)</label>
                  <input type="number" value={formDistance} onChange={e => setFormDistance(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition">
                  Hủy
                </button>
                <button onClick={handleUpdate}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition shadow-md">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sign Modal – giữ nguyên */}
        {isSignOpen && signUsage && (
          <SignModal
            isOpen={isSignOpen}
            onClose={closeSignModal}
            usage={signUsage}
            userId={userId || undefined}
            onSuccess={() => {
              fetchUsages(userId!);
              closeSignModal();
            }}
            initialType={signInitialType}
          />
        )}
      </div>
    </main>
  );
}
