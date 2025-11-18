"use client";

import { useState, useEffect } from "react";
import { AlertLog } from "@/types/alert.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const useAlerts = (user_id?: number) => {
  const [data, setData] = useState<AlertLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = user_id
          ? `${API_URL}/booking/alerts/user/${user_id}`
          : `${API_URL}/booking/alerts/get-all`;

        const res = await fetch(url);

        if (!res.ok) {
          // cố gắng parse JSON lỗi nếu backend trả
          let errMsg = `Error ${res.status}`;
          try {
            const errData = await res.json();
            errMsg = errData.message || errMsg;
          } catch {}
          throw new Error(errMsg);
        }

        const alerts: AlertLog[] = await res.json();
        setData(alerts);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [user_id]);

  return { data, isLoading, error };
};
