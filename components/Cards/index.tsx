import React from "react";

const Card = ({ children }: any) => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg w-full max-w-[900px]">
      {children}
    </div>
  );
};

export default Card;
