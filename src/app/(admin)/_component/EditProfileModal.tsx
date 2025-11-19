// src/app/admin/_component/EditProfileModal.tsx
"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

interface Profile {
  userId: number;
  full_name: string | null;
  phone_number: string | null;
  address?: string | null;
  driver_license_number: string | null;
  driver_license_expiry: string | null;
  license_image_url: string | null;
}

export default function EditProfileModal({
  profile,
  onClose,
  onSuccess,
}: {
  profile: Profile;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({ ...profile });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    profile.license_image_url
  );

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600 " +
    "text-gray-800 font-medium placeholder-gray-600";

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ev-sharing");

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dxxx/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm({ ...form, license_image_url: data.secure_url });
      setImagePreview(data.secure_url);
    } catch {
      alert("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(
        `http://localhost:8080/user/users/${profile.userId}/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      onSuccess();
    } catch {
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Wrapper */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-teal-700">Sửa hồ sơ</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 max-h-[70vh] overflow-y-auto pr-1"
        >
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              required
              className={inputClass}
              placeholder="Họ tên"
              value={form.full_name || ""}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </div>

          {/* SĐT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              className={inputClass}
              placeholder="SĐT"
              value={form.phone_number || ""}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
            />
          </div>

          {/* GPLX */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Số GPLX
            </label>
            <input
              className={inputClass}
              placeholder="Số GPLX"
              value={form.driver_license_number || ""}
              onChange={(e) =>
                setForm({ ...form, driver_license_number: e.target.value })
              }
            />
          </div>

          {/* Hết hạn */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ngày hết hạn
            </label>
            <input
              type="date"
              className={inputClass}
              value={form.driver_license_expiry || ""}
              onChange={(e) =>
                setForm({ ...form, driver_license_expiry: e.target.value })
              }
            />
          </div>

          {/* Upload ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ảnh GPLX
            </label>

            <label className="flex items-center justify-center w-full h-40 border border-dashed border-teal-600 rounded-xl cursor-pointer hover:bg-teal-50 transition">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="GPLX"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="w-9 h-9 mx-auto mb-2" />
                  <p>Click để upload ảnh GPLX</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {uploading && (
              <p className="text-sm text-teal-600 mt-1">
                <Loader2 className="inline w-4 h-4 animate-spin" /> Đang upload...
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold shadow"
            >
              Cập nhật hồ sơ
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
