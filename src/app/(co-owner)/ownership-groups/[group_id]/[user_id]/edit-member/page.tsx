"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useGroupMembers, useUpdateGroupMember } from "@/libs/hooks/useGroupMembers";
import EditMemberForm from "../../../_component/EditMemberForm";

export default function EditGroupMemberPage() {
  const { user_id, group_id } = useParams();
  const router = useRouter();

  const userId = Number(user_id);
  const groupId = group_id as string;

  const { members, isLoading } = useGroupMembers(groupId as string);
  const member = members?.find((m) => m.user_id === userId);
  const { updateMember } = useUpdateGroupMember();  // <-- QUAN TRỌNG
  console.log('idd', user_id)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-20 text-gray-500">
        Không tìm thấy thành viên!
      </div>
    );
  }

  const handleSubmit = async (data: { group_role?: "admin" | "member"; ownership_ratio?: number }) => {
    try {
      await updateMember({
        groupId: groupId,
        userId: member.user_id,  // number
        data,
      });

      toast.success("Cập nhật thành viên thành công!");
      router.push(`/ownership-groups/${group_id}`);
    } catch (error) {
      toast.error("Lỗi khi cập nhật thành viên!");
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href={`/ownership-groups/${group_id}`}
            className="group flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Quay lại danh sách</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Chỉnh sửa thành viên
          </h1>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-lg">ID</span>
            </div>
            <code className="text-sm font-mono text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
              {member.user_id}
            </code>
          </div>

          <EditMemberForm
            member={member}
            groupId={group_id as string}
            onClose={() => router.push(`/ownership-groups/${group_id}`)}
            onSubmit={handleSubmit}  // <-- thêm dòng này
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Cập nhật thông tin thành viên và nhấn{" "}
          <span className="font-semibold text-teal-600">Lưu thay đổi</span> để lưu
        </p>
      </div>
    </div>
  );
}
