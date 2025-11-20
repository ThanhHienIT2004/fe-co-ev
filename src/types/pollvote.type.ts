export interface PollVote {
  voteId: number;
  pollId: number;
  userId: number;
  voteValue: 'yes' | 'no' | 'abstain';
  votedAt: string;
}

export interface VoteResult {


  
  yes: number;
  no : number;
  abstain: number;
  total: number;
}
