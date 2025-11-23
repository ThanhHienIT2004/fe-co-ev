// src/libs/apis/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/payment',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId') || '1';
  const groupId = '1';

  config.headers['userId'] = userId;

  if (!config.params) config.params = {};
  config.params.groupId = groupId;

  console.log('[API] CALL:', config.method?.toUpperCase(), config.url, { groupId, userId });
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || 'Lỗi mạng';
    console.error('[API ERROR]', err.response?.data || err);
    alert('Lỗi: ' + msg);
    return Promise.reject(err);
  }
);

export default api;