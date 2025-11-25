// src/hooks/useAdminProfiles.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminProfileResponse, Profile, UpdateProfileData } from "@/types/profile";
import { enqueueSnackbar } from "notistack";

export const useAdminProfiles = () => {
  const [profiles, setProfiles] = useState<AdminProfileResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<AdminProfileResponse[]>(`${process.env.NEXT_PUBLIC_API_USER}/profiles/admin`);
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
export const useUpdateAdminProfile = (refetch?: () => void) => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (userId: number, data: UpdateProfileData) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (data.fullName) formData.append("fullName", data.fullName);
      if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
      if (data.address) formData.append("address", data.address);
      if (data.driverLicenseNumber) formData.append("driverLicenseNumber", data.driverLicenseNumber);
      if (data.driverLicenseExpiry) formData.append("driverLicenseExpiry", data.driverLicenseExpiry);

      if (data.licenseFile instanceof File) {
        formData.append("licenseFile", data.licenseFile);
      }

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_USER}/profiles/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      enqueueSnackbar("Cập nhật hồ sơ thành công!", { variant: "success" });

      if (refetch) refetch();

      return res.data;
    } catch (error: any) {
      enqueueSnackbar(error.response?.data || "Cập nhật thất bại!", {
        variant: "error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
  };
};