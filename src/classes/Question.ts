import { v4 as uuid } from "uuid";
import { Answer, IQuestion } from "../interfaces/Poll"

export class Question implements IQuestion {
    id
    content
    questionOrder
    type
    answers
  
    constructor(
        id: string = uuid(), 
        content: string = "Question 1",
        questionOrder: number = 1,
        type: string = "RADIO",
        answers: Answer[] = [{ id: uuid(), content: "" }]) 
    {
      this.id = id;
      this.content = content;
      this.questionOrder = questionOrder;
      this.type = type;
      this.answers = answers;
    }
    
  }