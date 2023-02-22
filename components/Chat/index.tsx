import React from "react";
import Card from "../Cards";
import SectionWrapper from "../Wrappers";
import ChatInput from "./ChatInput";
import Message from "./Message";
import Reply from "./Reply";

const Chat = () => {
  return (
    <SectionWrapper>
      <Card>
        <p className="text-xl">Welcome to the chat!</p>
        <div className="mt-10">
          <Message />
          <Reply />
        </div>
        <ChatInput />
      </Card>
    </SectionWrapper>
  );
};

export default Chat;
