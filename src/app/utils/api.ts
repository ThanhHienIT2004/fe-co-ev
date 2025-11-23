import { User } from '@/types/user';
import { Profile } from '@/types/profile';

const BASE_URL = 'http://localhost:8080';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/user/users/get`); 
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchProfiles(): Promise<Profile[]> {
  // Sửa URL để gọi tới endpoint mới
  const response = await fetch(`${BASE_URL}/user/users/profiles`); 
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
}
