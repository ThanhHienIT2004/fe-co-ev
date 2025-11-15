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
            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Role ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Verified</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Deleted</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="border-t">
              <td className="px-4 py-2 font-medium text-gray-900">{user.userId}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.role_id}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.email}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.is_verified ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.isDeleted ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}