// default express server
import express from "express";
import { ChatGPTBrowserClient } from "@waylaidwanderer/chatgpt-api";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));

// let localhost:3000 make calls

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

const access_token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdG9hc3QyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiUk8ifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVdqMVZ0RlQwcXJLSnFlYmIwQlc5NmZkSCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNmNzFhOTBhYzdhNjdjN2M5Njk0NjkwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzEzODk5MywiZXhwIjoxNjc4MzQ4NTkzLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.ICe1pazQ42v5jSk3hAByArC4Ww4-8KbCI8m2g6AN04RNGoNmNLRE41CbrR5_EyO_m1jwOOy_P_8Jg_B-w8RCo-45rgpC4jrMNHhoRvWPp7GQU9qXq7qVWbWtCJraqqCvJNs99ikFJ8LwCeCIO-pBQmraQvdB8pS6_jPDXFVAjjyPj8Fnp_9GCYTU62N-vK3I4T1MAzWvX7MdrQkoAwL_0SCLf0t5T-H4APLhqE8PzT5y3wh2j9_jPUELjnKjJEFmbFLRF1EbhFd_iEsFcyPVnjiC0lNm4iHFHCAJSEvZVCZ515_DbOC4TpKWMBZCsjXWXF1WthUAhBIcizfeiSC4RQ";

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/chat", async (req, res) => {
  const clientOptions = {
    reverseProxyUrl: "https://chatgpt.duti.tech/api/conversation",
    accessToken:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdG9hc3QyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiUk8ifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVdqMVZ0RlQwcXJLSnFlYmIwQlc5NmZkSCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNmNzFhOTBhYzdhNjdjN2M5Njk0NjkwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzIzMTYzNywiZXhwIjoxNjc4NDQxMjM3LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.cqcKW5Mj55j4dcB9bcodfHHRqW-1jsa7zNPDw6gWlrxL2ZrwtaWF2urfuu23CDkBgCzcqIWogghS60IhYacwxq1KS-gn1wXnlC23OhhPY3m63_OAZOe51X-PBSA4XDNdGJqUNg_bJCUURtPGIwqXtFpdpcxhIGroxWEQxDs8nUeymOhepZ7_zIx-TTOpXMYlhtjRU7lTeNvjlyNHvaaetjOXvLBBR6UZdrNpP5qmgAlQHEqYoaPDZnhtlhx8jRGtovI9Zo60DGdRTp-7LNyBS0LZRVsETuP2Om-nQqhyMZmLIQpzH9pSHTnGidgEt1AUTk7B-jDXFcyzxbm2cU8Vag",
    cookies: "",
  };

  const chatGptClient = new ChatGPTBrowserClient(clientOptions);

  try {
    const response = await chatGptClient.sendMessage("Hi.", {
      // conversationId: response2.conversationId,
      // parentMessageId: response2.messageId,
      // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
      // You will receive one token at a time, so you will need to concatenate them yourself.
      onProgress: (token) => {
        res.write(token);
      },
    });

    console.log("response", response);

    response && res.end();
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
