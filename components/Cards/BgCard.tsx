import React from "react";

const BgCard = ({ children, className }: any) => {
  return (
    <div className={`p-8 mt-16 bg-gray-800 md:w-3/4 rounded-xl ${className}`}>
      {children}
    </div>
  );
};

export default BgCard;
