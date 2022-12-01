import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPoll } from '../features/polls/pollSlice';
import { useAppDispatch, useAppSelector } from '../store/store'

export default function ReplyPollPage() {
  const dispatch = useAppDispatch();
  const { singlePoll } = useAppSelector(state => state.poll);
  const {  user } = useAppSelector(state => state.account);
  const { id } = useParams();
  const [response, setResponse] = useState({
    user: "",
    poll: "",
    pollReplies: []
  });

  useEffect(() => {
    if (!id) return;
    dispatch(getPoll(id))
    console.log(singlePoll)
  }, [])

  useEffect(() => {
    if (!user) return;
    setResponse({
      user: user.name!,
      poll: singlePoll?.id!,
      pollReplies: []
    })
  }, [singlePoll])

  return (
    <div className='form'>
        <Form>
          <h2 style={{margin: "20px 0"}}>{singlePoll?.content}</h2>
          {JSON.stringify(response, null, 2)}
          {singlePoll?.questions?.map(q => (
            <div key={q.id}>
              <h4>{q.content}</h4>
              {q.type === "SELECT" && (
                <select defaultValue="CHOOSE" style={{margin: "20px 0"}}>
                  <option disabled value="CHOOSE">Choose Option</option>
                  {q.answers?.map(ans => (                
                    <option key={ans.id} value={ans.id}>{ans.content}</option>
                  ))}
                </select>
              )}
              {q.type !== "SELECT" && q.answers?.map(ans => (
                <div key={ans.id} style={{display: "flex"}}>
                  <input name={q.id} style={{marginRight: "10px" }} type={q.type} />
                  <p style={{width: "auto", minWidth: "300px", marginTop: "14px"}}>{ans.content}</p>
                </div>
              ))}
            </div>
          ))}
        </Form>

    </div>
  )
}
