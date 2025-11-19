// components/admin-profiles/ProfileDetailModal.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, IdCard, Calendar, Clock } from "lucide-react";
// components/admin-profiles/helpers.ts
export const formatDate = (dateString: string | null | undefined, fallback = "Chưa có") => {
  if (!dateString) return fallback;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatDateTime = (dateString: string | null | undefined, fallback = "Chưa có") => {
  if (!dateString) return fallback;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function ProfileDetailModal({ profile, onClose }: any) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-3xl" />

            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-6">
                  <div className="size-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-6xl font-bold text-teal-600">
                      {profile.fullName?.[0]?.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-4xl font-bold text-gray-800">{profile.fullName}</h2>
                    <p className="text-teal-600 text-lg font-medium">ID: {profile.userId}</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-700 text-4xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                <div className="space-y-6">
                  <Detail icon={<Mail />} label="Email" value={profile.email} />
                  <Detail icon={<Phone />} label="Số điện thoại" value={profile.phoneNumber} />
                  <Detail icon={<MapPin />} label="Địa chỉ" value={profile.address} />
                </div>

                <div className="space-y-6">
                  <Detail icon={<IdCard />} label="GPLX" value={profile.driverLicenseNumber} />
                  <Detail icon={<Calendar />} label="Hạn GPLX" value={formatDate(profile.driverLicenseExpiry)} />
                  <Detail icon={<Clock />} label="Tham gia lúc" value={formatDateTime(profile.createdAt)} />
                </div>
              </div>

              {profile.licenseImageUrl && (
                <div className="mt-10">
                  <p className="text-lg font-medium text-gray-700 mb-4">Ảnh GPLX</p>
                  <img
                    src={profile.licenseImageUrl}
                    className="w-full rounded-2xl border-8 border-teal-100 shadow-2xl"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Detail({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-7 h-7 text-teal-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value || "Chưa có"}</p>
      </div>
    </div>
  );
}
