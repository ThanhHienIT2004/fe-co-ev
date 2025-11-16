// lib/hooks/useAdminBookings.ts
import useSWR, { mutate } from 'swr';
import { Booking, UpdateBookingDto } from '@/types/booking.type';
import { bookingApi } from '@/libs/apis/booking';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAdminBookings() {
  const { data, error, isLoading } = useSWR<Booking[]>('/api/proxy/bookings', fetcher);

  const updateBooking = async (id: number, data: UpdateBookingDto) => {
    await bookingApi.update(id, data);
    mutate('/api/proxy/bookings');
  };

  const deleteBooking = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa booking này?')) {
      await bookingApi.delete(id);
      mutate('/api/proxy/bookings');
    }
  };

  return {
    bookings: data || [],
    isLoading,
    error,
    updateBooking,
    deleteBooking,
  };
}