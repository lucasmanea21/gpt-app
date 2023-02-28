import axios from "axios";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { fetchEventSource } from "@waylaidwanderer/fetch-event-source";
// @ts-ignore
import { ChatGPTBrowserClient } from "@waylaidwanderer/chatgpt-api";

import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  chatLogAtom,
  conversationIdAtom,
  parentMessageIdAtom,
} from "../../store/atom";

const ChatInput = () => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom);
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);
  const [parentMessageId, setParentMessageId] = useAtom(parentMessageIdAtom);
  const [failed, setFailed] = useState(false);
  const [reply, setReply] = useState("");

  const [input, setInput] = useState("");

  const otherGPTCall = async (prompt: string) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Hello",
        // Set stream to true to receive each token as it is generated.
        stream: true,
      }),
    };

    const run = async () => {
      let reply = ``;
      try {
        const eventSource = new EventSource("http://localhost:8080/test");

        const updateMessage = (message: any) => {
          if (message !== "[DONE]" && message !== `${prompt}`) {
            reply = message !== " " ? `${reply}${message}` : `${reply}\n`;
            setReply((prevState: any) => prevState + message);
            setChatLog((prev) => {
              let isModified = prev.length > 2;
              let newPrev = isModified
                ? prev.slice(0, -2)
                : { type: "reply", text: reply };

              return !isModified
                ? [...prev, { type: "reply", text: reply }]
                : [...newPrev, { type: "reply", text: reply }];
            });
          }
        };

        eventSource.onmessage = function (event) {
          updateMessage(event.data);
        };

        eventSource.onerror = function () {
          // updateMessage("Server closed connection");
          eventSource.close();
        };
      } catch (err) {}
    };

    run();
  };

  const GPTCall = async (prompt: string) => {
    try {
      const res = await axios.post("http://localhost:8080/chat", {
        prompt: prompt,
        type: "question",
        conversationId: conversationId,
        parentMessageId: parentMessageId,
      });

      res &&
        setChatLog((prev) => [
          ...prev,
          { type: "reply", text: res.data.response },
        ]);

      res && setConversationId(res.data.conversationId);
      res && setParentMessageId(res.data.messageId);
    } catch (error) {
      setFailed(true);
    }
  };

  const onSubmit = (e: any) => {
    let savedInput = input;
    e.preventDefault();
    setChatLog((prev) => [...prev, { type: "question", text: input }]);

    setInput("");
    otherGPTCall(savedInput);
    // GPTCall(savedInput);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your message here"
        className="w-full p-3 my-5 bg-gray-800 rounded-lg outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
      <button onClick={(e: any) => onSubmit(e)}>Submit</button>
    </div>
  );
};

export default ChatInput;
