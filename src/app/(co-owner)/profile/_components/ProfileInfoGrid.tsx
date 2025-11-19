import { Mail, User, Phone, MapPin, IdCard, Calendar, Camera } from "lucide-react";

interface ProfileData {
  email: string;
  fullName: string | null;
  phoneNumber: string | null;
  address: string | null;
  driverLicenseNumber: string | null;
  driverLicenseExpiry: string | null;
  licenseImageUrl: string | null;
}

interface Props {
  profile: ProfileData;
  editing: boolean;
  formData: any;
  onChange: (field: string, value: string) => void;
}

const formatDate = (date: string | null) => {
  if (!date) return "Chưa cập nhật";
  return new Intl.DateTimeFormat("vi-VN").format(new Date(date));
};

export const ProfileInfoGrid = ({ profile, editing, formData, onChange }: Props) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
    {/* Cột trái */}
    <div className="space-y-10">
      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <Mail className="w-7 h-7 text-teal-500" />
          Email
        </label>
        <p className="mt-3 text-2xl font-bold text-gray-800 pl-11">{profile.email}</p>
      </div>

      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <User className="w-7 h-7 text-teal-500" />
          Họ và tên
        </label>
        {editing ? (
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="mt-3 w-full px-6 py-4 text-xl border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition pl-11"
            placeholder="Nhập họ tên đầy đủ"
          />
        ) : (
          <p className="mt-3 text-2xl font-bold text-gray-800 pl-11">
            {profile.fullName || "Chưa cập nhật"}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <Phone className="w-7 h-7 text-teal-500" />
          Số điện thoại
        </label>
        {editing ? (
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            className="mt-3 w-full px-6 py-4 text-xl border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition pl-11"
            placeholder="090xxxxxxx"
          />
        ) : (
          <p className="mt-3 text-2xl font-bold text-gray-800 pl-11">
            {profile.phoneNumber || "Chưa cập nhật"}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <MapPin className="w-7 h-7 text-teal-500" />
          Địa chỉ thường trú
        </label>
        {editing ? (
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="mt-3 w-full px-6 py-4 text-xl border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition pl-11"
            placeholder="Ví dụ: 123 Đường Láng, Hà Nội"
          />
        ) : (
          <p className="mt-3 text-2xl font-bold text-gray-800 pl-11">
            {profile.address || "Chưa cập nhật"}
          </p>
        )}
      </div>
    </div>

    {/* Cột phải */}
    <div className="space-y-10">
      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <IdCard className="w-7 h-7 text-teal-500" />
          Số giấy phép lái xe
        </label>
        {editing ? (
          <input
            type="text"
            value={formData.driverLicenseNumber}
            onChange={(e) => onChange("driverLicenseNumber", e.target.value)}
            className="mt-3 w-full px-6 py-4 text-xl border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition"
            placeholder="Ví dụ: 123456789012"
          />
        ) : (
          <p className="mt-3 text-2xl font-bold text-gray-800">
            {profile.driverLicenseNumber || "Chưa cập nhật"}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
          <Calendar className="w-7 h-7 text-teal-500" />
          Ngày hết hạn GPLX
        </label>
        {editing ? (
          <input
            type="date"
            value={formData.driverLicenseExpiry}
            onChange={(e) => onChange("driverLicenseExpiry", e.target.value)}
            className="mt-3 w-full px-6 py-4 text-xl border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition"
          />
        ) : (
          <p className="mt-3 text-2xl font-bold text-gray-800">
            {profile.driverLicenseExpiry ? formatDate(profile.driverLicenseExpiry) : "Chưa cập nhật"}
          </p>
        )}
      </div>

      {profile.licenseImageUrl && (
        <div className="mt-8">
          <label className="flex items-center gap-4 text-gray-700 text-lg font-semibold mb-4">
            <Camera className="w-7 h-7 text-teal-500" />
            Ảnh giấy phép lái xe
          </label>
          <div className="relative group">
            <img
              src={profile.licenseImageUrl}
              alt="GPLX"
              className="w-full rounded-3xl border-8 border-teal-100 shadow-2xl transition group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);