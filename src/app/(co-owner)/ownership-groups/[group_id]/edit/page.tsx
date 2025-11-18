"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOwnershipGroup, useUpdateOwnershipGroup } from "@/libs/hooks/useOwnershipGroups";
import { toast } from 'react-hot-toast';
import OwnershipGroupForm from "../../_component/OwnershipGroupForm";

export default function EditOwnershipGroupPage() {
  const { id } = useParams();
  const router = useRouter();

  // Lấy chi tiết nhóm
  const { group, isLoading } = useOwnershipGroup(id as string);
  // Hook cập nhật nhóm
  const { updateGroup } = useUpdateOwnershipGroup();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    try {
      await updateGroup({ groupId: id as string, data });
      toast.success("Cập nhật nhóm thành công!");
      router.push("/ownership-groups");
    } catch (error) {
      toast.error("Lỗi khi cập nhật nhóm!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/ownership-groups"
            className="group flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Quay lại danh sách</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Chỉnh sửa nhóm sở hữu
          </h1>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-lg">ID</span>
            </div>
            <code className="text-sm font-mono text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
              {group?.group_id}
            </code>
          </div>

          <OwnershipGroupForm
            defaultValues={{
              group_name: group?.group_name || "",
              vehicle_id: group?.vehicle?.vehicle_id || "",
            }}
            onSubmit={handleSubmit}
            submitText="Cập nhật nhóm"
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Cập nhật thông tin nhóm và nhấn{" "}
          <span className="font-semibold text-teal-600">Cập nhật nhóm</span> để lưu
        </p>
      </div>
    </div>
  );
}
