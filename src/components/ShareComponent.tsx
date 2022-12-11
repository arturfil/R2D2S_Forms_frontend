import React, { useState } from "react";
import CheckMark from "./icons/CheckMark";
import ShareIcon from "./icons/ShareIcon";

interface Props {
  link: string;
  clicked: boolean;
}

export default function ShareComponent({ link, clicked }: Props) {
    const [show, setShow] = useState<boolean>(clicked);

  return (
    <>{show ? <CheckMark /> : <ShareIcon setShow={setShow} link={link} />}</>
  );
}
