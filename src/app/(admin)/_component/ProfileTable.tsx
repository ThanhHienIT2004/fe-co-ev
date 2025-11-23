// src/app/admin/_component/ProfileTable.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import Toast from "./Toast";
import { Profile } from "@/types/profile";

interface Props {
  profiles: Profile[];
  refetch: () => void;
}

export default function ProfileTable({ profiles, refetch }: Props) {
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleEditSuccess = () => {
    setToast({ message: "Cập nhật hồ sơ thành công!", type: "success" });
    refetch();
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] table-fixed border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold w-[5%]">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[8%]">Vai trò</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[18%]">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[12%]">Họ và tên</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[10%]">SĐT</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[10%]">Số GPLX</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[10%]">Hết hạn</th>
                <th className="px-6 py-4 text-center text-sm font-semibold w-[12%]">Ảnh GPLX</th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[10%]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {profiles.map((p) => (
                <tr key={p.userId} className="hover:bg-teal-50/50 transition-all duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.userId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.role === "Admin" ? "bg-cyan-100 text-cyan-700" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 truncate" title={p.email}>
                    {p.email}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{p.full_name || "-"}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{p.phone_number || "-"}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{p.driver_license_number || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {p.driver_license_expiry
                      ? new Date(p.driver_license_expiry).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>

                  {/* Ảnh GPLX */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {p.license_image_url ? (
                        <img
                          src={p.license_image_url}
                          alt="GPLX"
                          className="h-16 w-32 object-cover rounded-lg border border-gray-300 shadow hover:shadow-lg transition cursor-pointer"
                          onClick={() => window.open(p.license_image_url!, "_blank")}
                        />
                      ) : (
                        <div className="h-16 w-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400">
                          Chưa có ảnh
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Nút sửa */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setEditProfile(p)}
                        className="p-2.5 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 transition"
                        title="Sửa hồ sơ"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal sửa */}
      {editProfile && (
        <EditProfileModal
          profile={editProfile}
          onClose={() => setEditProfile(null)}
          onSuccess={() => {
            handleEditSuccess();
            setEditProfile(null);
          }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}