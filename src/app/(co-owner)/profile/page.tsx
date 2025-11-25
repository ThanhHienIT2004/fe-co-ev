"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";

import { ProfileAvatar } from "./_components/ProfileAvatar";
import { ProfileInfoGrid } from "./_components/ProfileInfoGrid";
import { ProfileHeader } from "./_components/ProfileHeader";
import ProfileEditActions from "./_components/ProfileEditActions";
import { useUpdateAdminProfile } from "@/libs/hooks/useProfile";


interface Profile {
  userId: number;
  fullName: string | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  driverLicenseNumber: string | null;
  driverLicenseExpiry: string | null;
  licenseImageUrl: string | null;
  createdAt: string;
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    driverLicenseNumber: "",
    driverLicenseExpiry: "",
    licenseFile: null as File | null,
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // ✨ Import hook update
  const { updateProfile, loading: saving } = useUpdateAdminProfile(() => fetchProfile());

  // Tách ra để gọi lại sau update
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_USER}/profiles/${userId}`);

      setProfile({
        ...res.data,
        email: res.data.email || email || "",
      });

      setFormData({
        fullName: res.data.fullName || "",
        phoneNumber: res.data.phoneNumber || "",
        address: res.data.address || "",
        driverLicenseNumber: res.data.driverLicenseNumber || "",
        driverLicenseExpiry: res.data.driverLicenseExpiry || "",
        licenseFile: null,
      });
    } catch {
      enqueueSnackbar("Lỗi khi tải hồ sơ!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar("Vui lòng đăng nhập để xem hồ sơ", { variant: "error" });
      return;
    }
    fetchProfile();
  }, [userId]);

  // ==========================
  //    SAVE using HOOK
  // ==========================
  const handleSave = async () => {
    if (!profile) return;

    await updateProfile(Number(userId), formData);
    setEditing(false);
  };

  const handleFieldChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-8 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white">
      <ProfileHeader />

      <div className="relative -mt-16 px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-teal-100 overflow-hidden"
        >
          <ProfileAvatar fullName={profile.fullName} createdAt={profile.createdAt} />

          <div className="px-8 py-12 lg:px-16 lg:py-16">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">Thông tin chi tiết</h3>
                <p className="text-teal-600 mt-2">Cập nhật hồ sơ để sử dụng dịch vụ tốt hơn</p>
              </div>

              <ProfileEditActions
                editing={editing}
                saving={saving}
                onEdit={() => setEditing(true)}
                onSave={handleSave}
                onCancel={() => {
                  setEditing(false);
                  setFormData({
                    fullName: profile.fullName || "",
                    phoneNumber: profile.phoneNumber || "",
                    address: profile.address || "",
                    driverLicenseNumber: profile.driverLicenseNumber || "",
                    driverLicenseExpiry: profile.driverLicenseExpiry || "",
                    licenseFile: null,
                  });
                }}
              />
            </div>

            <ProfileInfoGrid
              profile={profile}
              editing={editing}
              formData={formData}
              onChange={handleFieldChange}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
