// src/lib/apis/profile.ts
import { Profile } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const updateProfile = async (userId: number, data: Partial<Profile>) => {
  const res = await fetch(`${API_URL}/admin/profiles/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cập nhật profile thất bại");
  }
  return res.json();
};

export const deleteProfile = async (userId: number) => {
  const res = await fetch(`${API_URL}/admin/profiles/${userId}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Xóa profile thất bại");
  }
};

// API cho user cá nhân (dùng trong useProfile hook)
export const fetchProfiles = async (): Promise<any[]> => {
  const res = await fetch(`http://localhost:8080/user/users/admin/profiles`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",  // BẮT BUỘC
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Không thể tải danh sách hồ sơ");
  }
  return res.json();
};

export const updateProfileApi = async (userId: string, data: any) => {
  const res = await fetch(`${API_URL}/user/users/${userId}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Cập nhật profile thất bại");
  return res.json();
};