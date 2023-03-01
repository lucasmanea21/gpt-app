// default express server
import express from "express";
import { ChatGPTBrowserClient } from "@waylaidwanderer/chatgpt-api";
import { createClient } from "@supabase/supabase-js";

// import { ChatGPTAPI } from "chatgpt";
import bodyParser from "body-parser";
import { learnPrompt, quizPrompt } from "./prompts.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var allowedOrigins = [
  "https://gpt-app-two.vercel.app/",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// let localhost:3000 make calls

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "https://gpt-app-two.vercel.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// use cors

var corsMiddleware = function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "https://gpt-app-two.vercel.app/"); //replace localhost with actual host
  res.header("Access-Control-Allow-Origin", "*"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};

app.use(corsMiddleware);

const clientOptions = {
  reverseProxyUrl: "https://chatgpt.duti.tech/api/conversation",
  accessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdG9hc3QyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiUk8ifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVdqMVZ0RlQwcXJLSnFlYmIwQlc5NmZkSCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNmNzFhOTBhYzdhNjdjN2M5Njk0NjkwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzUzMTcwMCwiZXhwIjoxNjc4NzQxMzAwLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.RFJi_2A7jejxK5Vyt51ZbNWWvdUxVtVftqHfitNEjy-ej7NYKJBorCnQugp0qlmyGUUVm4UWUZMA90HdXMq4ZVDZ3TwVizcK39_bikscebwF1vPQXv4241zN4yW-872ggJaLMkPV0iknvguGVMRIp3vL-eT-idUkd1sS55r7FB1oQdBFrKYUQ3CsXruvNO72Ls2AwfZKRqar6JzogoZqQgSEP99C6j-0H6OWdu53MSvZDP2vsYlnUvoFf4EZdIi3uF43DO30aBJPe3Wi19WgrB8hfGKy_Yn6c0zqKLvRt0lTK_U6-l0Md9lja-5DmwyaEJFPNo3d95EcihTT9VHqMw",
  cookies: "",
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const updatePoints = async (id, points) => {
  const { data, error } = await supabase
    .from("users")
    .update({ points })
    .match({ id });

  return { data, error };
};

app.get("/test", async (req, res) => {
  console.log("Client connected");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const chatGptClient = new ChatGPTBrowserClient(clientOptions);

  const { prompt } = req.body;
  const { userId } = req.body;

  res.write("hello");
  const response = await chatGptClient.sendMessage(
    learnPrompt("Care a fost impactul Romaniei in WW2?"),
    {
      conversationId: req.body.conversationId || undefined,
      parentMessageId: req.body.parentMessageId || undefined,
      // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
      // You will receive one token at a time, so you will need to concatenate them yourself.
      onProgress: (token) => {
        res.write(`data: ${token}\n\n`);
      },
    }
  );

  const pointsResponse = await updatePoints(userId, 10);

  res.end();
  // console.log("response", response);

  const intervalId = setInterval(async () => {
    const date = new Date().toLocaleString();

    res.write(`data: ${date}\n\n`);
  }, 10000);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
});

app.get("/conversation", async (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");

  const chatGptClient = new ChatGPTBrowserClient(clientOptions);

  const { prompt } = req.body;

  const response = await chatGptClient.sendMessage(quizPrompt(prompt), {
    conversationId: req.body.conversationId || undefined,
    parentMessageId: req.body.parentMessageId || undefined,
    // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
    // You will receive one token at a time, so you will need to concatenate them yourself.
    onProgress: (token) => {
      res.write(token);
    },
  });

  console.log("response", response);

  response && res.end();
  res.send("Hello World!");
});

app.post("/chat", async (req, res) => {
  const chatGptClient = new ChatGPTBrowserClient(clientOptions);

  const { prompt } = req.body;

  console.log(prompt);

  if (req.body.type == "quiz") {
    let string = "";
    let count = 0;
    try {
      const response = await chatGptClient.sendMessage(quizPrompt(prompt), {
        // conversationId: req.body.conversationId || undefined,
        // parentMessageId: req.body.parentMessageId || undefined,
        // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
        // You will receive one token at a time, so you will need to concatenate them yourself.
        onProgress: (token) => {
          string += token;
        },
      });

      console.log("response", response);

      response && res.send(response);
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      const response = await chatGptClient.sendMessage(learnPrompt(prompt), {
        conversationId: req.body.conversationId || undefined,
        parentMessageId: req.body.parentMessageId || undefined,
        // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
        // You will receive one token at a time, so you will need to concatenate them yourself.
        // onProgress: (token) => {
        //   res.write(token);
        // },
      });

      console.log("response", response);

      response && res.send(response);
    } catch (error) {
      console.log("error", error);
    }
  }
  console.log("req.body", req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
