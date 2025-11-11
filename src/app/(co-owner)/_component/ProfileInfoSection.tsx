"use client";
import React from "react";
import { User, Mail, Phone, Home, FileText, Calendar, Image as ImageIcon } from "lucide-react";
import { EditInput } from "./EditInput";
import { InfoRow } from "./InfoRow";
import { UserProfile } from "@/types/profile.type";

export const ProfileInfoSection = ({
  isEditing,
  displayData,
  handleInputChange,
  profile,
}: {
  isEditing: boolean;
  displayData: Partial<UserProfile>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profile: UserProfile;
}) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
    <section>
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">Thông tin cá nhân</h2>
      {!isEditing ? (
        <ul className="divide-y divide-gray-100">
          <InfoRow icon={User} label="Họ và tên" value={profile.name} />
          <InfoRow icon={Mail} label="Email" value={profile.email} />
          <InfoRow icon={Phone} label="Số điện thoại" value={profile.phone} />
          <InfoRow icon={Home} label="Địa chỉ" value={profile.address} />
        </ul>
      ) : (
        <div className="space-y-2">
          <EditInput icon={User} label="Họ và tên" name="name" value={String(displayData.name || "")} onChange={handleInputChange} />
          <EditInput icon={Mail} label="Email" name="email" value={String(displayData.email || "")} onChange={handleInputChange} />
          <EditInput icon={Phone} label="Số điện thoại" name="phone" value={String(displayData.phone || "")} onChange={handleInputChange} />
          <EditInput icon={Home} label="Địa chỉ" name="address" value={String(displayData.address || "")} onChange={handleInputChange} />
        </div>
      )}
    </section>

    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">Giấy phép lái xe</h2>
      {!isEditing ? (
        <ul className="divide-y divide-gray-100">
          <InfoRow icon={FileText} label="Số GPLX" value={profile.driverLicenseNumber} />
          <InfoRow icon={Calendar} label="Ngày hết hạn" value={profile.driverLicenseExpiry} />
        </ul>
      ) : (
        <div className="space-y-2">
          <EditInput icon={FileText} label="Số GPLX" name="driverLicenseNumber" value={String(displayData.driverLicenseNumber || "")} onChange={handleInputChange} />
          <EditInput icon={Calendar} label="Ngày hết hạn (YYYY-MM-DD)" name="driverLicenseExpiry" value={String(displayData.driverLicenseExpiry || "")} onChange={handleInputChange} type="date" />
        </div>
      )}

      <section className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-gray-500" />
          Ảnh Giấy phép
        </h3>
        {profile.licenseImageUrl ? (
          <img src={profile.licenseImageUrl} alt="Giấy phép lái xe" className="rounded-lg border-2 border-gray-200 w-full max-w-md shadow-sm" />
        ) : (
          <p className="text-gray-500 italic">Chưa cập nhật hình ảnh.</p>
        )}
        {isEditing && (
          <button className="mt-4 px-4 py-2 text-sm rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all">
            Tải ảnh lên
          </button>
        )}
      </section>
    </section>
  </div>
);
