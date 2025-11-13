// src/services/aiService.js

// We can now use a simple fetch or axios call.
import axios from 'axios';

// The endpoint for our new backend function.
// When you run `npm run dev`, Vite will correctly proxy this request.
const apiEndpoint = '/api/gemini';

export const runChat = async (prompt) => {
  try {
    // Make a POST request to our OWN backend, not Google's.
    const response = await axios.post(apiEndpoint, {
      prompt: prompt // Send the user's message in the request body
    });

    // The backend will return a JSON object like { reply: "..." }
    return response.data.reply;

  } catch (error) {
    console.error("Error calling backend service:", error.response ? error.response.data : error.message);
    return "Sorry, my connection to the server failed. Please try again.";
  }
};