import React from "react";

const Loading = ({ failed }: { failed: boolean }) => {
  return (
    <div>
      <div className="text-center flex items-center justify-center flex-col">
        <p>Quiz-ul se genereaza</p>
        <p>Sit tight...</p>
      </div>
      {failed && (
        <div className="text-center flex items-center justify-center flex-col">
          <p>Oops! Ceva nu a mers bine.</p>
          <p>Te rugam sa incerci din nou.</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
