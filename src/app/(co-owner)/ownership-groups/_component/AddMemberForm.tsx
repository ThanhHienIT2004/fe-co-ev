"use client";

import { useState, useRef } from 'react';
import { Loader2, CheckCircle, AlertCircle, UserPlus, Upload, X, FileText } from 'lucide-react';
import { useGroupMembers, useCreateGroupMember } from '@/libs/hooks/useGroupMembers';
import { useCreateEContract } from '@/libs/hooks/useCreateEContract';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AddMemberFormProps {
  groupId: number;
  onSuccess?: () => void;
}

export default function AddMemberForm({ groupId, onSuccess }: AddMemberFormProps) {
  const [userId, setUserId] = useState('');
  const [groupRole, setGroupRole] = useState('Co-owner');
  const [ownershipRatio, setOwnershipRatio] = useState('');
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { members } = useGroupMembers(groupId);
  const { createMember } = useCreateGroupMember();
  const { createEContract } = useCreateEContract();

  // === PARSE + VALIDATE user_id ===
  const trimmedUserId = userId.trim();
  const parsedUserId = trimmedUserId ? parseInt(trimmedUserId, 10) : 0;
  const isValidUserId = trimmedUserId && !isNaN(parsedUserId) && parsedUserId > 0;

  // Kiểm tra thành viên đã tồn tại (so sánh number)
  const isMemberExist = members.some(m => m.user_id === parsedUserId);

  // === XỬ LÝ FILE ===
  const handleFileChange = (file: File | null) => {
    if (!file) {
      setContractFile(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMsg('Vui lòng chọn file PDF');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File PDF không được vượt quá 10MB');
      return;
    }

    setContractFile(file);
    setErrorMsg('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // === SUBMIT ===
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isValidUserId) {
    setErrorMsg("ID thành viên phải là số nguyên dương");
    return;
  }

  if (isMemberExist) {
    setErrorMsg("Thành viên này đã có trong nhóm!");
    return;
  }

  setIsSubmitting(true);
  setErrorMsg("");
  setSuccess(false);

  try {
    // === 1. Thêm member vào group (JSON raw) ===
    await createMember(groupId, {
      user_id: parsedUserId,
      group_role: groupRole,
      ownership_ratio: ownershipRatio ? Number(ownershipRatio) : undefined,
    });

    // === 2. Upload file PDF (nếu có) ===
    if (contractFile) {
      const contractFormData = new FormData();
      contractFormData.append("ownership_group_id", groupId.toString());
      contractFormData.append("user_id", parsedUserId.toString());
      contractFormData.append("files", contractFile);
      contractFormData.append("signature_status", "pending");

      await createEContract(contractFormData);
    }

    setSuccess(true);
    setUserId("");
    setOwnershipRatio("");
    setGroupRole("Co-owner");
    setContractFile(null);

    onSuccess?.();
    setTimeout(() => router.push("/ownership-groups-manage"), 1500);

  } catch (err: any) {
    const msg = err.response?.data?.message || err.message || "Thêm thất bại";
    setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
  } finally {
    setIsSubmitting(false);
  }
};
  

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ID Thành viên */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ID Thành viên (user_id) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userId}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setUserId(val); // Chỉ cho số
            }}
            placeholder="123"
            className="font-mono w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Nhập ID số từ Profile → User ID</p>

          {/* Lỗi validate */}
          {userId && !isValidUserId && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> ID phải là số nguyên dương
            </p>
          )}
          {isMemberExist && isValidUserId && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Thành viên đã tồn tại
            </p>
          )}
        </div>

        {/* Vai trò */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Vai trò</label>
          <select
            value={groupRole}
            onChange={(e) => setGroupRole(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
          >
            <option value="Co-owner">Đồng sở hữu</option>
            <option value="Owner">Chủ sở hữu</option>
          </select>
        </div>

        {/* Tỷ lệ sở hữu */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tỷ lệ sở hữu (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={ownershipRatio}
            onChange={(e) => setOwnershipRatio(e.target.value)}
            placeholder="20"
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
          />
        </div>

        {/* Upload PDF */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Hợp đồng (PDF - tùy chọn)
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
              transition-all duration-200
              ${contractFile
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              className="hidden"
            />

            {contractFile ? (
              <div className="flex items-center justify-center gap-3 p-3">
                <FileText className="w-10 h-10 text-red-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-800 truncate max-w-xs">{contractFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(contractFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileChange(null);
                  }}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition ml-auto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-sm text-gray-600">
                  Kéo thả file PDF vào đây hoặc <span className="text-teal-600 font-medium">chọn file</span>
                </p>
                <p className="text-xs text-gray-500">Chỉ hỗ trợ PDF - Tối đa 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Thông báo */}
        {success && (
          <div className="p-4 border bg-teal-600 rounded-xl flex items-center gap-3 text-white animate-pulse">
            <CheckCircle className="w-6 h-6" /> Thêm thành công! Đang chuyển hướng...
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-6 h-6" /> {errorMsg}
          </div>
        )}

        {/* Nút hành động */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !isValidUserId || isMemberExist}
            className={`
              flex-1 flex items-center justify-center gap-3 font-bold py-5 rounded-2xl 
              transition-all hover:scale-105 shadow-xl
              ${isSubmitting || !isValidUserId || isMemberExist
                ? 'bg-teal-400 text-white cursor-not-allowed shadow-lg' 
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xl'
              }
            `}
          >
            {isSubmitting ? (
              <> <Loader2 className="w-6 h-6 animate-spin" /> Đang thêm...</>
            ) : (
              <> <UserPlus className="w-6 h-6" /> Thêm vào nhóm</>
            )}
          </button>
          <Link 
            href="/ownership-groups-manage" 
            className="px-8 py-5 bg-red-300 text-white font-bold rounded-2xl hover:bg-red-400 transition shadow-xl"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}