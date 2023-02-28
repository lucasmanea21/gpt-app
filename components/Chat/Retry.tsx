import React from "react";
import Button from "../Button";

const Retry = () => {
  return (
    <div>
      <p>Oops! Intrebarea ta a esuat.</p>
      <Button customClassName="filled">Incearca din nou</Button>
    </div>
  );
};

export default Retry;
