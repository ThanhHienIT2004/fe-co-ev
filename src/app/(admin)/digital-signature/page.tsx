"use client";

import { useState } from "react";
import { useDigitalSignatureAdmin } from "@/libs/hooks/useDigitalSignatureAdmin";
import { SignatureType } from "@/types/digital-signature.type";
import { QRCode } from "react-qrcode-logo";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalSignaturePage() {
  const { signatures, isLoading, error } = useDigitalSignatureAdmin();
  const [filterType, setFilterType] = useState<SignatureType | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedQr, setSelectedQr] = useState<string | null>(null);

  const filtered = signatures.filter((s) => {
    const matchType = filterType === "all" || s.type === filterType;
    const matchSearch =
      s.signature_id.toString().includes(search) ||
      s.user_id.toString().includes(search) ||
      s.usage_id.toString().includes(search);
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Header-like container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-teal-700 tracking-tight mb-6"
        >
          Danh sách chữ ký số
        </motion.h1>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-5 sm:p-6 mb-6 border border-gray-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                Loại ký số
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as SignatureType | "all")}
              >
                <option value="all">Tất cả</option>
                <option value={SignatureType.CHECKIN}>Check-in</option>
                <option value={SignatureType.CHECKOUT}>Check-out</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                Tìm kiếm ID
              </label>
              <input
                type="text"
                placeholder="Signature / User / Usage ID"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

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
            ) : error ? (
              <p className="text-center py-12 text-red-500 text-sm font-medium">
                Lỗi tải dữ liệu — kiểm tra API
              </p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-teal-500 to-cyan-500">
                  <tr>
                    {[
                      "ID",
                      "User",
                      "Usage",
                      "Loại",
                      "Ngày ký",
                      "Dữ liệu",
                      "QR",
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
                  {filtered.length > 0 ? (
                    filtered.map((s, idx) => (
                      <motion.tr
                        key={s.signature_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-teal-50 transition"
                      >
                        <td className="px-4 py-3 text-xs font-mono text-teal-700 whitespace-nowrap">
                          {s.signature_id}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-teal-700 whitespace-nowrap">
                          {s.user_id}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-teal-700 whitespace-nowrap">
                          {s.usage_id}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                              s.type === SignatureType.CHECKIN
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {s.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                          {new Date(s.signed_at).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 max-w-[140px] truncate font-mono">
                          {s.signature_data}
                        </td>
                        <td className="px-4 py-3 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                                {s.qr_token ? (
                                <>
                                    {selectedQr === s.qr_token && (
                                    <QRCode value={s.qr_token} size={44} />
                                    )}
                                    <button
                                    onClick={() =>
                                        setSelectedQr(prev => prev === s.qr_token ? null : s.qr_token!)
                                    }
                                    className="text-xs font-semibold text-teal-600 hover:text-cyan-600 transition"
                                    >
                                    {selectedQr === s.qr_token ? "Ẩn" : "Xem"}
                                    </button>
                                </>
                                ) : (
                                <span className="text-gray-300 text-xs">—</span>
                                )}
                            </div>
                            </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-500 text-sm font-medium">
                        Không có dữ liệu phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal - đồng bộ phong cách Header */}
      <AnimatePresence>
        {selectedQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedQr(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-teal-700 text-center mb-5 tracking-tight">
                Chi tiết QR Code
              </h2>

              <div className="flex justify-center mb-5">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <QRCode value={selectedQr} size={180} />
                </div>
              </div>

              <div className="space-y-2.5 text-sm font-mono bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                {(() => {
                  try {
                    const payload = JSON.parse(atob(selectedQr.split(".")[1] || selectedQr));
                    return (
                      <>
                        <p className="text-teal-700">
                          <strong>User ID:</strong> {payload.user_id}
                        </p>
                        <p className="text-teal-700">
                          <strong>Usage ID:</strong> {payload.usage_id}
                        </p>
                        <p className="text-teal-700">
                          <strong>Loại:</strong> {payload.type}
                        </p>
                        <p className="text-teal-700">
                          <strong>Thời gian:</strong>{" "}
                          {new Date(payload.timestamp || payload.exp * 1000).toLocaleString("vi-VN")}
                        </p>
                      </>
                    );
                  } catch {
                    return (
                      <p className="text-red-500 text-xs font-medium">
                        Token không hợp lệ
                      </p>
                    );
                  }
                })()}
              </div>

              <button
                onClick={() => setSelectedQr(null)}
                className="mt-6 w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}