"use client";

import React, { useState, useMemo } from "react";
import { Search, Edit, Trash2, CheckCircle, XCircle, Clock, Calendar, User, Car, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useAdminBookings } from "@/libs/hooks/useAdminBooking";
import { Booking, BookingStatus, UpdateBookingDto } from "@/types/booking.type";
import { format } from "date-fns";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const config = {
    [BookingStatus.PENDING]: { label: "Đang xử lý", color: "bg-amber-100 text-amber-700 ring-amber-200", icon: Clock },
    [BookingStatus.APPROVED]: { label: "Đã xác nhận", color: "bg-emerald-100 text-emerald-700 ring-emerald-200", icon: CheckCircle },
    [BookingStatus.CANCELLED]: { label: "Đã hủy", color: "bg-rose-100 text-rose-700 ring-rose-200", icon: XCircle },
    [BookingStatus.COMPLETED]: { label: "Hoàn thành", color: "bg-indigo-100 text-indigo-700 ring-indigo-200", icon: CheckCircle },
    [BookingStatus.REJECTED]: { label: "Bị từ chối", color: "bg-rose-50 text-rose-700 ring-rose-100", icon: XCircle },
  }[status] || { label: "Không xác định", color: "bg-gray-100 text-gray-700 ring-gray-200", icon: Clock };

  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${config.color}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

