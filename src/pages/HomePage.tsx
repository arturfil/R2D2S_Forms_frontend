import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { getPoll, getPolls, togglePoll } from "../features/polls/pollSlice";
import { Poll } from "../interfaces/Poll";
import { useAppDispatch, useAppSelector } from "../store/store";
import poliwag_img from '../images/poliwag.png';

export default function HomePage() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { polls } = useAppSelector((state) => state.poll);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getPolls({ page: 0, limit: 6 }));
  }, []);

  return (
    <div>
      <div style={{display:"flex", justifyContent: "space-between", alignItems: "left"}}>
        <h1>Poll E-Wag</h1>
        <img src={poliwag_img} alt="poliwag" height="50" width="60"/>
      </div>
      <h5 style={{ marginTop: "20px" }}>Enter your poll Id</h5>

      <CustomModal 
        title="Delete Poll"
        message="Please confirm you want to delete the poll" 
        show={showModal} 
        onHide={() => setShowModal(false)}
      />

      <div
        style={{
          boxShadow: "0px 3px 5px 2px lightgrey",
          border: "solid lightgrey 1px",
          borderRadius: "8px",
        }}
      >
        <Table striped borderless={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>Poll Id</th>
              <th>Content</th>
              <th>Open</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {polls &&
              polls?.map((p: Poll, i: number) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>{p.pollId}</td>
                  <td>{p.content}</td>
                  <td>
                    {" "}
                    <Form.Check
                      onChange={() => dispatch(togglePoll(p.pollId!))}
                      checked={p.opened}
                      type="switch"
                    />{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (!p.opened) return;
                        navigate("/replypoll/" + p.pollId)
                      }}
                      className="btn"
                    >
                      View Poll
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "red !important",
                        backgroundImage:
                          "linear-gradient(90deg, rgb(230, 0, 0), rgb(250, 100, 52))",
                        boxShadow: "0px 3px 10px 0px rgb(250, 100, 52)"
                      }}
                      onClick={() => {
                        setShowModal(true);
                        dispatch(getPoll(p.pollId!))
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
