import React from "react";

const Chat = ({ children, bgColor }: any) => {
  return (
    <div
      className={`flex space-x-7 justify-between items-center ${bgColor} p-5 py-8 `}
    >
      {children}
    </div>
  );
};

export default Chat;
