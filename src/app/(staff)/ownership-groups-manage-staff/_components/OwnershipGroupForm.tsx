"use client";

import { useState } from "react";
import { OwnershipGroupResponseDto } from "@/types/ownership-group";

type OwnershipGroupFormProps = {
  defaultValues?: Partial<OwnershipGroupResponseDto>;
  onSubmit: (data: {
    group_name: string;
  }) => void;
  submitText?: string;
};

export default function OwnershipGroupForm({
  defaultValues,
  onSubmit,
  submitText = "Lưu nhóm",
}: OwnershipGroupFormProps) {
  const [groupName, setGroupName] = useState(defaultValues?.group_name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      alert("Vui lòng điền tên nhóm!");
      return;
    }
    onSubmit({ group_name: groupName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-2">Tên nhóm</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nhập tên nhóm"
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition"
      >
        {submitText}
      </button>
    </form>
  );
}
