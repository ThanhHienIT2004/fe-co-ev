import { Vehicle } from "@/types/vehicles.type";
import axios from 'axios';

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3000/vehicles', {
    next: { revalidate: 60 }, // cache 60 giây
  });

  if (!res.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return res.json();
}


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export default api;