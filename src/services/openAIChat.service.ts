// Manages communication with OpenAI's ChatGPT API

import OpenAI from "openai";
import { ChatMessageParams } from '../interfaces.js';

export async function communicateWithChatGPT(openAiToken: string, chatParams: ChatMessageParams): Promise<OpenAI.Chat.ChatCompletion> {
  try {
    return await request(openAiToken, chatParams);
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    throw error;
  }
}

async function request(openAiToken: string, chatParams: ChatMessageParams) {
  const openAi = new OpenAI({
    apiKey: openAiToken
  });

  const chatCompletion: OpenAI.Chat.ChatCompletion = await openAi.chat.completions.create({...chatParams, stream: false});

  return chatCompletion;
}