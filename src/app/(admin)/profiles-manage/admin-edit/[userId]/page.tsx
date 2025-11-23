// components/admin-edit/AdminProfilesEdit.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Save, Camera, User, Mail, Phone, IdCard, Calendar } from "lucide-react";

const API_BASE = "http://localhost:8080/user/profiles";

export default function AdminProfilesEdit() {
  const router = useRouter();
  const { userId } = useParams(); // ← Lấy userId từ URL

  // Nếu userId chưa có (đang loading), hiển thị loading
  if (!userId) {
    return <div className="text-center py-32 text-2xl">Đang tải...</div>;
  }

  const id = Number(userId);
  if (isNaN(id)) {
    router.replace("/profiles-manage/admin-edit");
    return null;
  }

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    driverLicenseNumber: "",
    driverLicenseExpiry: "",
  });

  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/${id}`);
        const data = res.data;
        setProfile(data);
        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          driverLicenseNumber: data.driverLicenseNumber || "",
          driverLicenseExpiry: data.driverLicenseExpiry || "",
        });
        setLicensePreview(data.licenseImageUrl || "");
      } catch (err) {
        alert("Không tìm thấy hồ sơ!");
        router.replace("/profiles-manage");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicensePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!confirm("Bạn có chắc muốn lưu thay đổi?")) return;

    setSaving(true);
    const submitData = new FormData();

    if (formData.fullName !== profile?.fullName) submitData.append("fullName", formData.fullName);
    if (formData.phoneNumber !== profile?.phoneNumber) submitData.append("phoneNumber", formData.phoneNumber);
    if (formData.address !== profile?.address) submitData.append("address", formData.address);
    if (formData.driverLicenseNumber !== profile?.driverLicenseNumber) submitData.append("driverLicenseNumber", formData.driverLicenseNumber);
    if (formData.driverLicenseExpiry !== profile?.driverLicenseExpiry) submitData.append("driverLicenseExpiry", formData.driverLicenseExpiry);
    if (licenseFile) submitData.append("licenseFile", licenseFile);

    try {
      await axios.put(`${API_BASE}/admin/${id}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật thành công!");
      router.push("/admin/profiles");
    } catch (err: any) {
      console.error(err);
      alert("Lỗi: " + (err.response?.data || "Không thể cập nhật"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-32 text-2xl">Đang tải hồ sơ...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/admin/profiles")}
                className="flex items-center gap-3 hover:bg-white/20 px-6 py-3 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
                Quay lại danh sách
              </button>
              <h1 className="text-3xl font-bold">Chỉnh sửa hồ sơ • ID: {id}</h1>
              <div className="w-40" />
            </div>
          </div>

          <div className="p-10">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Avatar + Ảnh GPLX */}
              <div className="space-y-10">
                <div className="text-center">
                  <div className="size-44 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-7xl font-bold shadow-2xl border-8 border-white">
                    {formData.fullName[0]?.toUpperCase() || "U"}
                  </div>
                  <h2 className="mt-6 text-3xl font-bold text-gray-800">{formData.fullName}</h2>
                  <p className="text-teal-600 text-lg flex items-center justify-center gap-2 mt-2">
                    <Mail className="w-5 h-5" /> {profile?.email}
                  </p>
                </div>

                {/* Ảnh GPLX */}
                <div>
                  <label className="block text-lg font-bold text-teal-700 mb-4">Ảnh giấy phép lái xe</label>
                  <div className="relative border-4 border-dashed border-teal-200 rounded-2xl overflow-hidden bg-gray-50">
                    {licensePreview ? (
                      <img src={licensePreview} alt="GPLX" className="w-full h-80 object-contain" />
                    ) : (
                      <div className="h-80 flex items-center justify-center text-gray-400">
                        <IdCard className="w-20 h-20" />
                        <p className="mt-4 text-xl">Chưa có ảnh GPLX</p>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                      <div className="text-center text-white">
                        <Camera className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-lg font-bold">Thay đổi ảnh GPLX</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {licenseFile && (
                    <p className="mt-3 text-sm text-teal-600 font-medium text-center">
                      Đã chọn: {licenseFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form chỉnh sửa */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-3">Họ và tên</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-3">
                    <Phone className="inline w-5 h-5 mr-2" /> Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-3">Địa chỉ</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-3">
                    <IdCard className="inline w-5 h-5 mr-2" /> Số GPLX
                  </label>
                  <input
                    type="text"
                    value={formData.driverLicenseNumber}
                    onChange={(e) => setFormData({ ...formData, driverLicenseNumber: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-3">
                    <Calendar className="inline w-5 h-5 mr-2" /> Hạn GPLX
                  </label>
                  <input
                    type="date"
                    value={formData.driverLicenseExpiry}
                    onChange={(e) => setFormData({ ...formData, driverLicenseExpiry: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-end gap-6">
              <button
                onClick={() => router.push("/admin/profiles")}
                className="px-12 py-5 bg-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-300 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-12 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition flex items-center gap-4 disabled:opacity-70"
              >
                <Save className="w-7 h-7" />
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}