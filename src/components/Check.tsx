import React from "react";

export default function Check() {
  return (
    <>
      <div
        style={{
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "0px 1px 1px 1px lightgrey",
          borderRadius: "8px",
          backgroundColor: "#f8f8f8",
          padding: 10,
        }}
      >
        <h2 style={{ color: "green", margin: "20px" }}>
          Successfully Submitted Form!
        </h2>
        <svg
          style={{ marginBottom: "20px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          fill="green"
          className="bi bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
        </svg>
      </div>
    </>
  );
}
