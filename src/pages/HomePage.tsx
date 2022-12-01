import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  function goToPoll(id: string) {
    navigate("/replypoll/" + id);
  }

  return (
    <div>
      <h1>Poll E-Wag</h1>
      <h5 style={{ marginTop: "20px" }}>Enter your poll Id</h5>

      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ maxWidth: "300px" }}
        className="form-control"
        type="text"
        placeholder="poll id"
      />
      <button
        onClick={() => goToPoll(id)}
        style={{ margin: "10px 0" }}
        className="btn"
      >
        Go To Poll
      </button>
    </div>
  );
}
