// src/types/e-contract.types.ts
export type SignatureStatus = 'pending' | 'signed' | 'rejected' | 'expired';

export interface EContract {
  contract_id: string;
  ownership_group_id: string;
  user_id: number;
  contract_url: string;
  signature_status: SignatureStatus;
  signed_at: string | null;
  created_at: string;
  updated_at: string;

  // Populate
  user?: {
    user_id: string;
    name: string;
    email: string;
  };
  ownership_group?: {
    group_id: string;
    group_name: string;
  };
}