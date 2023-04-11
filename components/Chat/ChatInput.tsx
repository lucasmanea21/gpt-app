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
import { API_URL } from "../../utils/config";
import Generating from "./Generating";
import Button from "../Button";

const ChatInput = () => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom);
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);
  const [parentMessageId, setParentMessageId] = useAtom(parentMessageIdAtom);
  const [failed, setFailed] = useState(false);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    //   const run = async () => {
    //     let reply = ``;
    //     // try {
    //     //   const eventSource = new EventSource(`${API_URL}/test`);

    //     //   // const filterQuestions = (message: any) => {
    //     //   //   const questions = message
    //     //   //     .split("Intrebari asemanatoare:")[1] // get questions part of string
    //     //   //     .split(/\d+\./) // split questions by question number
    //     //   //     .filter(Boolean) // remove empty strings
    //     //   //     .map((q) => ({ intrebare: q.trim() })); // create array of objects with question property

    //     //     // console.log(questions);
    //     //   };

    //       const updateMessage = (message: any) => {
    //         if (message !== "[DONE]" && message !== `${prompt}`) {
    //           // Check if the "Intrebari asemanatoare:" string appears in the response string
    //           const indexOfIntrebari = reply.indexOf("Intrebari asemanatoare:");

    //           if (indexOfIntrebari === -1) {
    //             // If it does, set the flag to false so that subsequent tokens are skipped
    //             reply =
    //               message !== " " ? `${reply}${message}` : `${reply}${message}`;
    //             setReply((prevState: any) => prevState + message);
    //             setChatLog((prev) => {
    //               let isModified = prev.length > 2;
    //               let newPrev = isModified
    //                 ? prev.slice(0, -2)
    //                 : { type: "reply", text: reply };

    //               console.log("message", message);

    //               return !isModified
    //                 ? [...prev, { type: "reply", text: reply }]
    //                 : // @ts-ignore
    //                   [...newPrev, { type: "reply", text: reply }];
    //             });
    //           } else {
    //             setChatLog((prev) => [
    //               ...prev,
    //               {
    //                 type: "reply",
    //                 text: reply.split("Intrebari asemanatoare")[0],
    //               },
    //             ]);
    //           }
    //         }
    //       };

    //       eventSource.onmessage = function (event) {
    //         updateMessage(event.data);
    //       };

    //       eventSource.onerror = function () {
    //         // updateMessage("Server closed connection");
    //         eventSource.close();
    //       };
    //     } catch (err) {}
    //   };

    //   run();
    // };

    const GPTCall = async (prompt: string) => {
      try {
        const res = await axios.post(`${API_URL}/chat`, {
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
        {/* <Button className="filled" onClick={(e: any) => onSubmit(e)}>
        Submit
      </Button> */}
        {isLoading && <Generating />}
      </div>
    );
  };
};

export default ChatInput;
