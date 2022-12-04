export interface Poll {
  id?: string;
  pollId?: string;
  content: string;
  opened: true;
  questions?: IQuestion[];
}

export interface IQuestion {
  id?: string;
  content: string;
  questionOrder: number;
  type: string;
  answers?: Answer[];
}

export interface Answer {
  id?: string;
  content: string;
}

export interface Response {
  user: string;
  poll_id?: number;
  pollReplies: PollReply[];
}

export interface PollReply {
  questionId: number;
  answerId: number
}