// src/libs/apis/user.ts
import { User } from './type';

const API_BASE = 'http://localhost:8080';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/user/users/get`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('GET /get failed:', res.status, text);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const deleteUser = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/user/users/${id}/delete_user`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('DELETE failed:', res.status, text);
    throw new Error(text || 'Xóa thất bại');
  }
  return res.json();
};