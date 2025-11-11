import { Vehicle } from "@/types/vehicles.type";
import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin',
=======
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
>>>>>>> 0eeb9bd25753c3cf3d59e5d243dd2a8c0c6269c7
});

export default api;