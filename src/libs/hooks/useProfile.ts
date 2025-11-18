// src/libs/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { fetchProfiles } from '@/libs/apis/profile';

export function useProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await fetchProfiles();
    setProfiles(data);
  } catch (err: any) {
    console.error("useProfiles error:", err);
    setError(err.message || "Không thể tải danh sách hồ sơ");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { load(); }, []);

  return { profiles, loading, error, refetch: load };
}