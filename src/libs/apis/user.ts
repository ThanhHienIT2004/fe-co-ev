// src/libs/apis/user.ts

import { User } from "@/types/user";

const API_BASE = 'http://localhost:8085';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/user/users/get`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
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
    const errorText = await res.text();
    throw new Error(errorText || 'Xóa thất bại');
  }
  return res.json();
};