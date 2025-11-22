import { AlertLog, AlertType } from "@/types/alert.type";

const API_URL =  'http://localhost:5001';

/** Lấy toàn bộ alert */
export async function getAllAlerts(): Promise<AlertLog[]> {
  const res = await fetch(`${API_URL}/booking/alerts/get-all`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch all alerts");
  return res.json();
}

/** Lấy alert theo user_id */
export async function getAlertsByUser(user_id: number): Promise<AlertLog[]> {
  const res = await fetch(`${API_URL}/booking/alerts/user/${user_id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch alerts by user");
  return res.json();
}

/** Đánh dấu alert là đã đọc */
export async function markAlertAsRead(alert_id: number): Promise<void> {
  const res = await fetch(`${API_URL}/booking/alerts/${alert_id}/read`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to mark alert as read");
}