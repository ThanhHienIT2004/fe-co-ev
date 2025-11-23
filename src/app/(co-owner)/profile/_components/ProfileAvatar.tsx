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
  <div className="bg-linear-to-r from-teal-500 to-cyan-500 px-8 py-4 text-center text-white relative">
    <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-teal-400 via-cyan-400 to-teal-400"></div>
    
    <div className="inline-flex items-center justify-center size-24 rounded-full bg-white/20 backdrop-blur-md border-8 border-white/30 shadow-2xl">
      <User className="w-12 h-12 text-white" />
    </div>
    
    <h2 className="text-4xl md:text-5xl font-black mt-8">
      {fullName || "Chưa đặt tên"}
    </h2>
    <p className="text-xl text-teal-100 mt-3">
      Thành viên từ {formatDate(createdAt)}
    </p>
  </div>
);