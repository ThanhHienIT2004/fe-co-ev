// src/libs/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { fetchUsers } from '@/libs/apis/user';
import { User } from '@/types/user';


export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (err: any) {
      console.error('useUsers error:', err);
      setError(err.message || 'Lỗi tải dữ liệu người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const refetch = async () => {
    console.log('refetch() called – reloading users...');
    await load();
  };

  return {
    users,
    loading,
    error,
    refetch,
  };
}