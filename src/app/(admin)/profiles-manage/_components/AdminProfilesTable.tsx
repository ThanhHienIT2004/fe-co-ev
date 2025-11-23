// components/admin-profiles/AdminProfilesTable.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, IdCard, Calendar, Clock, Eye, Edit3 } from "lucide-react";
import { formatDate } from "./ProfileDetailModal";

export default function AdminProfilesTable({
  profiles,
  onSelect,          // Xem chi tiết
  onEdit,            // Thêm callback mới để mở form chỉnh sửa
}: {
  profiles: any[];
  onSelect: (p: any) => void;
  onEdit: (p: any) => void;   // <-- Thêm prop này
}) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <th className="px-8 py-5 text-left font-bold">Thành viên</th>
              <th className="px-8 py-5 text-left font-bold">Liên hệ</th>
              <th className="px-8 py-5 text-left font-bold">GPLX</th>
              <th className="px-8 py-5 text-left font-bold">Tham gia</th>
              <th className="px-8 py-5 text-center font-bold">Hành động</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {profiles.map((profile) => (
                <motion.tr
                  key={profile.userId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-teal-50 hover:bg-teal-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {profile.fullName?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{profile.fullName}</p>
                        <p className="text-sm text-teal-600">ID: {profile.userId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-teal-500" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-teal-500" />
                        <span className="text-sm">{profile.phoneNumber || "Chưa có"}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <IdCard className="w-4 h-4 text-teal-500" />
                        <span className="font-medium">
                          {profile.driverLicenseNumber || <i className="text-gray-400">Chưa cập nhật</i>}
                        </span>
                      </div>

                      {profile.driverLicenseExpiry && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          Hạn: {formatDate(profile.driverLicenseExpiry)}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-8 py-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-500" />
                      {formatDate(profile.createdAt)}
                    </div>
                  </td>

                  {/* Cột Hành động – thêm nút Sửa */}
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {/* Nút Xem chi tiết */}
                      <button
                        onClick={() => onSelect(profile)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>

                      {/* Nút Sửa (mới) */}
                      <button
                        onClick={() => onEdit(profile)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        title="Chỉnh sửa thông tin & ảnh đại diện"
                      >
                        <Edit3 className="w-4 h-4" />
                        Sửa
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}