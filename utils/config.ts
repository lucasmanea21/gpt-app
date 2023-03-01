export const API_URL =
  process.env.NODE_ENV == "production"
    ? "https://learngpt.herokuapp.com"
    : "http://localhost:8080";
