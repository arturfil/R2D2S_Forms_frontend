export interface IQuestion {
  id: string;
  content: string;
  questionOrder: number;
  type: string;
  answers: Answer[];
}
  
export interface Answer {
    id: string;
    content: string;
  }