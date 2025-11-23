// lib/hooks/useDigitalSignatureOwner.ts
import useSWR, { mutate } from 'swr';
import { CreateSignatureDto, DigitalSignature } from '@/types/digital-signature.type';
import { digitalSignatureApi } from '@/libs/apis/digital-signature';

/**
 * Fetch digital signatures theo user_id
 * @param userId - ID của user đang login (lấy từ session)
 * 
 */
export function useDigitalSignatureOwner(userId?: number) {

  const swrKey = userId ? ['/api/proxy/digital-signature/user', userId] : null;

  const { data, error, isLoading } = useSWR<DigitalSignature[]>(
    swrKey,
    // Hàm fetcher nhận key, ở đây là [url, userId].
    // Ta lấy userId từ key[1]
    async (key: [string, number]) => {
        const [, id] = key;
        return digitalSignatureApi.getByUser(id);
    }
  );

  const createSignature = async (data: CreateSignatureDto) => {
    await digitalSignatureApi.create(data);
    // Mutate với swrKey để đảm bảo chỉ những dữ liệu liên quan đến user đó được fetch lại.
    // Nếu swrKey là null thì sẽ không có tác dụng.
    if (swrKey) {
        mutate(swrKey);
    }
  };

  return {
    signatures: data || [],
    isLoading,
    error,
    createSignature,
    revalidate: () => mutate(swrKey),
  };
}
