// Manages communication with OpenAI's ChatGPT API

import axios from 'axios';
import { openAIConfig } from '../config';

export async function communicateWithChatGPT(message: string): Promise<string> {
  try {
    const response = await axios.post(
      openAIConfig.apiUrl,
      {
        prompt: message,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAIConfig.apiKey}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    throw error;
  }
}
