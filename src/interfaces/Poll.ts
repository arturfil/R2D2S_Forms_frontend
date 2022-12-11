import { ChartData } from "chart.js";

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
  poll?: number;
  pollReplies: PollReply[];
}

export interface PollReply {
  questionId: number;
  answerId: number
}

export interface QueryParameters {
  page: number;
  limit: number;
}

export interface PollResults {
  results: Result[];
  content: string;
  id: number;
}

export interface Result {
  question: string;
  details: Detail[]
}

export interface Detail {
  answer: string;
  result: number;
}

export interface PollChatData {
  data: ChartData;
  title: string;
  questionId: number;
}