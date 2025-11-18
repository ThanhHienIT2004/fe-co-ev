// lib/hooks/useDigitalSignatureOwner.ts
import useSWR, { mutate } from 'swr';
import { CreateSignatureDto, DigitalSignature } from '@/types/digital-signature.type';
import { digitalSignatureApi } from '@/libs/apis/digital-signature';

export function useDigitalSignatureOwner() {
  const { data, error, isLoading } = useSWR<DigitalSignature[]>(
    '/api/proxy/digital-signature/user',
    async (key: number) => digitalSignatureApi.getByUser(key)
  );

  const createSignature = async (data: CreateSignatureDto) => {
    await digitalSignatureApi.create(data);
    mutate('/api/proxy/digital-signature/user');
  };

  return {
    signatures: data || [],
    isLoading,
    error,
    createSignature,
  };
}
