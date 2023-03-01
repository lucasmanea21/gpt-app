export const API_URL =
  process.env.ENVIRONMENT == "production"
    ? "https://learngpt.herokuapp.com"
    : "http://localhost:8080";
