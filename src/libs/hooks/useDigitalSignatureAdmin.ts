// lib/hooks/useDigitalSignatureAdmin.ts
import useSWR from 'swr';
import { DigitalSignature } from '@/types/digital-signature.type';
import { digitalSignatureApi } from '@/libs/apis/digital-signature';

export function useDigitalSignatureAdmin() {
  const { data, error, isLoading } = useSWR<DigitalSignature[]>(
    '/api/proxy/digital-signature/get-all',
    async () => digitalSignatureApi.getAll()
  );

  return {
    signatures: data || [],
    isLoading,
    error,
  };
}
