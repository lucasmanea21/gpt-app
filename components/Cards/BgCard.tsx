import React from "react";

const BgCard = ({ children }: any) => {
  return (
    <div className="p-8 md:w-3/4 mt-16 bg-gray-800 rounded-xl">{children}</div>
  );
};

export default BgCard;
