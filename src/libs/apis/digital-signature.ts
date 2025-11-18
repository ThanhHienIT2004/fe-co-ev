import { DigitalSignature } from '@/types/digital-signature.type';
import { CreateSignatureDto } from '@/types/digital-signature.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/booking/digital-signature';

export const digitalSignatureApi = {
  create: async (data: CreateSignatureDto): Promise<DigitalSignature> => {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAll: async (): Promise<DigitalSignature[]> => {
    const res = await fetch(`${API_URL}/get-all`, { cache: 'no-store' });
    return res.json();
  },

  getById: async (id: number): Promise<DigitalSignature> => {
    const res = await fetch(`${API_URL}/id/${id}`);
    return res.json();
  },

  getByUser: async (user_id: number): Promise<DigitalSignature[]> => {
    const res = await fetch(`${API_URL}/user/${user_id}`, { cache: 'no-store' });
    return res.json();
  },
};
