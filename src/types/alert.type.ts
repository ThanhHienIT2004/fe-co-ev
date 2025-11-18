export enum AlertType {
  LATE_CHECKIN = "LATE_CHECKIN",
  LATE_CHECKOUT = "LATE_CHECKOUT",
}

export type AlertStatus = "unread" | "read";

export interface AlertLog {
  alert_id: number;
  user_id: number;
  alert_type: AlertType;
  message: string;
  status: AlertStatus;
  created_at: string; // ISO Date string từ backend
}
