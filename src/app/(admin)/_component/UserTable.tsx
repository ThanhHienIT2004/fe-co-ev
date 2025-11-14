"use client";
import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {/* Thêm 'text-gray-700' để tiêu đề đậm và tối màu */}
            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Role ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Verified</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Deleted</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-t">
              {/* Thêm 'text-gray-900' để chữ nội dung có màu tối (gần như đen) */}
              <td className="px-4 py-2 font-medium text-gray-900">{user.user_id}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.email}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.role_id}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.is_verified ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.isDeleted ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}