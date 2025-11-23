// src/app/admin/_component/UserTable.tsx
"use client";
import { User } from '@/libs/apis/type';
import { deleteUser } from '@/libs/apis/user';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';
import Toast from './Toast';

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
      refetch(); // CẬP NHẬT TỪ SERVER
      setToast({ message: 'Đã xóa người dùng!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Xóa thất bại!', type: 'error' });
    } finally {
      setShowConfirm(false);
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <th className="px-6 py-4 text-left font-semibold text-sm">ID</th>
                <th className="px-6 py-4 text-left font-semibold text-sm">Vai trò</th>
                <th className="px-6 py-4 text-left font-semibold text-sm">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-sm">Xác thực</th>
                <th className="px-6 py-4 text-left font-semibold text-sm">Đã xóa</th>
                <th className="px-6 py-4 text-left font-semibold text-sm">Tạo vào</th>
                <th className="px-6 py-4 text-center font-semibold text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-teal-50/50 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.userId}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role_id === 1 ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'
                    }`}>
                      {user.role_id === 1 ? 'User' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 truncate max-w-xs">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.isVerified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isDeleted ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.isDeleted ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
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
                      className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 hover:shadow-md transition-all"
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