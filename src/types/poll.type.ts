export interface Poll {
  [x: string]: number;
  endAt: string | number | Date;
  options: any;
  closedAt: any;
  totalVotes: number;
  title: any;
  pollId: number;
  groupId: number;
  costId?: number | null;
  description: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string | null;
  status: 'active' | 'closed';
}

export interface CreatePollRequest {
  groupId: number;
  costId?: number | null;
  description: string;
  expiresAt?: string | null;
}
