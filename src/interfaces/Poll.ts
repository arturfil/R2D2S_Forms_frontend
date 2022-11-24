export interface Poll {
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