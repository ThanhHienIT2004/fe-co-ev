// app/ownership-groups-manage/[groupId]/add-member/page.tsx
"use client";

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useGroupMembers, useCreateGroupMember } from '@/libs/hooks/useGroupMembers';
import Link from 'next/link';

export default function AddMemberPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const groupId = (params?.groupId as string) || pathname.match(/\/([^/]+)\/add-member/)?.[1] || '';

  const [userId, setUserId] = useState('');
  const [groupRole, setGroupRole] = useState('Co-owner');
  const [ownershipRatio, setOwnershipRatio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { members } = useGroupMembers(groupId);
  const { createMember } = useCreateGroupMember();

  // KIỂM TRA user_id ĐÃ TỒN TẠI CHƯA
  const isMemberExist = members.some(m => m.user_id === userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !groupId) return;
    if (isMemberExist) {
      setErrorMsg('Thành viên này đã có trong nhóm!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      await createMember({
        group_id: groupId,
        user_id: userId.trim(),
        group_role: groupRole,
        ownership_ratio: ownershipRatio ? Number(ownershipRatio) : undefined,
      });

      setSuccess(true);
      setUserId('');
      setOwnershipRatio('');
      setGroupRole('Co-owner');

      setTimeout(() => router.push('/ownership-groups-manage'), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setErrorMsg(Array.isArray(msg) ? msg.join(', ') : (msg || 'Thêm thất bại'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!groupId) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-teal-600" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link href="/ownership-groups-manage" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4">
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </Link>
          <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4">
            <UserPlus className="w-12 h-12 text-teal-600" /> Thêm thành viên mới
          </h1>
          <p className="text-gray-600 mt-2">Nhóm ID: <code className="bg-gray-200 px-3 py-1 rounded font-mono">{groupId}</code></p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                UUID Thành viên (user_id) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="ca1f4c4e-537f-40c5-acfe-ad896d10f4de"
                className="font-mono w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Lấy từ Profile → User ID</p>
              {isMemberExist && userId && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Thành viên đã tồn tại
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Vai trò</label>
              <select
                value={groupRole}
                onChange={(e) => setGroupRole(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              >
                <option value="Co-owner">Đồng sở hữu</option>
                <option value="Owner">Chủ sở hữu</option>
              </select>
            </div>

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
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            {success && (
              <div className="p-4 border bg-teal-600 rounded-xl flex items-center gap-3 text-white">
                <CheckCircle className="w-6 h-6" /> Thêm thành công! Đang chuyển hướng...
              </div>
            )}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-6 h-6" /> {errorMsg}
              </div>
            )}

            <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !userId || isMemberExist}
                  className={`
                    flex-1 flex items-center justify-center gap-3 font-bold py-5 rounded-2xl 
                    transition-all hover:scale-105 shadow-xl
                    ${isSubmitting || !userId || isMemberExist
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
              <Link href="/ownership-groups-manage" className="px-8 py-5 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition">
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}