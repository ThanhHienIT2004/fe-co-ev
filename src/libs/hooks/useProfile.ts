// src/hooks/useAdminProfiles.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminProfileResponse } from "@/types/service-tasks.type";

const API_BASE = "http://localhost:8080/user/profiles";

export const useAdminProfiles = () => {
  const [profiles, setProfiles] = useState<AdminProfileResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<AdminProfileResponse[]>(`${API_BASE}/admin`);
      setProfiles(res.data);
    } catch (err: any) {
      setError(err.response?.data || "Lỗi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Lọc theo từ khóa
  const filteredProfiles = profiles.filter((p) =>
    `${p.fullName} ${p.phoneNumber} ${p.email} ${p.driverLicenseNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return {
    profiles: filteredProfiles,
    allProfiles: profiles,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchProfiles,
  };
};