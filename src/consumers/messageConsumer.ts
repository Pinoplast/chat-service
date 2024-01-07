// Processes incoming messages and sends the processed results

import { consumeMessages, sendMessageToOutputQueue } from '../services/rabbitMQ.service.js';
import { communicateWithChatGPT } from '../services/openAIChat.service.js';
import { ChatMessageParams } from '../interfaces.js';

export async function processMessage(openAiToken: string, chatParams: ChatMessageParams): Promise<boolean> {
  try {
    const processedResult = await communicateWithChatGPT(openAiToken, chatParams);
    if (processedResult) {
      sendMessageToOutputQueue(processedResult);
    }

    return true;
  } catch (error) {
    console.error('Error processing message:', error);
    return false;
  }
}

export async function initializeConsumer() {
  await consumeMessages(processMessage);
}
