import axios from "axios";
import { useAtom } from "jotai";
import React from "react";
import { BsStars } from "react-icons/bs";
import { chatLogAtom, conversationIdAtom } from "../../store/atom";

const Related = ({ text }: { text: string }) => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom);
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);

  const GPTCall = async (prompt: string) => {
    const res = await axios.post("http://localhost:8080/chat", {
      prompt: prompt,
      conversationId: conversationId,
    });

    res &&
      setChatLog((prev) => [
        ...prev,
        { type: "reply", text: res.data.response },
      ]);

    res && setConversationId(res.data.conversationId);
  };

  const onSubmit = () => {
    setChatLog((prev) => [...prev, { type: "question", text: text }]);

    GPTCall(text);
  };

  return (
    <div className="bg-neutral-800 cursor-pointer p-2 rounded-lg flex space-x-3 max-w-[200px] items-center">
      <div className="text-2xl">
        <BsStars />
      </div>
      <p className="text-xs" onClick={() => onSubmit()}>
        {text}
      </p>
    </div>
  );
};

export default Related;
