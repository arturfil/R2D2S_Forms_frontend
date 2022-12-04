import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPoll } from '../features/polls/pollSlice';
import { PollReply, Response } from '../interfaces/Poll';
import { useAppDispatch, useAppSelector } from '../store/store'

//:::::::::::::::::::: TEST POLL: ebb2fdc9-c65a-4712-be96-f15f079c6144 :::::::::::::::::: //
//:::::::::::::::::::: TEST POLL: 3ba4ab59-1e4b-4e4e-97dc-0ec0c84a9117 :::::::::::::::::: //

/*
    NOTES:
    - To set the state.
    - You want to check all the radio button questions that exist.
    - Set the selected radio button to the first option, in the state.
    - Everytime it changes, keep track of that
*/

export default function ReplyPollPage() {
  const dispatch = useAppDispatch();
  const { singlePoll } = useAppSelector(state => state.poll);
  const {  user } = useAppSelector(state => state.account);
  const { id } = useParams();
  const [response, setResponse] = useState<Response>({
    user: "",
    poll_id: 0,
    pollReplies: []
  });
  const [replies, setReplies] = useState<PollReply[]>([]);

  useEffect(() => {
    if (!id) return;
    dispatch(getPoll(id))
  }, [])

  useEffect(() => {
    if (!user) return;
    let objs: PollReply[] = setQuestionsIds()!;
    setResponse({
      user: user.name!,
      poll_id: parseInt(singlePoll!.id!),
      pollReplies: objs
    });
    setReplies(setQuestionsIds())
  }, [singlePoll])

  function setQuestionsIds(): PollReply[] {
    let ids:PollReply[] = [];
    for(let question of singlePoll?.questions!) {
      if (question.type !== "CHECKBOX")
      ids.push({questionId: parseInt(question.id!), answerId: 0})
    }
    return ids;
  }

  function handleCheckBoxChange(qIndex:number, qId: string, ansId: string) {
    let data:PollReply[] = [...replies];
    let opt = data.findIndex(x => x.answerId === parseInt(ansId))
    let newReplies:PollReply[] = [];
    if (opt > -1) {
      newReplies = data.filter(x => x.answerId !== parseInt(ansId))
    } else {
      data.push({questionId: parseInt(qId), answerId: parseInt(ansId)});
      newReplies = data;
    }
    setReplies(newReplies);
  }

  function handleChange(qIdx: number, ansId: string) {
    console.log(`questionID: ${qIdx}, answerID: ${ansId}`)
    let data:any[] = [...replies];
    data[qIdx].answerId = parseInt(ansId)
    setReplies(data);
  }

  return (
    <div className='form' style={{margin: "20px auto 40px auto"}}>
        <Form>
          <h2 style={{margin: "20px 0"}}>{singlePoll?.content}</h2>
          {singlePoll?.questions?.map(q => (
            <div key={q.id}>
              <p>{q.content}</p>
              <p>{JSON.stringify(q.answers)}</p>
            </div>
          ))}
          <br />
          <br /> 
          <h4>STATE</h4>
          {JSON.stringify(replies, null, 2)}
          <br />
          <br /> 
          {singlePoll?.questions?.map((q, i) => (
            <div key={q.id}>
              <h4>{q.content}</h4>
              {q.type === "SELECT" && (
                <select onChange={e => handleChange(i, e.target.value)} defaultValue="CHOOSE" style={{margin: "20px 0"}}>
                  <option disabled value="CHOOSE">Choose Option</option>
                  {q.answers?.map(ans => (                
                    <option key={ans.id} value={ans.id}>{ans.content}</option>
                  ))}
                </select>
              )}
              {q.type !== "SELECT" && q.answers?.map(ans => (
                <div key={ans.id} style={{display: "flex"}}>
                  <input
                    onChange={e => q.type === "CHECKBOX" ? handleCheckBoxChange(i, q.id!, e.target.value)  : handleChange(i, e.target.value!)}
                    value={ans.id}
                    id={q.id}
                    name={q.id} 
                    style={{marginRight: "10px" }}
                    type={q.type.toLowerCase()}
                  />
                  <p style={{width: "auto", minWidth: "300px", marginTop: "14px"}}>{ans.content}</p>
                </div>
              ))}
            </div>
          ))}
          <button className="btn">Submit</button>
        </Form>

    </div>
  )
}
