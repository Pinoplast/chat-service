// Processes incoming messages and sends the processed results

import { consumeMessages, sendMessageToOutputQueue } from '../services/rabbitMQ.service';
import { communicateWithChatGPT } from '../services/openAIChat.service';

export async function processMessage(message: string) {
  try {
    const processedResult = await communicateWithChatGPT(message);
    if (processedResult) {
      sendMessageToOutputQueue(processedResult);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
}

export async function initializeConsumer() {
  await consumeMessages(processMessage);
}
