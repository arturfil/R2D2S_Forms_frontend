import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Check from "../components/Check";
import { getPoll, replyPoll } from "../features/polls/pollSlice";
import { PollReply, Response } from "../interfaces/Poll";
import { useAppDispatch, useAppSelector } from "../store/store";

//:::::::::::::::::::: TEST POLL: ebb2fdc9-c65a-4712-be96-f15f079c6144 :::::::::::::::::: //
//:::::::::::::::::::: TEST POLL: 3ba4ab59-1e4b-4e4e-97dc-0ec0c84a9117 :::::::::::::::::: //

export default function ReplyPollPage() {
  const dispatch = useAppDispatch();
  const { singlePoll } = useAppSelector((state) => state.poll);
  const { id } = useParams();
  const [response, setResponse] = useState<Response>({
    user: "",
    poll: 0,
    pollReplies: [],
  });
  const [replies, setReplies] = useState<PollReply[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getPoll(id));
  }, []);

  useEffect(() => {
    setQuestionsState();
  }, [singlePoll]);

  // setQuestionsState - This function will initialize the state of the 
  // replies after we get the singlePoll
  function setQuestionsState() {
    if (!singlePoll) return;
    let objs: PollReply[] = setQuestionsIds()!;
    setResponse({
      user: "",
      poll: parseInt(singlePoll!.id!),
      pollReplies: objs,
    });
    setReplies(setQuestionsIds());
  }

  // setQuestionsIds - function that will set all the questions with their respective ids
  function setQuestionsIds(): PollReply[] {
    if (!singlePoll) return [];
    let ids: PollReply[] = [];
    for (let question of singlePoll?.questions!) {
      if (question.type !== "CHECKBOX")
        ids.push({ questionId: parseInt(question.id!), answerId: 0 });
    }
    return ids;
  }

  // handleCheckBoxChange - This checkbox change will set the state to include the
  // option of the check box selected or delete it in the case that it's not selected
  function handleCheckBoxChange(qIndex: number, qId: string, ansId: string) {
    let data: PollReply[] = [...replies];
    let opt = data.findIndex((x) => x.answerId === parseInt(ansId));
    let newReplies: PollReply[] = [];
    if (opt > -1) {
      newReplies = data.filter((x) => x.answerId !== parseInt(ansId));
    } else {
      data.push({ questionId: parseInt(qId), answerId: parseInt(ansId) });
      newReplies = data;
    }
    setReplies(newReplies);
  }

  // handleChange - If it's a radiobutton or selector, the state will be handled
  // as normal
  function handleChange(qIdx: number, ansId: string) {
    console.log(`questionID: ${qIdx}, answerID: ${ansId}`);
    let data: any[] = [...replies];
    data[qIdx].answerId = parseInt(ansId);
    setReplies(data);
  }

  // checkAnswers - Makes sure ONLY radio, select or username is filled in. NOT checkbox.
  function checkAnswers() {
    for (let rep of replies) {
      if (rep.answerId === 0 || response.user === "") {
        toast.error("Missing all required selections");
        return false;
      }
    }
    return true;
  }

  // handleSubmit - deals with the submission request and reset of state
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!checkAnswers()) return;
    let data = response;
    data.pollReplies = replies;
    dispatch(replyPoll(data));
    setCompleted(true);
    setQuestionsState();
  }

  return (
    <div className="form" style={{ margin: "20px auto 40px auto" }}>
      {completed ? (
        <Check />
      ) : (
        <Form
          className="form"
          style={{
            backgroundColor: "#f3f3f3",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ margin: "20px 0", fontWeight: "bold" }}>
            {singlePoll?.content}
          </h2>
          <h4>Username</h4>
          <input
            className="form-control"
            placeholder="username"
            type="text"
            value={response.user}
            onChange={(e) => setResponse({ ...response, user: e.target.value })}
          />
          {singlePoll?.questions?.map((q, i) => (
            <div key={q.id}>
              <h4>{q.content}</h4>
              {q.type === "SELECT" && (
                <select
                  onChange={(e) => handleChange(i, e.target.value)}
                  defaultValue="CHOOSE"
                  style={{ margin: "20px 0" }}
                >
                  <option disabled value="CHOOSE">
                    Choose Option
                  </option>
                  {q.answers?.map((ans) => (
                    <option key={ans.id} value={ans.id}>
                      {ans.content}
                    </option>
                  ))}
                </select>
              )}
              {q.type !== "SELECT" &&
                q.answers?.map((ans) => (
                  <div key={ans.id} style={{ display: "flex" }}>
                    <input
                      onChange={(e) =>
                        q.type === "CHECKBOX"
                          ? handleCheckBoxChange(i, q.id!, e.target.value)
                          : handleChange(i, e.target.value!)
                      }
                      value={ans.id}
                      id={q.id}
                      name={q.id}
                      style={{ marginRight: "10px" }}
                      type={q.type.toLowerCase()}
                    />
                    <p
                      style={{
                        width: "auto",
                        minWidth: "300px",
                        marginTop: "14px",
                      }}
                    >
                      {ans.content}
                    </p>
                  </div>
                ))}
            </div>
          ))}
          <button onClick={handleSubmit} className="btn">
            Submit
          </button>
        </Form>
      )}
    </div>
  );
}
