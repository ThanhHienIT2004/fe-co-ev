"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useGroupMembers, useUpdateGroupMember } from "@/libs/hooks/useGroupMembers";
import EditMemberForm from "../../../_component/EditMemberForm";

export default function EditGroupMemberPage() {
  const { memberId, groupId } = useParams();
  const router = useRouter();
  console.log("Params:", { groupId, memberId });

  // Lấy chi tiết member
  const { members, isLoading } = useGroupMembers(groupId as string);
  const member = members?.find((m) => m.member_id === memberId);

  const { updateMember } = useUpdateGroupMember();

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
      await updateMember({ memberId: member.member_id, groupId: groupId as string, data });
      toast.success("Cập nhật thành viên thành công!");
      router.push(`/groups/${groupId}/members`);
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
            href={`/groups/${groupId}/members`}
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
              {member.member_id}
            </code>
          </div>

          <EditMemberForm
            member={member}
            groupId={groupId as string}
            onClose={() => router.push(`/groups/${groupId}/members`)}
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
