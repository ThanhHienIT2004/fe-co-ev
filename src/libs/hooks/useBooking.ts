import useSWR, { mutate } from 'swr';
import { Booking, CreateBookingDto, UpdateBookingDto } from '@/types/booking.type';
import { bookingApi } from '@/libs/apis/booking';

const API_URL = 'http://localhost:8085/booking'; // trực tiếp backend

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBookings(user_id?: number) {
  // SWR key trực tiếp tới backend + filter user_id
  const key = user_id ? `${API_URL}?user_id=${user_id}` : API_URL;
  const { data, error, isLoading } = useSWR<Booking[]>(key, fetcher);

  const createBooking = async (data: CreateBookingDto) => {
    await bookingApi.create(data);
    mutate(key); // invalidate cache đúng key
  };

  const updateBooking = async (id: number, data: UpdateBookingDto) => {
    await bookingApi.update(id, data);
    mutate(key);
  };

  const deleteBooking = async (id: number) => {
    await bookingApi.delete(id);
    mutate(key);
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
