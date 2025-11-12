import { Vehicle } from "@/types/vehicles.type";
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin',
});

export default api;