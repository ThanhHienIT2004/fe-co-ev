"use client";
import React from "react";
import { User, Edit, Loader2, Save, X } from "lucide-react";

export const ProfileHeader = ({
  isEditing,
  isSaving,
  profile,
  formData,
  onEditClick,
  onCancelClick,
  onSaveClick,
  editError,
}: {
  isEditing: boolean;
  isSaving: boolean;
  profile: any;
  formData: any;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  editError: string;
}) => (
  <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
    <div className="flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center mb-4">
        <User className="w-20 h-20 text-white" />
      </div>
      <h1 className="text-3xl font-bold">{isEditing ? formData.name : profile.name}</h1>
      <p className="text-cyan-100 mt-1">{isEditing ? formData.email : profile.email}</p>

      <div className="mt-6 w-full space-y-3">
        {!isEditing ? (
          <button 
            onClick={onEditClick}
            className="w-full py-3 rounded-xl text-teal-700 bg-white font-semibold shadow-md hover:bg-gray-100 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Chỉnh sửa thông tin
          </button>
        ) : (
          <>
            <button
              onClick={onSaveClick}
              disabled={isSaving}
              className="w-full py-3 rounded-xl text-teal-700 bg-white font-semibold shadow-md hover:bg-gray-100 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              onClick={onCancelClick}
              disabled={isSaving}
              className="w-full py-2 rounded-xl text-white bg-black/10 font-medium hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Hủy
            </button>
          </>
        )}
      </div>
      {editError && <p className="text-red-300 text-sm mt-3">{editError}</p>}
    </div>
  </div>
);
