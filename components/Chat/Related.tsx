import axios from "axios";
import { useAtom } from "jotai";
import React from "react";
import { BsStars } from "react-icons/bs";
import { chatLogAtom, conversationIdAtom } from "../../store/atom";
import { API_URL } from "../../utils/config";

const Related = ({ text, subject }: { text: string; subject: string }) => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom);
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);

  const GPTCall = async (prompt: string) => {
    const res = await axios.post(`${API_URL}/chat`, {
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
    <div className="bg-neutral-800 cursor-pointer p-2 rounded-lg flex space-x-3 max-w-[250px] items-center">
      <div className="text-2xl">
        <BsStars />
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-gray-300 uppercase mb-2">{subject}</p>
        <p className="text-sm" onClick={() => onSubmit()}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Related;
