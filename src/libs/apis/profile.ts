// src/lib/apis/profile.ts
import { Profile } from "@/types/profile";
const API_USER = process.env.NEXT_PUBLIC_API_USER!;

export const deleteProfile = async (userId: number) => {
  const res = await fetch(`${API_USER}/profiles/${userId}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Xóa profile thất bại");
  }
};
