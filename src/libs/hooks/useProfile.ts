"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Sửa type import
import { UserProfile } from "@/types/profile.type"; 
import { fetchProfileApi, updateProfileApi } from "../apis/profile.api";

export const useProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id as string;
  const userEmail = session?.user?.email as string; // Lấy email

  const [profile, setProfile] = useState<UserProfile | null>(null); // Sửa type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(0);

  const reloadProfile = () => setTriggerFetch(prev => prev + 1);

  useEffect(() => {
    // Thêm userEmail vào điều kiện
    if (status === "authenticated" && userId && userEmail) { 
      const loadProfile = async () => {
        try {
          setIsLoading(true);
          setError("");
          // Truyền email vào
          const data = await fetchProfileApi(userId, userEmail); 
          setProfile(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      loadProfile();
    } else if (status === "unauthenticated") {
      router.push("/"); // Nên đẩy về trang chủ
    }
    // Thêm userEmail vào dependency array
  }, [status, userId, userEmail, triggerFetch, router]); 

  const updateProfile = async (dataToUpdate: Partial<UserProfile>) => { // Sửa type
    if (!userId) throw new Error("User ID không tồn tại");
    try {
      const updated = await updateProfileApi(userId, dataToUpdate);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    profile,
    isLoading: status === "loading" || isLoading,
    error,
    updateProfile,
    reloadProfile,
  };
};