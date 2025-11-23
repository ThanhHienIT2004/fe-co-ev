export enum SignatureType {
  CHECKIN = 'checkin',
  CHECKOUT = 'checkout',
}

export enum ResolutionStatus {
  UNRESOLVED = 'unresolved',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export interface DigitalSignature {
  signature_id: number;
  user_id: number;
  usage_id: number;
  type: SignatureType;
  signature_data?: string;
  qr_token?: string;
  signed_at: string; // ISO string
}

export interface CreateSignatureDto {
  user_id: number;
  usage_id: number;
  type: SignatureType;
  signature_data: string;
  qr_token?: string;
}
