// api/gemini.js

// This is the serverless function handler.
// It takes a request (req) and sends a response (res).
export default function handler(req, res) {
  // We're not calling any external APIs.
  // We are just sending a simple JSON message back.
  res.status(200).json({ reply: "Hello from the backend! The server is working." });
}