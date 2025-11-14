"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProfile } from "@/libs/hooks/useProfile";

import { UserProfile } from "@/types/profile.type";
import { ProfileHeader } from "../_component/ProfileHeader";
import { ProfileInfoSection } from "../_component/ProfileInfoSection";
import { ProfileSkeleton } from "../_component/ProfileSkeleton";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.name || null;
console.log(email)
  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof UserProfile]: value }));
  };

  const onEditClick = () => { if(profile){setFormData(profile); setIsEditing(true); setEditError("");} };
  const onCancelClick = () => { setIsEditing(false); setEditError(""); };
  const onSaveClick = async () => {
    setIsSaving(true);
    setEditError("");

    try {
      const dataToSave: Partial<UserProfile> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        driverLicenseNumber: formData.driverLicenseNumber,
        driverLicenseExpiry: formData.driverLicenseExpiry,
      };
      await updateProfile(dataToSave);
      setIsEditing(false);
    } catch (err: any) {
      setEditError(err.message || "Lỗi khi lưu.");
    } finally { setIsSaving(false); }
  };
      console.log('test',formData.email);

  if (isLoading) return <ProfileSkeleton />;
  if (error && !profile) return (
    <div className="bg-gray-100 flex justify-center items-center p-8" style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="text-center bg-white p-12 rounded-2xl shadow-lg">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-600 mb-2">Đã xảy ra lỗi</h2>
        <p className="text-gray-700">{error}</p>
        <Link href="/" className="mt-6 inline-block px-6 py-2 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all">
          Về trang chủ
        </Link>
      </div>
    </div>
  );

  const displayData = { ...profile, ...formData };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-6">
        {!isEditing && (
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300">
            <ArrowLeft className="w-5 h-5" /> Quay về Trang chủ
          </Link>
        )}
      </div>

      <motion.div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div className="lg:w-1/3 lg:sticky lg:top-24 h-fit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <ProfileHeader
            isEditing={isEditing}
            isSaving={isSaving}
            profile={profile!}
            formData={formData}
            onEditClick={onEditClick}
            onCancelClick={onCancelClick}
            onSaveClick={onSaveClick}
            editError={editError}
          />
        </motion.div>

        <motion.div className="lg:w-2/3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <ProfileInfoSection
            isEditing={isEditing}
            displayData={displayData}
            handleInputChange={handleInputChange}
            profile={profile!}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
