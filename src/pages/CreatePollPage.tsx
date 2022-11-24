import axios from "axios";
import React, { ChangeEventHandler, useState } from "react";
import { Button, Form, FormText } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Question } from "../classes/Question";
import MinusIcon from "../components/icons/MinusIcon";
import { IQuestion, Poll } from "../interfaces/Poll";
import { useAppDispatch } from "../store/store";

export default function CreatePoll() {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<IQuestion[]>([new Question()]);
  const [poll, setPoll] = useState<Poll>({
    content: "",
    opened: true,
    questions: [],
  });

  function addQuestion() {
    let newQuest = new Question();
    setQuestions([...questions, newQuest]);
  }

  function addAnswer(index: number) {
    let newObj = { id: uuid(), content: "" };
    let data:IQuestion[] = [...questions];
    data[index].answers!.push(newObj);
    setQuestions(data);
  }

  function deleteAnswer(qIndex: number, ansId: string) {
    let data = [...questions];
    console.log(data);
    let new_questions = data[qIndex].answers!.filter((a) => a.id !== ansId);
    data[qIndex].answers = new_questions;
    setQuestions(data);
  }

  const handleQuestionChange = (index: number, e: any) => {
    let data: any[] = [...questions];
    data[index][e.target.name] = e.target.value;
    setQuestions(data);
  };

  function handleAnswerChange(qIndex: number, aIndex: number, e: any) {
    console.log(`q, ${qIndex} a, ${aIndex}`);
    let data: any[] = [...questions];
    data[qIndex].answers[aIndex][e.target.name] = e.target.value;
    setQuestions(data);
  }

  async function handleSubmit() {
    for(let question of questions) {
      for(let answer of question.answers!) {
        delete answer.id;
      }
      delete question.id
    }
    poll.questions = questions;
    let token = JSON.parse(localStorage.getItem('jwtforms')!).token;
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    await axios.post("http://localhost:8080/api/polls", poll, config);
  }

  return (
    <div className="form">
      <Form
        style={{
          backgroundColor: "#f0f0f0",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>CreatePoll</h2>
        <Form.Group className="mb-1">
          <Form.Control
            value={poll.content}
            onChange={(e) => setPoll({ ...poll, content: e.target.value })}
            type="text"
            placeholder="Poll Title"
          />
          <hr />
          {questions.map((q, qIndex) => (
            <div key={q.id}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Form.Control
                  style={{ width: "auto" }}
                  name="content"
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  value={q.content}
                  placeholder="Question"
                />
                <select
                  defaultValue={"radio"}
                  name="type"
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxHeight: "35px",
                    marginTop: "20px",
                  }}
                  className="custom-select"
                >
                  <option disabled>Choose Option Type</option>
                  <option value="radio">Radio Button</option>
                  <option value="checkbox">Check Box</option>
                  <option value="select">Select</option>
                </select>
              </div>
              {q.answers && q.answers.map((ans: any, aIndex: number) => (
                <div
                  key={ans.id}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <input type={q.type} style={{ marginRight: "10px" }} />
                  <Form.Control
                    style={{ width: "auto", minWidth: "350px" }}
                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                    name={"content"}
                    key={ans.id}
                    value={ans.content}
                    type={"text"}
                    placeholder={`Response ${aIndex + 1}`}
                  />
                  <div style={{ lineHeight: "72px" }}>
                    <MinusIcon
                      deleteFunc={() => deleteAnswer(qIndex, ans.id)}
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgb(57, 194, 178), rgb(115, 97, 226))`,
                  }}
                  onClick={(e) => addAnswer(qIndex)}
                >
                  Add Answer
                </Button>
              </div>
              <hr />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={addQuestion}>Add Question</Button>
          </div>
          <hr />
          <Button onClick={handleSubmit}>Create Poll</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
