import { Vehicle } from "@/types/vehicles.type";
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ADMIN || 'http://localhost:8085/admin',
});

export default api;