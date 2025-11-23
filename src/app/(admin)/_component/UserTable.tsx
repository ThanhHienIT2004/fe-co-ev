// src/app/admin/_component/UserTable.tsx
"use client";

import { deleteUser } from '@/libs/apis/user';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteUserModal';
import Toast from './Toast';
import { Trash2 } from 'lucide-react';
import { User } from '@/types/user';

interface Props {
  users: User[];
  refetch: () => void;
}

export default function UserTable({ users, refetch }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    try {
      await deleteUser(deletingId);
      refetch();
      setToast({ message: 'Đã xóa người dùng thành công!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Xóa thất bại!', type: 'error' });
    } finally {
      setShowConfirm(false);
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <th className="px-6 py-4 text-left font-semibold text-sm w-[6%]">ID</th>
                <th className="px-6 py-4 text-left font-semibold text-sm w-[10%]">Vai trò</th>
                <th className="px-6 py-4 text-left font-semibold text-sm w-[28%]">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-sm w-[10%]">Xác thực</th>
                <th className="px-6 py-4 text-left font-semibold text-sm w-[10%]">Đã xóa</th>
                <th className="px-6 py-4 text-left font-semibold text-sm w-[20%]">Tạo vào</th>
                <th className="px-6 py-4 text-center font-semibold text-sm w-[10%]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-teal-50/50 transition-all duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900 truncate">{user.userId}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      user.role_id === 1 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-cyan-100 text-cyan-700'
                    }`}>
                      {user.role_id === 1 ? 'User' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 truncate" title={user.email}>
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isVerified 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.isVerified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.deleted 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.deleted ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteClick(user.userId)}
                      disabled={user.deleted}
                      className="p-2.5 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-rose-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}