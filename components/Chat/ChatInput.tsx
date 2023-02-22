import React from "react";

const ChatInput = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type your message here"
        className="w-full bg-gray-800 p-3 my-5 rounded-lg outline-none"
      />
    </div>
  );
};

export default ChatInput;
