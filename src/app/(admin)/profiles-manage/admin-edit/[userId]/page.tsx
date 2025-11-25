"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Camera, Mail, Phone, IdCard, Calendar, User } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useUpdateAdminProfile } from "@/libs/hooks/useProfile";
import axios from "axios";

const API_BASE = "http://localhost:8085/user";

export default function AdminProfilesEdit() {
  const router = useRouter();
  const { userId } = useParams();
  const id = Number(userId);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    driverLicenseNumber: "",
    driverLicenseExpiry: "",
    licenseFile: null as File | null,
  });
  const [licensePreview, setLicensePreview] = useState<string>("");

  // Hook update
  const { updateProfile, loading: saving } = useUpdateAdminProfile(() => fetchProfile());

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/profiles/${id}`);
      const data = res.data;
      setProfile(data);
      setFormData({
        fullName: data.fullName || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        driverLicenseNumber: data.driverLicenseNumber || "",
        driverLicenseExpiry: data.driverLicenseExpiry || "",
        licenseFile: null,
      });
      setLicensePreview(data.licenseImageUrl || "");
    } catch (err) {
      enqueueSnackbar("Không tìm thấy hồ sơ!", { variant: "error" });
      router.replace("/profiles-manage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isNaN(id)) fetchProfile();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, licenseFile: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLicensePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    await updateProfile(id, formData); // ✨ dùng hook update
  };

  if (loading) return <div className="text-center py-32 text-2xl">Đang tải hồ sơ...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-teal-500 to-cyan-500 text-white p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/profiles-manage")}
                className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </button>
              <h1 className="text-2xl font-bold">Chỉnh sửa hồ sơ • ID: {id}</h1>
              <div className="w-16" />
            </div>
          </div>

          <div className="p-6 lg:p-10 grid lg:grid-cols-2 gap-8">
            {/* LEFT: Avatar + GPLX */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-6xl font-bold shadow-lg border-4 border-white">
                  {formData.fullName[0]?.toUpperCase() || "U"}
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{formData.fullName}</h2>
                <p className="text-teal-600 text-sm mt-1 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> {profile?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-700 mb-2">Ảnh GPLX</label>
                <div className="relative border-2 border-dashed border-teal-200 rounded-xl overflow-hidden bg-gray-50 h-64 flex items-center justify-center">
                  {licensePreview ? (
                    <img src={licensePreview} alt="GPLX" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <IdCard className="w-12 h-12 mx-auto" />
                      <p className="mt-2 text-sm">Chưa có ảnh GPLX</p>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                    <div className="text-white text-center">
                      <Camera className="w-10 h-10 mx-auto mb-1" />
                      <p className="text-sm font-bold">Chọn ảnh</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="space-y-4">
              {[
                { label: "Họ và tên", field: "fullName", icon: <User className="w-4 h-4 inline mr-1" />, type: "text" },
                { label: "Số điện thoại", field: "phoneNumber", icon: <Phone className="w-4 h-4 inline mr-1" />, type: "tel" },
                { label: "Địa chỉ", field: "address", type: "text" },
                { label: "Số GPLX", field: "driverLicenseNumber", icon: <IdCard className="w-4 h-4 inline mr-1" />, type: "text" },
                { label: "Hạn GPLX", field: "driverLicenseExpiry", icon: <Calendar className="w-4 h-4 inline mr-1" />, type: "date" },
              ].map((f) => (
                <div key={f.field}>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    {f.icon} {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={(formData as any)[f.field]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [f.field]: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="p-6 flex justify-end gap-4">
            <button
              onClick={() => router.push("/admin/profiles")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm hover:shadow-md transition flex items-center gap-2 disabled:opacity-70"
            >
              <Save className="w-4 h-4" /> {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
