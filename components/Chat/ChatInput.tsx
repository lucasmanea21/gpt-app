import axios from "axios";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
// @ts-ignore
import { ChatGPTBrowserClient } from "@waylaidwanderer/chatgpt-api";

import React, { useState } from "react";
import { fetchEventSource } from "@waylaidwanderer/fetch-event-source";

const ChatInput = () => {
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
    // make a call to the server that takes a stream of text and returns a stream of text
    try {
      const fetchData = async () => {
        await fetchEventSource(`http://localhost:8080/chat`, {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
          },
          // @ts-ignore
          onopen(res) {
            if (res.ok && res.status === 200) {
              console.log("Connection made ", res);
            } else if (
              res.status >= 400 &&
              res.status < 500 &&
              res.status !== 429
            ) {
              console.log("Client side error ", res);
            }
          },
          onmessage(event) {
            console.log(event.data);
            const parsedData = JSON.parse(event.data);
            // setData((data) => [...data, parsedData]);
          },
          onclose() {
            console.log("Connection closed by the server");
          },
          onerror(err) {
            console.log("There was an error from server", err);
          },
        });
      };
      fetchData();
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const GPTCall = async (prompt: string) => {
    const res = await axios.post("http://localhost:8080/chat", {
      prompt: prompt,
    });

    console.log("res", res);
  };

  const onSubmit = (e: any) => {
    console.log(
      "process.env.OPENAI_ACCESS_TOKEN",
      process.env.OPENAI_ACCESS_TOKEN
    );
    e.preventDefault();

    otherGPTCall(input);
  };

  console.log("input", input);
  return (
    <div>
      <input
        type="text"
        placeholder="Type your message here"
        className="w-full p-3 my-5 bg-gray-800 rounded-lg outline-none"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={(e: any) => onSubmit(e)}>Submit</button>
    </div>
  );
};

export default ChatInput;
