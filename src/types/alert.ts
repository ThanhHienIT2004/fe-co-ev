// src/types/alert.ts
export enum AlertType {
  LATE_CHECKIN = 'LATE_CHECKIN',
  LATE_CHECKOUT = 'LATE_CHECKOUT',
}

export type AlertStatus = 'unread' | 'read';

export interface AlertLog {
  alert_id: string;
  user_id: string;
  alert_type: AlertType;
  message: string;
  status: AlertStatus;
  created_at: string; // ISO string
}