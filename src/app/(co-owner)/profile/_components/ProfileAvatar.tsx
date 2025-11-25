import { User } from "lucide-react";

interface Props {
  fullName: string | null;
  createdAt: string;
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Chưa cập nhật";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Chưa cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
};

export const ProfileAvatar = ({ fullName, createdAt }: Props) => (
  <div className="bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-3 text-center text-white relative">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-teal-400 via-cyan-400 to-teal-400"></div>

    <div className="inline-flex items-center justify-center size-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-xl">
      <User className="w-9 h-9 text-white" />
    </div>

    <h2 className="text-2xl md:text-3xl font-bold mt-4">
      {fullName || "Chưa đặt tên"}
    </h2>

    <p className="text-base text-teal-100 mt-1">
      Thành viên từ {formatDate(createdAt)}
    </p>
  </div>
);
