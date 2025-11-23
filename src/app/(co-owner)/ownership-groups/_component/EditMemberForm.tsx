"use client";

import { useState } from "react";
import { Check, User, Users } from "lucide-react";

interface EditMemberFormProps {
  member: {
    member_id: number; // phải number
    group_role: "admin" | "member";
    ownership_ratio: number;
  };
  groupId: string;
  onClose?: () => void;
  onSubmit?: (data: { group_role?: "admin" | "member"; ownership_ratio?: number }) => void;
}

export default function EditMemberForm({ member, onClose, onSubmit }: EditMemberFormProps) {
  const [role, setRole] = useState<"admin" | "member">(member.group_role);
  const [ratio, setRatio] = useState<number>(member.ownership_ratio);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (ratio < 0 || ratio > 100) {
      alert("Tỷ lệ sở hữu phải nằm trong 0 - 100%");
      return;
    }

    setLoading(true);
    try {
      await onSubmit?.({ group_role: role, ownership_ratio: ratio });
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ROLE */}
      <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-600" /> Quyền thành viên
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg border ${
              role === "admin"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } transition-colors`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setRole("member")}
            className={`px-4 py-2 rounded-lg border ${
              role === "member"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } transition-colors`}
          >
            Member
          </button>
        </div>
      </div>

      {/* OWNERSHIP RATIO */}
      <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-teal-600" /> Tỷ lệ sở hữu (%)
        </label>
        <input
          type="number"
          min={0}
          max={100}
          step={0.01}
          value={ratio}
          onChange={(e) => setRatio(parseFloat(e.target.value))}
          placeholder="Nhập tỷ lệ sở hữu"
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
        />
      </div>

      {/* BUTTON */}
      <div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}
