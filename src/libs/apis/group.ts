import axios from 'axios';

// Tạo instance axios riêng để dễ quản lý
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085/payment',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === REQUEST INTERCEPTOR: tự động gắn token và userId ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Giả lập userId = 3 nếu chưa có
    const userId = localStorage.getItem('userId') || '3';
    if (userId && !config.params) {
      config.params = { userId: Number(userId) };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR: trả về data trực tiếp ===
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
      return Promise.reject(error.response.data || error.message);
    }
    if (error.code === 'ECONNABORTED') return Promise.reject('Kết nối timeout – Vui lòng thử lại');
    return Promise.reject('Mất kết nối mạng');
  }
);

export default api;
