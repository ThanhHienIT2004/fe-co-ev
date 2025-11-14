// lib/hooks/useBookings.ts
import useSWR, { mutate } from 'swr';
import { Booking, CreateBookingDto, UpdateBookingDto } from '@/types/booking.type';
import { bookingApi } from '@/libs/apis/booking';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBookings() {
  const { data, error, isLoading } = useSWR<Booking[]>('/api/proxy/bookings', fetcher);

  const createBooking = async (data: CreateBookingDto) => {
    await bookingApi.create(data);
    mutate('/api/proxy/bookings');
  };

  const updateBooking = async (id: string, data: UpdateBookingDto) => {
    await bookingApi.update(id, data);
    mutate('/api/proxy/bookings');
  };

  const deleteBooking = async (id: string) => {
    await bookingApi.delete(id);
    mutate('/api/proxy/bookings');
  };

  return {
    bookings: data || [],
    isLoading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
  };
}