export default function AdminBookingListPage() {
  const { bookings, isLoading, error, updateBooking, deleteBooking } = useAdminBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState<UpdateBookingDto>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredBookings = useMemo(() => {
    return (Array.isArray(bookings) ? bookings : []).filter((b) =>
      [b.booking_id, b.user_id, b.vehicle_id].some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [bookings, searchTerm]);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, currentPage]);

  const totalPages = Math.ceil(filteredBookings.length / pageSize);

  const handleUpdateStatus = async (id: string, status: BookingStatus) => {
    setLoadingId(id);
    try { await updateBooking(id, { booking_status: status }); }
    finally { setLoadingId(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa booking này?")) return;
    setLoadingId(id);
    try { await deleteBooking(id); }
    finally { setLoadingId(null); }
  };

  const handleSaveEdit = async () => {
    if (!editingBooking || Object.keys(formData).length === 0) return;

    const { start_date, end_date, check_in_time, check_out_time } = formData;
    if (start_date && end_date && check_in_time && check_out_time) {
      const start = new Date(`${start_date}T${check_in_time}`);
      const end = new Date(`${end_date}T${check_out_time}`);
      if (end <= start) return alert("Thời gian kết thúc phải sau thời gian bắt đầu.");
    }

    setLoadingId(editingBooking.booking_id);
    try {
      await updateBooking(editingBooking.booking_id, formData);
      setEditingBooking(null);
      setFormData({});
    } finally {
      setLoadingId(null);
    }
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-10 bg-white/80 backdrop-blur-sm rounded-2xl w-96 animate-pulse" />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 border-b border-slate-100 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-slate-200 rounded w-24" />
                  <div className="h-4 bg-slate-200 rounded w-32" />
                  <div className="h-4 bg-slate-200 rounded w-28" />
                  <div className="h-8 bg-slate-200 rounded-full w-32 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-red-100">
          <p className="text-red-600 font-medium">Lỗi: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Quản lý Booking</h1>
              <p className="text-sm text-slate-500 mt-1">Theo dõi và xử lý yêu cầu thuê xe</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Tìm ID, khách, xe..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-3 w-full bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <tr>
                    {["ID", "Khách", "Xe", "Trạng thái", "Ngày thuê", "Giờ", "Tạo", "Cập nhật", "Lý do hủy", "Hành động"].map((h, i) => (
                      <th key={i} className="px-5 py-4 text-left font-medium text-xs uppercase tracking-wider">
                        {i === 1 && <User size={14} className="inline mr-1" />}
                        {i === 2 && <Car size={14} className="inline mr-1" />}
                        {i === 4 && <Calendar size={14} className="inline mr-1" />}
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedBookings.map((b) => (
                    <tr key={b.booking_id} className="hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="px-5 py-4 font-mono text-xs text-slate-600">#{b.booking_id?.slice(0, 8)}</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-800">{b.user_id}</td>
                      <td className="px-5 py-4 text-sm text-slate-700">{b.vehicle_id}</td>
                      <td className="px-5 py-4 text-center"><StatusBadge status={b.booking_status} /></td>
                      <td className="px-5 py-4 text-center text-sm">
                        <span className="font-medium text-slate-800">{format(new Date(b.start_date + "Z"), "dd/MM")}</span>
                        <span className="text-slate-400 mx-2">→</span>
                        <span className="font-medium text-slate-800">{format(new Date(b.end_date + "Z"), "dd/MM")}</span>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-slate-600">{b.check_in_time} - {b.check_out_time}</td>
                      <td className="px-5 py-4 text-center text-xs text-slate-500">
                        {b.created_at ? format(new Date(b.created_at), "dd/MM HH:mm") : "-"}
                      </td>
                      <td className="px-5 py-4 text-center text-xs text-slate-500">
                        {b.updated_at ? format(new Date(b.updated_at), "dd/MM HH:mm") : "-"}
                      </td>
                      <td className="px-5 py-4 text-center text-xs text-slate-600 max-w-[120px] truncate" title={b.cancel_reason || ""}>
                        {b.cancel_reason || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center items-center gap-1.5">
                          {b.booking_status !== BookingStatus.APPROVED && (
                            <button
                              onClick={() => handleUpdateStatus(b.booking_id, BookingStatus.APPROVED)}
                              disabled={loadingId === b.booking_id}
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition disabled:opacity-50"
                              title="Xác nhận"
                            >
                              {loadingId === b.booking_id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                            </button>
                          )}
                          {b.booking_status !== BookingStatus.CANCELLED && (
                            <button
                              onClick={() => handleUpdateStatus(b.booking_id, BookingStatus.CANCELLED)}
                              disabled={loadingId === b.booking_id}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition disabled:opacity-50"
                              title="Hủy"
                            >
                              {loadingId === b.booking_id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingBooking(b);
                              setFormData({
                                start_date: b.start_date,
                                end_date: b.end_date,
                                check_in_time: b.check_in_time,
                                check_out_time: b.check_out_time,
                                cancel_reason: b.cancel_reason,
                              });
                            }}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Sửa"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(b.booking_id)}
                            disabled={loadingId === b.booking_id}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                            title="Xóa"
                          >
                            {loadingId === b.booking_id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredBookings.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <div className="bg-slate-100 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Search size={36} />
                </div>
                <p className="text-lg font-medium">Không có kết quả</p>
                <p className="text-sm">Thử tìm bằng từ khóa khác</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
                <p className="text-xs text-slate-500">
                  Hiển thị {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredBookings.length)} trong {filteredBookings.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && <span className="px-2 text-slate-400">...</span>}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-6 w-full max-w-md transform transition-all">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <Edit size={20} /> Chỉnh sửa Booking
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Từ ngày</label>
                  <input type="date" value={formData.start_date || ""} onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Đến ngày</label>
                  <input type="date" value={formData.end_date || ""} onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nhận xe</label>
                  <input type="time" value={formData.check_in_time || ""} onChange={e => setFormData({ ...formData, check_in_time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Trả xe</label>
                  <input type="time" value={formData.check_out_time || ""} onChange={e => setFormData({ ...formData, check_out_time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Lý do hủy</label>
                <input type="text" value={formData.cancel_reason || ""} onChange={e => setFormData({ ...formData, cancel_reason: e.target.value })}
                  placeholder="Nếu có..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingBooking(null); setFormData({}); }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                Hủy
              </button>
              <button onClick={handleSaveEdit} disabled={loadingId === editingBooking.booking_id}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-sm disabled:opacity-60 flex items-center gap-2">
                {loadingId === editingBooking.booking_id ? <Loader2 size={16} className="animate-spin" /> : null}
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}