const { fetchEventSource } = require("@waylaidwanderer/fetch-event-source");

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
  try {
    let reply = "";
    const controller = new AbortController();
    await fetchEventSource("http://localhost:8080/conversation", {
      ...opts,
      signal: controller.signal,
      onopen(response) {
        if (response.status === 200) {
          return;
        }
        throw new Error(
          `Failed to send message. HTTP ${response.status} - ${response.statusText}`
        );
      },
      onclose() {
        throw new Error(
          `Failed to send message. Server closed the connection unexpectedly.`
        );
      },
      onerror(err) {
        throw err;
      },
      onmessage(message) {
        // { data: 'Hello', event: '', id: '', retry: undefined }
        if (message.data === "[DONE]") {
          controller.abort();
          console.log(message);
          return;
        }
        if (message.event === "result") {
          const result = JSON.parse(message.data);
          const { response, conversationId } = result;
          console.log({ response, conversationId });
          return;
        }
        console.log(message);
        reply += message.data;
      },
    });
    console.log(reply);
  } catch (err) {
    console.log("ERROR", err);
  }
};

run();
