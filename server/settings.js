module.exports = {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv.
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default).
  // Only applies when using `ChatGPTClient`.
  cacheOptions: {},
  // If set, `ChatGPTClient` will use `keyv-file` to store conversations to this JSON file instead of in memory.
  // However, `cacheOptions.store` will override this if set
  storageFilePath: process.env.STORAGE_FILE_PATH || "./cache.json",
  // Your OpenAI API key (for `ChatGPTClient`)
  openaiApiKey: "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",
  chatGptClient: {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
    // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
      // You can override the model name and any other parameters here.
      // model: "text-chat-davinci-002-20221122",
      // Set max_tokens here to override the default max_tokens of 1000 for the completion.
      // max_tokens: 1000,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    // maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    // maxPromptTokens: 3097,
    // (Optional) Set custom instructions instead of "You are ChatGPT...".
    // promptPrefix: 'You are Bob, a cowboy in Western times...',
    // (Optional) Set a custom name for the user
    // userLabel: 'User',
    // (Optional) Set a custom name for ChatGPT
    // chatGptLabel: 'ChatGPT',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
  },
  // Options for the Bing client
  bingAiClient: {
    // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
    host: "",
    // The "_U" cookie value from bing.com
    userToken: "",
    // If the above doesn't work, provide all your cookies as a string instead
    cookies: "",
    // A proxy string like "http://<ip>:<port>"
    proxy: "",
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
  },
  chatGptBrowserClient: {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your access token to a third party. Consider the risks before using this.
    reverseProxyUrl: "https://chat.duti.tech/api/conversation",
    // Access token from https://chat.openai.com/api/auth/session
    accessToken:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdG9hc3QyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiUk8ifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVdqMVZ0RlQwcXJLSnFlYmIwQlc5NmZkSCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNmNzFhOTBhYzdhNjdjN2M5Njk0NjkwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzEzODk5MywiZXhwIjoxNjc4MzQ4NTkzLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.ICe1pazQ42v5jSk3hAByArC4Ww4-8KbCI8m2g6AN04RNGoNmNLRE41CbrR5_EyO_m1jwOOy_P_8Jg_B-w8RCo-45rgpC4jrMNHhoRvWPp7GQU9qXq7qVWbWtCJraqqCvJNs99ikFJ8LwCeCIO-pBQmraQvdB8pS6_jPDXFVAjjyPj8Fnp_9GCYTU62N-vK3I4T1MAzWvX7MdrQkoAwL_0SCLf0t5T-H4APLhqE8PzT5y3wh2j9_jPUELjnKjJEFmbFLRF1EbhFd_iEsFcyPVnjiC0lNm4iHFHCAJSEvZVCZ515_DbOC4TpKWMBZCsjXWXF1WthUAhBIcizfeiSC4RQ",
    // Cookies from chat.openai.com (likely not required if using reverse proxy server).
    cookies: "",
    // (Optional) Set to true to enable `console.debug()` logging
    // debug: true,
  },
  // Options for the API server
  apiOptions: {
    port: process.env.API_PORT || 8080,
    host: process.env.API_HOST || "localhost",
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
    // (Optional) Set to "bing" to use `BingAIClient` instead of `ChatGPTClient`.
    // clientToUse: 'bing',
  },
  // Options for the CLI app
  cliOptions: {
    // (Optional) Set to "bing" to use `BingAIClient` instead of `ChatGPTClient`.
    // clientToUse: 'bing',
  },
};
