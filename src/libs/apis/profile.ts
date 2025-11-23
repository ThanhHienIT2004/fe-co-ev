// src/lib/apis/profile.ts
import { Profile } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const deleteProfile = async (userId: number) => {
  const res = await fetch(`${API_URL}/profiles/${userId}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Xóa profile thất bại");
  }
};
