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
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {/* LEFT */}
    <div className="space-y-6">
      <Field
        icon={<Mail className="w-5 h-5 text-teal-500" />}
        label="Email"
        content={profile.email}
      />

      <EditableField
        icon={<User className="w-5 h-5 text-teal-500" />}
        label="Họ và tên"
        editing={editing}
        value={formData.fullName}
        placeholder="Nhập họ tên"
        display={profile.fullName}
        onChange={(v: string) => onChange("fullName", v)}
      />

      <EditableField
        icon={<Phone className="w-5 h-5 text-teal-500" />}
        label="Số điện thoại"
        editing={editing}
        value={formData.phoneNumber}
        placeholder="090xxxxxxx"
        display={profile.phoneNumber}
        onChange={(v: string) => onChange("phoneNumber", v)}
      />

      <EditableField
        icon={<MapPin className="w-5 h-5 text-teal-500" />}
        label="Địa chỉ thường trú"
        editing={editing}
        value={formData.address}
        placeholder="Ví dụ: 123 Đường A, Hà Nội"
        display={profile.address}
        onChange={(v: string) => onChange("address", v)}
      />
    </div>

    {/* RIGHT */}
    <div className="space-y-6">
      <EditableField
        icon={<IdCard className="w-5 h-5 text-teal-500" />}
        label="Số GPLX"
        editing={editing}
        value={formData.driverLicenseNumber}
        placeholder="123456789"
        display={profile.driverLicenseNumber}
        onChange={(v: string) => onChange("driverLicenseNumber", v)}
      />

      <EditableField
        icon={<Calendar className="w-5 h-5 text-teal-500" />}
        label="Ngày hết hạn GPLX"
        editing={editing}
        inputType="date"
        value={formData.driverLicenseExpiry}
        display={
          profile.driverLicenseExpiry
            ? formatDate(profile.driverLicenseExpiry)
            : "Chưa cập nhật"
        }
        onChange={(v: string) => onChange("driverLicenseExpiry", v)}
      />

      {profile.licenseImageUrl && (
        <div className="space-y-2">
          <Label icon={<Camera className="w-5 h-5 text-teal-500" />} text="Ảnh GPLX" />
          <img
            src={profile.licenseImageUrl}
            alt="GPLX"
            className="w-48 rounded-xl border-4 border-teal-100 shadow-md"
          />
        </div>
      )}
    </div>
  </div>
);

/** Small reusable text label */
const Label = ({ icon, text }: any) => (
  <label className="flex items-center gap-2 text-gray-700 font-semibold text-base">
    {icon}
    {text}
  </label>
);

/** Field (display only) */
const Field = ({ icon, label, content }: any) => (
  <div>
    <Label icon={icon} text={label} />
    <p className="mt-1 text-lg font-semibold text-gray-800 pl-7">
      {content || "Chưa cập nhật"}
    </p>
  </div>
);

/** Editable input field */
const EditableField = ({
  icon,
  label,
  editing,
  value,
  placeholder,
  display,
  onChange,
  inputType = "text",
}: any) => (
  <div>
    <Label icon={icon} text={label} />
    {editing ? (
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-4 py-2.5 text-base border border-teal-300 rounded-xl 
                   focus:ring-2 focus:ring-teal-400 outline-none transition pl-7"
        placeholder={placeholder}
      />
    ) : (
      <p className="mt-1 text-lg font-semibold text-gray-800 pl-7">
        {display || "Chưa cập nhật"}
      </p>
    )}
  </div>
);
