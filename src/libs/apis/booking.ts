// lib/apis/booking.ts
import { Booking, CreateBookingDto, UpdateBookingDto } from '@/types/booking.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const bookingApi = {
  create: async (data: CreateBookingDto): Promise<Booking> => {
    const res = await fetch(`${API_URL}/booking/create-booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAll: async (): Promise<Booking[]> => {
    const res = await fetch(`${API_URL}/booking/get-all-bookings`, { cache: 'no-store' });
    return res.json();
  },

  getById: async (id: string): Promise<Booking> => {
    const res = await fetch(`${API_URL}/booking/${id}`);
    return res.json();
  },

  update: async (id: string, data: UpdateBookingDto): Promise<Booking> => {
    try {
      const res = await fetch(`${API_URL}/booking/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      return res.json();
    } catch (err) {
      console.error("Update booking failed:", err);
      throw err;
    }
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/booking/${id}`, { method: 'DELETE' });
  },
};