"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/app/utils/api";
import UserTable from "../_component/UserTable";
import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (loading) return <p className="p-4 font-medium text-gray-700">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Quản lý Người dùng</h1>
      <UserTable users={users} />
    </div>
  );
}