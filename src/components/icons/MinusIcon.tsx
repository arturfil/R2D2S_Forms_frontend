import React from "react";

interface Props {
  deleteFunc: Function;
  qIndex?:number;
  ansId?:string;
}

export default function MinusIcon({deleteFunc, qIndex, ansId}: Props) {
  return (
    <svg
      onClick={e => deleteFunc(qIndex, ansId)}
      style={{cursor:"pointer"}}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-dash-circle-fill"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
    </svg>
  );
}
